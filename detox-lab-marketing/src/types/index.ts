export interface ServiceItem {
  title: string;
  items: string[];
  icon: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  description: string;
  url?: string;
  stack: string[];
  accent: string;
  image: string;
}

export interface PackageFeatureSet {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  delivery: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export interface MobileAppPackage extends PackageFeatureSet {
  benefits: string[];
  suitableFor: string;
}

export interface Testimonial {
  name: string;
  role: string;
  business: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type ProjectGoal =
  | "N8N AI Automation"
  | "Website Development"
  | "Mobile App Development"
  | "Web Application Development"
  | "Not sure yet";

export interface Lead {
  id: string;
  createdAt: string;
  source: "Detox AI" | "Booking Form" | "Contact Form";
  name: string;
  country?: string;
  businessName?: string;
  email: string;
  phone: string;
  budget?: string;
  goal?: ProjectGoal;
  requirements?: string;
  recommendedPackage?: string;
  preferredDate?: string;
  preferredTime?: string;
}
