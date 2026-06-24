"use client";

import { Lead } from "@/types";

const STORAGE_KEY = "detox_lab_leads";

function readLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch {
    // storage unavailable — fail silently, lead is still shown to the user
  }
}

export function saveLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
  const fullLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const leads = readLeads();
  leads.unshift(fullLead);
  writeLeads(leads);
  return fullLead;
}

export function getLeads(): Lead[] {
  return readLeads();
}

export function clearLeads() {
  writeLeads([]);
}
