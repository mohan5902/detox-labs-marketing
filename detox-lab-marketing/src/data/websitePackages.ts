import { PackageFeatureSet } from "@/types";

export const websitePackages: PackageFeatureSet[] = [
  {
    id: "basic-website",
    name: "Basic Website",
    price: "₹5,000",
    delivery: "2 Weeks",
    features: [
      "Responsive Design",
      "Contact Form",
      "WhatsApp Integration",
      "Basic SEO",
      "Mobile Friendly",
    ],
  },
  {
    id: "business-website",
    name: "Business Website",
    price: "₹18,000",
    delivery: "3 Weeks",
    badge: "Most Popular",
    highlighted: true,
    features: [
      "Up to 10 Pages",
      "Custom Design",
      "SEO Optimization",
      "Lead Generation Forms",
      "Google Business Integration",
    ],
  },
  {
    id: "premium-website",
    name: "Premium Website",
    price: "₹28,000",
    delivery: "3 Weeks",
    features: [
      "Unlimited Pages",
      "Custom Frontend",
      "Custom Backend",
      "Admin Dashboard",
      "Advanced SEO",
      "Maintenance Support",
    ],
  },
  {
    id: "web-application",
    name: "Web Application",
    price: "₹45,000",
    delivery: "1 Month",
    badge: "For Platforms",
    features: [
      "Frontend Development",
      "Backend Development",
      "Authentication",
      "Database Integration",
      "API Integrations",
      "Custom Dashboards",
    ],
  },
];
