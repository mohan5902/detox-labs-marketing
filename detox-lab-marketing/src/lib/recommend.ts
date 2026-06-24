import { ProjectGoal } from "@/types";

export function recommendPackage(
  goal: ProjectGoal,
  budget: string,
  isIndia: boolean
): string {
  if (isIndia) {
    if (goal === "N8N AI Automation") {
      if (budget.includes("Above") || budget.includes("1,00,000") || budget.includes("50,000")) {
        return "N8N AI Automation Enterprise (₹50,000)";
      }
      if (budget.includes("50,000") || budget.includes("20,000")) {
        return "N8N AI Automation Business (₹30,000) or Premium (₹40,000)";
      }
      return "N8N AI Automation Starter (₹20,000)";
    }
    if (goal === "Website Development") {
      if (budget.includes("Above") || budget.includes("50,000") || budget.includes("1,00,000")) {
        return "Premium Website (₹28,000)";
      }
      if (budget.includes("20,000")) {
        return "Business Website (₹18,000)";
      }
      return "Basic Website (₹5,000)";
    }
    if (goal === "Web Application Development") {
      return "Web Application (₹45,000)";
    }
    if (goal === "Mobile App Development") {
      if (budget.includes("Above") || budget.includes("1,00,000")) {
        return "Mobile App Enterprise (₹2,00,000) or Premium (₹1,50,000)";
      }
      if (budget.includes("50,000")) {
        return "Mobile App Business (₹1,00,000)";
      }
      return "Mobile App Startup (₹65,000)";
    }
  } else {
    // International
    if (goal === "N8N AI Automation") {
      if (budget.includes("Above") || budget.includes("6,000")) {
        return "N8N AI Automation Enterprise ($6,000)";
      }
      if (budget.includes("3,000")) {
        return "N8N AI Automation Premium ($4,500)";
      }
      if (budget.includes("1,500")) {
        return "N8N AI Automation Business ($3,000)";
      }
      return "N8N AI Automation Starter ($1,500)";
    }
    if (goal === "Website Development") {
      if (budget.includes("Above") || budget.includes("3,000") || budget.includes("6,000")) {
        return "Premium Website ($2,000)";
      }
      if (budget.includes("1,500")) {
        return "Professional Website ($1,500)";
      }
      return "Starter Website ($800)";
    }
    if (goal === "Web Application Development") {
      if (budget.includes("Above") || budget.includes("3,000") || budget.includes("6,000")) {
        return "Enterprise Web App ($2,000)";
      }
      if (budget.includes("1,500")) {
        return "Business Web App ($1,500)";
      }
      return "Starter Web App ($1,000)";
    }
    if (goal === "Mobile App Development") {
      if (budget.includes("Above") || budget.includes("6,000")) {
        return "Mobile App Enterprise ($10,000) or Premium ($7,000)";
      }
      if (budget.includes("3,000")) {
        return "Mobile App Business ($4,000)";
      }
      return "Mobile App Startup ($2,000)";
    }
  }
  return "Custom Package (Contact us for a free quote)";
}
