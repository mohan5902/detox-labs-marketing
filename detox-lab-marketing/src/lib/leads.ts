/**
 * Save a lead by sending a POST request to the backend API.
 * Maps both legacy and new form fields to the unified backend schema.
 */
export async function saveLead(lead: {
  source: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  companyName?: string;
  businessType?: string;
  goal?: string;
  serviceRequired?: string;
  budget?: string;
  requirements?: string;
  description?: string;
  preferredContact?: string;
  recommendedPackage?: string;
  preferredDate?: string;
  preferredTime?: string;
  country?: string;
}): Promise<{ success: boolean; message: string; leadId: string }> {
  // Combine requirements and country if available
  const requirementsText = [
    lead.description || lead.requirements || "",
    lead.country ? `Country: ${lead.country}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // Normalize and map input fields to the API schema
  const payload = {
    fullName: lead.name,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.companyName || lead.businessName || null,
    businessType: lead.businessType || "Not specified",
    serviceRequired: lead.serviceRequired || lead.goal || "Not sure yet",
    budget: lead.budget || null,
    description: requirementsText,
    preferredContact: lead.preferredContact || "email",
    source: lead.source,
    recommendedPackage: lead.recommendedPackage || null,
    preferredDate: lead.preferredDate || null,
    preferredTime: lead.preferredTime || null,
  };

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to submit consultation request.");
  }

  return data;
}

/**
 * Kept for type compatibility, though leads list is retrieved from the admin API now.
 */
export function getLeads(): any[] {
  return [];
}

/**
 * Kept for interface compatibility.
 */
export function clearLeads() {}
