import nodemailer from "nodemailer";

export interface LeadNotificationData {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  businessType?: string;
  serviceRequired: string;
  budget?: string;
  description?: string;
  preferredContact: string;
  source: string;
  recommendedPackage?: string;
  preferredDate?: string;
  preferredTime?: string;
  createdAt: string;
}

/**
 * Format the lead details into a readable text format for WhatsApp.
 */
export function formatWhatsAppMessage(lead: LeadNotificationData): string {
  const timeStr = new Date(lead.createdAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const phoneDigits = lead.phone.replace(/\D/g, "");
  const waClickableLink = phoneDigits
    ? `\n\n💬 Chat with client: https://wa.me/${phoneDigits}`
    : "";

  return `🚀 New Website Lead (${lead.source})

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Company: ${lead.companyName || "—"}
Business Type: ${lead.businessType || "—"}
Service Required: ${lead.serviceRequired}
Budget: ${lead.budget || "—"}
Requirements: ${lead.description || "—"}${
    lead.preferredDate ? `\nPreferred Date: ${lead.preferredDate}` : ""
  }${lead.preferredTime ? `\nPreferred Time: ${lead.preferredTime}` : ""}${
    lead.recommendedPackage ? `\nAI Recommended: ${lead.recommendedPackage}` : ""
  }
Preferred Contact: ${lead.preferredContact}

Submitted At: ${timeStr} (IST)${waClickableLink}`;
}

/**
 * Format the lead details into a professional HTML template for business email.
 */
export function formatEmailHtml(lead: LeadNotificationData): string {
  const timeStr = new Date(lead.createdAt).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const phoneDigits = lead.phone.replace(/\D/g, "");
  const waLink = phoneDigits ? `<a href="https://wa.me/${phoneDigits}" style="color: #22d3ee; text-decoration: none; font-weight: 600;">Chat on WhatsApp</a>` : "";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #05070d;
            color: #f8fafc;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0a0f1f;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(59, 130, 246, 0.15);
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #22d3ee);
            padding: 24px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 0.5px;
            color: #ffffff;
          }
          .content {
            padding: 32px 24px;
          }
          .lead-source {
            display: inline-block;
            background-color: rgba(34, 211, 238, 0.1);
            border: 1px solid rgba(34, 211, 238, 0.2);
            color: #22d3ee;
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 9999px;
            margin-bottom: 20px;
          }
          .field-group {
            margin-bottom: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 12px;
          }
          .field-group:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .label {
            font-size: 11px;
            text-transform: uppercase;
            color: #94a3b8;
            letter-spacing: 1px;
            margin-bottom: 4px;
            font-weight: 500;
          }
          .value {
            font-size: 15px;
            color: #f8fafc;
            line-height: 1.5;
          }
          .requirements {
            white-space: pre-wrap;
            background-color: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding: 12px;
            margin-top: 6px;
          }
          .footer {
            background-color: rgba(255, 255, 255, 0.01);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding: 20px 24px;
            text-align: center;
            font-size: 12px;
            color: #5b6680;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Website Lead Capture</h1>
          </div>
          <div class="content">
            <span class="lead-source">${lead.source}</span>
            
            <div class="field-group">
              <div class="label">Full Name</div>
              <div class="value" style="font-weight: 600;">${lead.name}</div>
            </div>

            <div class="field-group">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${lead.email}" style="color: #3b82f6; text-decoration: none;">${lead.email}</a></div>
            </div>

            <div class="field-group">
              <div class="label">Phone Number</div>
              <div class="value">${lead.phone} ${waLink ? `&nbsp;|&nbsp; ${waLink}` : ""}</div>
            </div>

            <div class="field-group">
              <div class="label">Company Name</div>
              <div class="value">${lead.companyName || "—"}</div>
            </div>

            <div class="field-group">
              <div class="label">Business Type</div>
              <div class="value">${lead.businessType || "—"}</div>
            </div>

            <div class="field-group">
              <div class="label">Service Required</div>
              <div class="value">${lead.serviceRequired}</div>
            </div>

            <div class="field-group">
              <div class="label">Budget</div>
              <div class="value">${lead.budget || "—"}</div>
            </div>

            ${lead.preferredDate || lead.preferredTime ? `
            <div class="field-group">
              <div class="label">Preferred Booking Schedule</div>
              <div class="value">${lead.preferredDate || "—"} at ${lead.preferredTime || "—"}</div>
            </div>
            ` : ""}

            ${lead.recommendedPackage ? `
            <div class="field-group">
              <div class="label">AI Recommended Package</div>
              <div class="value">${lead.recommendedPackage}</div>
            </div>
            ` : ""}

            <div class="field-group">
              <div class="label">Preferred Contact Method</div>
              <div class="value" style="text-transform: capitalize;">${lead.preferredContact}</div>
            </div>

            <div class="field-group">
              <div class="label">Project Description / Requirements</div>
              <div class="value requirements">${lead.description || "No project description provided."}</div>
            </div>
          </div>
          <div class="footer">
            Submitted at ${timeStr} (UTC) • Detox Labs Marketing
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Send email notification using SMTP or Resend API.
 */
export async function sendEmailNotification(lead: LeadNotificationData): Promise<boolean> {
  try {
    const {
      RESEND_API_KEY,
      RESEND_FROM,
      RESEND_TO,
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      SMTP_TO,
    } = process.env;

    console.log("[Notification System] --- Initiating Email Notification Send ---");
    console.log("[Notification System] Environment Variables Status:");
    console.log(`- RESEND_API_KEY: ${RESEND_API_KEY ? `PRESENT (Length: ${RESEND_API_KEY.length}, Prefix: ${RESEND_API_KEY.substring(0, 7)}...)` : "ABSENT"}`);
    console.log(`- RESEND_FROM: ${RESEND_FROM || "ABSENT"}`);
    console.log(`- RESEND_TO: ${RESEND_TO || "ABSENT"}`);
    console.log(`- SMTP_HOST: ${SMTP_HOST || "ABSENT"}`);
    console.log(`- SMTP_PORT: ${SMTP_PORT || "ABSENT"}`);
    console.log(`- SMTP_USER: ${SMTP_USER ? `PRESENT (Length: ${SMTP_USER.length})` : "ABSENT"}`);
    console.log(`- SMTP_PASS: ${SMTP_PASS ? "PRESENT" : "ABSENT"}`);
    console.log(`- SMTP_FROM: ${SMTP_FROM || "ABSENT"}`);
    console.log(`- SMTP_TO: ${SMTP_TO || "ABSENT"}`);

    const subject = `🚀 New Lead: ${lead.name} (${lead.serviceRequired})`;
    const htmlContent = formatEmailHtml(lead);
    const textContent = formatWhatsAppMessage(lead); // Use plain text message as text backup

    // 1. Try Resend if key is available
    if (RESEND_API_KEY) {
      try {
        console.log("[Notification System] Sending email via Resend API...");
        const from = RESEND_FROM || "onboarding@resend.dev";
        const to = RESEND_TO || "detoxmarketinglab@gmail.com";

        console.log(`[Notification System] Resend Configuration: From='${from}', To='${to}', Subject='${subject}'`);

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from,
            to,
            subject,
            html: htmlContent,
            text: textContent,
          }),
        });

        const resText = await res.text();
        console.log(`[Notification System] Resend API Response Code: ${res.status}`);
        console.log(`[Notification System] Resend API Response Content: ${resText}`);

        if (res.ok) {
          console.log("[Notification System] Email sent via Resend API successfully.");
          return true;
        } else {
          console.error(`[Notification System] Resend API rejected request: ${res.status} - ${resText}`);
        }
      } catch (resendError) {
        console.error("[Notification System] Resend API exception:", resendError);
      }
    } else {
      console.log("[Notification System] Resend API Key is missing, skipping Resend path.");
    }

    // 2. Fall back to SMTP
    if (SMTP_HOST) {
      try {
        console.log("[Notification System] Sending email via SMTP...");
        const from = SMTP_FROM || "detoxmarketinglab@gmail.com";
        const to = SMTP_TO || "detoxmarketinglab@gmail.com";

        console.log(`[Notification System] SMTP Configuration: Host='${SMTP_HOST}', Port='${SMTP_PORT}', From='${from}', To='${to}'`);

        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || "587"),
          secure: SMTP_PORT === "465",
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const mailResult = await transporter.sendMail({
          from,
          to,
          subject,
          html: htmlContent,
          text: textContent,
        });

        console.log("[Notification System] Email sent via SMTP successfully. MessageId:", mailResult.messageId);
        return true;
      } catch (smtpError) {
        console.error("[Notification System] SMTP sending failed:", smtpError);
      }
    } else {
      console.log("[Notification System] SMTP Host is missing, skipping SMTP fallback path.");
    }

    console.warn("[Notification System] No email configuration (Resend/SMTP) succeeded or was found.");
    return false;
  } catch (globalEmailError: any) {
    console.error("[Notification System] Critical uncaught exception in sendEmailNotification:", globalEmailError);
    return false;
  }
}

/**
 * Send WhatsApp notification using Twilio or Meta Cloud API.
 */
export async function sendWhatsAppNotification(lead: LeadNotificationData): Promise<boolean> {
  try {
    const {
      WHATSAPP_PROVIDER,
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_SENDER_NUMBER,
      TWILIO_RECEIVER_NUMBER,
      WHATSAPP_PHONE_NUMBER_ID,
      WHATSAPP_ACCESS_TOKEN,
      WHATSAPP_RECEIVER_NUMBER: META_RECEIVER_NUMBER,
    } = process.env;

    console.log("[Notification System] --- Initiating WhatsApp Notification Send ---");
    console.log("[Notification System] Environment Variables Status:");
    console.log(`- WHATSAPP_PROVIDER: ${WHATSAPP_PROVIDER || "NOT DEFINED"}`);
    console.log(`- TWILIO_ACCOUNT_SID: ${TWILIO_ACCOUNT_SID ? `PRESENT (Length: ${TWILIO_ACCOUNT_SID.length}, Prefix: ${TWILIO_ACCOUNT_SID.substring(0, 7)}...)` : "ABSENT"}`);
    console.log(`- TWILIO_AUTH_TOKEN: ${TWILIO_AUTH_TOKEN ? `PRESENT (Length: ${TWILIO_AUTH_TOKEN.length})` : "ABSENT"}`);
    console.log(`- TWILIO_SENDER_NUMBER: ${TWILIO_SENDER_NUMBER || "ABSENT"}`);
    console.log(`- TWILIO_RECEIVER_NUMBER: ${TWILIO_RECEIVER_NUMBER || "ABSENT"}`);
    console.log(`- WHATSAPP_PHONE_NUMBER_ID: ${WHATSAPP_PHONE_NUMBER_ID || "ABSENT"}`);
    console.log(`- WHATSAPP_ACCESS_TOKEN: ${WHATSAPP_ACCESS_TOKEN ? `PRESENT (Length: ${WHATSAPP_ACCESS_TOKEN.length}, Prefix: ${WHATSAPP_ACCESS_TOKEN.substring(0, 10)}...)` : "ABSENT"}`);
    console.log(`- META_RECEIVER_NUMBER: ${META_RECEIVER_NUMBER || "ABSENT"}`);

    const messageText = formatWhatsAppMessage(lead);

    // 1. Twilio Integration
    if (WHATSAPP_PROVIDER === "twilio" || (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && !WHATSAPP_PROVIDER)) {
      try {
        console.log("[Notification System] Sending WhatsApp via Twilio...");
        const accountSid = TWILIO_ACCOUNT_SID;
        const authToken = TWILIO_AUTH_TOKEN;
        const sender = TWILIO_SENDER_NUMBER || "+14155238886"; // Default Twilio Sandbox sender
        const receiver = TWILIO_RECEIVER_NUMBER || "+919361257216";

        // Twilio numbers must be prefixed with "whatsapp:"
        const formattedFrom = sender.startsWith("whatsapp:") ? sender : `whatsapp:${sender}`;
        const formattedTo = receiver.startsWith("whatsapp:") ? receiver : `whatsapp:${receiver}`;

        console.log(`[Notification System] Twilio config: From='${formattedFrom}', To='${formattedTo}'`);

        const params = new URLSearchParams();
        params.append("From", formattedFrom);
        params.append("To", formattedTo);
        params.append("Body", messageText);

        const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${auth}`,
            },
            body: params.toString(),
          }
        );

        const resText = await response.text();
        console.log(`[Notification System] Twilio API Response Code: ${response.status}`);
        console.log(`[Notification System] Twilio API Response Content: ${resText}`);

        if (response.ok) {
          console.log("[Notification System] Twilio WhatsApp sent successfully.");
          return true;
        } else {
          console.error(`[Notification System] Twilio WhatsApp rejected: ${response.status} - ${resText}`);
        }
      } catch (twilioError) {
        console.error("[Notification System] Twilio WhatsApp exception:", twilioError);
      }
    } else {
      console.log("[Notification System] Twilio provider config or credentials missing, skipping Twilio path.");
    }

    // 2. Meta WhatsApp Cloud API
    if (WHATSAPP_PROVIDER === "meta" || (WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_ACCESS_TOKEN && !WHATSAPP_PROVIDER)) {
      try {
        console.log("[Notification System] Sending WhatsApp via Meta Cloud API...");
        const phoneId = WHATSAPP_PHONE_NUMBER_ID;
        const token = WHATSAPP_ACCESS_TOKEN;
        const receiverRaw = META_RECEIVER_NUMBER || "919361257216";
        const receiver = receiverRaw.replace(/\D/g, ""); // Strip non-digits

        console.log(`[Notification System] Meta config: Phone ID='${phoneId}', Receiver='${receiver}'`);

        const response = await fetch(
          `https://graph.facebook.com/v17.0/${phoneId}/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              recipient_type: "individual",
              to: receiver,
              type: "text",
              text: {
                body: messageText,
              },
            }),
          }
        );

        const resText = await response.text();
        console.log(`[Notification System] Meta API Response Code: ${response.status}`);
        console.log(`[Notification System] Meta API Response Content: ${resText}`);

        if (response.ok) {
          console.log("[Notification System] Meta WhatsApp sent successfully.");
          return true;
        } else {
          console.error(`[Notification System] Meta WhatsApp rejected: ${response.status} - ${resText}`);
        }
      } catch (metaError) {
        console.error("[Notification System] Meta WhatsApp exception:", metaError);
      }
    } else {
      console.log("[Notification System] Meta provider config or credentials missing, skipping Meta path.");
    }

    console.warn("[Notification System] No WhatsApp configuration (Twilio/Meta) succeeded or was found.");
    return false;
  } catch (globalWaError: any) {
    console.error("[Notification System] Critical uncaught exception in sendWhatsAppNotification:", globalWaError);
    return false;
  }
}
