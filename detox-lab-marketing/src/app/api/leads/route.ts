import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  sendEmailNotification,
  sendWhatsAppNotification,
  LeadNotificationData,
} from "@/lib/notifications";

// Simple validation patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Permissive phone validator: checks that only common formatting chars exist
// and ensures digit count is between 7 and 15 digits (ITU-T E.164 standard).
function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  const formatValid = /^\+?[0-9\s\-()]+$/.test(trimmed);
  const cleanDigits = trimmed.replace(/\D/g, "");
  return formatValid && cleanDigits.length >= 7 && cleanDigits.length <= 15;
}

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

    // 1. Inputs Validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Full Name is required and must be at least 2 characters." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "A valid Email Address is required." },
        { status: 400 }
      );
    }

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json(
        { error: "A valid Phone Number (7 to 15 digits, e.g., +91 9361257216) is required." },
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

    const { data: emailDupes, error: emailError } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email.trim().toLowerCase())
      .gt("created_at", fiveMinutesAgo)
      .limit(1);

    if (emailError) {
      console.error("[Submit Lead API] Duplicate check by email query error:", emailError);
    }

    const { data: phoneDupes, error: phoneError } = await supabase
      .from("leads")
      .select("id")
      .eq("phone", phone.trim())
      .gt("created_at", fiveMinutesAgo)
      .limit(1);

    if (phoneError) {
      console.error("[Submit Lead API] Duplicate check by phone query error:", phoneError);
    }

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
      console.error("[Submit Lead API] Database insert error details:", JSON.stringify(dbError, null, 2));
      return NextResponse.json(
        {
          error: "Failed to save lead info. Please try again later.",
          code: dbError.code,
          message: dbError.message,
          details: dbError.details || "",
        },
        { status: 500 }
      );
    }

    // 5. Instantly trigger notifications in parallel/background and wait for them to settle.
    // In Serverless environments like Vercel, returning the response without awaiting 
    // promises causes the execution context to freeze immediately, cutting off active notifications.
    // We await them using Promise.allSettled so notification errors won't crash our response.
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
      createdAt: insertedData?.created_at || new Date().toISOString(),
    };

    try {
      console.log("[Submit Lead API] Dispatching notifications...");
      await Promise.allSettled([
        sendEmailNotification(notificationPayload),
        sendWhatsAppNotification(notificationPayload),
      ]);
      console.log("[Submit Lead API] Notifications settled.");
    } catch (notificationError) {
      console.error("[Submit Lead API] Notification delivery error:", notificationError);
    }

    // 6. Return professional success message
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Detox Labs. Our team has received your request and will contact you shortly.",
        leadId: insertedData?.id || null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Submit Lead API] System exception:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred processing your request.",
        message: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
