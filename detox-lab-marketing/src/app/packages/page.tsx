import type { Metadata } from "next";
import PackagesPageClient from "./PackagesPageClient";

export const metadata: Metadata = {
  title: "Pricing Packages",
  description:
    "Explore our pricing plans for N8N AI Automation, Website Development, Mobile App Development, and custom Web Applications. Choose India or International plans.",
};

export default function PackagesPage() {
  return <PackagesPageClient />;
}
