import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  sendEmailNotification,
  sendWhatsAppNotification,
  LeadNotificationData,
} from "@/lib/notifications";

// Simple validation patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-()]{8,20}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      companyName,
      businessType,
      serviceRequired,
      budget,
      description,
      preferredContact,
      source,
      recommendedPackage,
      preferredDate,
      preferredTime,
    } = body;

    // 1. Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Full Name is required and must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "A valid Email Address is required." },
        { status: 400 }
      );
    }

    if (!phone || !PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: "A valid Phone Number (with country code, e.g. +91 9361257216) is required." },
        { status: 400 }
      );
    }

    if (!serviceRequired || typeof serviceRequired !== "string") {
      return NextResponse.json(
        { error: "Service Required is required." },
        { status: 400 }
      );
    }

    if (!preferredContact || typeof preferredContact !== "string") {
      return NextResponse.json(
        { error: "Preferred Contact Method is required." },
        { status: 400 }
      );
    }

    if (!source || typeof source !== "string") {
      return NextResponse.json(
        { error: "Lead Source is required." },
        { status: 400 }
      );
    }

    // 2. Resolve Client IP Address
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 3. Spam & Duplicate submission prevention (within 5 minutes time window)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    const { data: emailDupes } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .gt("created_at", fiveMinutesAgo)
      .limit(1);

    const { data: phoneDupes } = await supabase
      .from("leads")
      .select("id")
      .eq("phone", phone)
      .gt("created_at", fiveMinutesAgo)
      .limit(1);

    if ((emailDupes && emailDupes.length > 0) || (phoneDupes && phoneDupes.length > 0)) {
      return NextResponse.json(
        {
          error:
            "A submission was already received from this email/phone in the last 5 minutes. Please wait before submitting again.",
        },
        { status: 429 }
      );
    }

    // 4. Save to Supabase
    const leadInsert = {
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company_name: companyName ? companyName.trim() : null,
      business_type: businessType ? businessType.trim() : "Not specified",
      service_required: serviceRequired.trim(),
      budget: budget ? budget.trim() : "Not specified",
      description: description ? description.trim() : "",
      preferred_contact: preferredContact.trim().toLowerCase(),
      ip_address: ip,
      status: "New",
      source: source.trim(),
      recommended_package: recommendedPackage ? recommendedPackage.trim() : null,
      preferred_date: preferredDate ? preferredDate.trim() : null,
      preferred_time: preferredTime ? preferredTime.trim() : null,
    };

    const { data: insertedData, error: dbError } = await supabase
      .from("leads")
      .insert([leadInsert])
      .select()
      .single();

    if (dbError) {
      console.error("[Submit Lead API] Database insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save lead info. Please try again later." },
        { status: 500 }
      );
    }

    // 5. Instantly trigger notifications in parallel/background without blocking response
    const notificationPayload: LeadNotificationData = {
      name: leadInsert.full_name,
      email: leadInsert.email,
      phone: leadInsert.phone,
      companyName: leadInsert.company_name || undefined,
      businessType: leadInsert.business_type,
      serviceRequired: leadInsert.service_required,
      budget: leadInsert.budget,
      description: leadInsert.description,
      preferredContact: leadInsert.preferred_contact,
      source: leadInsert.source,
      recommendedPackage: leadInsert.recommended_package || undefined,
      preferredDate: leadInsert.preferred_date || undefined,
      preferredTime: leadInsert.preferred_time || undefined,
      createdAt: insertedData.created_at,
    };

    // Trigger async operations
    Promise.all([
      sendEmailNotification(notificationPayload).catch((e) =>
        console.error("[Submit Lead API] Async Email notification failed:", e)
      ),
      sendWhatsAppNotification(notificationPayload).catch((e) =>
        console.error("[Submit Lead API] Async WhatsApp notification failed:", e)
      ),
    ]);

    // 6. Return professional success message
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Detox Labs. Our team has received your request and will contact you shortly.",
        leadId: insertedData.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Submit Lead API] System exception:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred processing your request." },
      { status: 500 }
    );
  }
}
