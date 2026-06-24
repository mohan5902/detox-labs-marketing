import { MobileAppPackage } from "@/types";

export const mobileAppPackages: MobileAppPackage[] = [
  {
    id: "startup-app",
    name: "Startup App",
    price: "₹65,000",
    delivery: "4–5 Weeks",
    suitableFor: "Solo founders and early-stage startups validating an idea",
    features: [
      "Single Platform (Android or iOS)",
      "Up to 6 Screens",
      "Basic Backend & Database",
      "Push Notifications",
      "App Store Submission Support",
    ],
    benefits: [
      "Get to market fast without overbuilding",
      "Low-risk way to test demand before scaling",
    ],
  },
  {
    id: "business-app",
    name: "Business App",
    price: "₹1,00,000",
    delivery: "6–7 Weeks",
    badge: "Most Popular",
    highlighted: true,
    suitableFor: "Local businesses and service providers managing customers digitally",
    features: [
      "Cross-Platform (Android + iOS)",
      "Up to 12 Screens",
      "Secure Authentication",
      "Admin Panel Included",
      "Payment Gateway Integration",
    ],
    benefits: [
      "One codebase reaches both Android and iOS users",
      "Admin panel lets you manage the app without a developer",
    ],
  },
  {
    id: "premium-app",
    name: "Premium App",
    price: "₹1,50,000",
    delivery: "8–10 Weeks",
    badge: "Best Value",
    suitableFor: "Growing brands that need booking, ordering, or delivery features",
    features: [
      "Cross-Platform (Android + iOS)",
      "Unlimited Screens",
      "Real-Time Order/Booking System",
      "Custom Admin Dashboard",
      "Advanced API Integrations",
    ],
    benefits: [
      "Built to support real transaction volume from day one",
      "Custom dashboard gives full visibility into operations",
    ],
  },
  {
    id: "enterprise-app",
    name: "Enterprise App",
    price: "₹2,00,000",
    delivery: "10–12 Weeks",
    suitableFor: "Established companies needing a scalable, multi-feature platform",
    features: [
      "Cross-Platform (Android + iOS)",
      "Multi-Role User Access",
      "Scalable Cloud Architecture",
      "Advanced Analytics Dashboard",
      "Dedicated Post-Launch Support",
    ],
    benefits: [
      "Architecture built to scale with user growth",
      "Dedicated support beyond the standard maintenance window",
    ],
  },
];
