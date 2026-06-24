import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Detox Lab Marketing by phone, WhatsApp, email, or Instagram, or book a free consultation directly online.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
