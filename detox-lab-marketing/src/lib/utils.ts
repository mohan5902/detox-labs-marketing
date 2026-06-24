import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const SITE = {
  name: "Detox Labs",
  tagline: "Transforming Ideas Into Digital Solutions",
  email: "detoxmarketinglab@gmail.com",
  phone: "+91 9361257216",
  phoneDial: "+919361257216",
  whatsapp: "+91 9361257216",
  whatsappNumber: "919361257216",
  instagram: "@detoxlabs.Official",
  instagramUrl: "https://instagram.com/detoxlabs.Official",
  domain: "detoxlabs.me",
};

export function buildWhatsAppLink(message?: string) {
  const defaultMessage =
    "Hello Detox Labs, I would like to discuss my project.";
  const text = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}

