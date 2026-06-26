"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Trash2,
  Download,
  Eye,
  LogOut,
  RefreshCw,
  Clock,
  Briefcase,
  Layers,
  PhoneCall,
  UserCheck,
  CheckCircle,
  FileText,
  Calendar,
  Shield,
  Loader2,
  X,
} from "lucide-react";
import GridBackdrop from "@/components/ui/GridBackdrop";

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string | null;
  business_type: string | null;
  service_required: string;
  budget: string | null;
  description: string | null;
  preferred_contact: string;
  ip_address: string | null;
  status: "New" | "Contacted" | "Closed";
  source: string;
  recommended_package: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Search & Filter States
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [contactFilter, setContactFilter] = useState("all");

  // Selection / Modal States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch leads from API
  const fetchLeads = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (search.trim()) params.append("q", search.trim());
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (serviceFilter !== "all") params.append("service", serviceFilter);
      if (sourceFilter !== "all") params.append("source", sourceFilter);
      if (contactFilter !== "all") params.append("preferredContact", contactFilter);

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      if (res.status === 401) {
        // Unauthorized -> redirect to login
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setLeads(data.leads || []);
      } else {
        setError(data.error || "Failed to load leads.");
      }
    } catch (err) {
      setError("Failed to communicate with the server.");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, statusFilter, serviceFilter, sourceFilter, contactFilter, router]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Debounced search trigger (using simple manual trigger or search on filter changes)
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  // Change lead status
  async function handleStatusChange(leadId: string, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (res.ok) {
        // Update local list
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus as never } : l))
        );
        // If there's a selected lead modal open, update it too
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as never } : null));
        }
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating lead status.");
    }
  }

  // Delete lead
  async function handleDeleteLead() {
    if (!deletingLead) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/leads/${deletingLead.id}`, {
        method: "DELETE",
      });

      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== deletingLead.id));
        setDeletingLead(null);
        if (selectedLead && selectedLead.id === deletingLead.id) {
          setSelectedLead(null);
        }
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete lead.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting lead.");
    } finally {
      setIsDeleting(false);
    }
  }

  // Export to CSV
  function handleExportToCSV() {
    if (leads.length === 0) return;

    const headers = [
      "ID",
      "Date",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Company Name",
      "Business Type",
      "Service Required",
      "Budget",
      "Preferred Contact",
      "Status",
      "Source",
      "Recommended Package",
      "Preferred Date",
      "Preferred Time",
      "IP Address",
      "Requirements",
    ];

    const rows = leads.map((lead) => [
      lead.id,
      new Date(lead.created_at).toISOString(),
      `"${lead.full_name.replace(/"/g, '""')}"`,
      lead.email,
      lead.phone,
      lead.company_name ? `"${lead.company_name.replace(/"/g, '""')}"` : "",
      lead.business_type ? `"${lead.business_type.replace(/"/g, '""')}"` : "",
      lead.service_required,
      lead.budget || "",
      lead.preferred_contact,
      lead.status,
      lead.source,
      lead.recommended_package || "",
      lead.preferred_date || "",
      lead.preferred_time || "",
      lead.ip_address || "",
      lead.description ? `"${lead.description.replace(/"/g, '""')}"` : "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `detox_labs_leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Logout
  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  // Calculate Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;
  const closedLeads = leads.filter((l) => l.status === "Closed").length;

  return (
    <div className="relative min-h-screen pb-16 pt-6">
      <GridBackdrop />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dashboard Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-circuit-400">
              <Shield className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-wider">Admin Workspace</span>
            </div>
            <h1 className="mt-1 font-display text-3xl font-semibold text-ink-100">
              Lead Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchLeads(true)}
              disabled={refreshing}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-ink-500 hover:text-ink-100 transition-colors disabled:opacity-50"
              title="Refresh leads"
            >
              <RefreshCw className={`h-4.5 w-4.5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleExportToCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-ink-300 hover:text-ink-100 hover:bg-white/[0.05] transition-colors disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-5 grid-cols-2 md:grid-cols-4 mb-8">
          <StatCard label="Total Leads" value={totalLeads} icon={Layers} color="text-circuit-400" />
          <StatCard label="New Leads" value={newLeads} icon={Clock} color="text-yellow-400" />
          <StatCard label="Contacted" value={contactedLeads} icon={PhoneCall} color="text-cyan-accent" />
          <StatCard label="Closed" value={closedLeads} icon={CheckCircle} color="text-green-400" />
        </div>

        {/* Controls: Search and Filters */}
        <div className="rounded-2xl border border-white/10 bg-abyss p-5 mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
                Search Leads
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-3 h-4 w-4 text-ink-700" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Name, Email, Phone, Company, Description..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 py-2.5 text-sm text-ink-100 outline-none focus:border-circuit-400/50"
                />
              </div>
            </div>

            <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:w-[60%]">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-ink-100 outline-none focus:border-circuit-400/50"
                >
                  <option value="all" className="bg-abyss">All Statuses</option>
                  <option value="New" className="bg-abyss">New</option>
                  <option value="Contacted" className="bg-abyss">Contacted</option>
                  <option value="Closed" className="bg-abyss">Closed</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
                  Contact
                </label>
                <select
                  value={contactFilter}
                  onChange={(e) => setContactFilter(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-ink-100 outline-none focus:border-circuit-400/50"
                >
                  <option value="all" className="bg-abyss">All Methods</option>
                  <option value="email" className="bg-abyss">Email</option>
                  <option value="phone" className="bg-abyss">Phone Call</option>
                  <option value="whatsapp" className="bg-abyss">WhatsApp</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-700">
                  Source
                </label>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-ink-100 outline-none focus:border-circuit-400/50"
                >
                  <option value="all" className="bg-abyss">All Sources</option>
                  <option value="Booking Form" className="bg-abyss">Booking Form</option>
                  <option value="Contact Form" className="bg-abyss">Contact Form</option>
                  <option value="Detox AI" className="bg-abyss">Detox AI</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-circuit-500 to-cyan-accent py-2.5 text-xs font-semibold text-void hover:opacity-90 transition-opacity"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Lead Table */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-abyss shadow-glow">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-ink-500">
              <Loader2 className="h-8 w-8 animate-spin text-circuit-400 mb-2" />
              <p className="text-sm">Fetching leads data...</p>
            </div>
          ) : error ? (
            <div className="py-20 text-center text-red-400">
              <p className="text-sm font-medium">{error}</p>
              <button
                onClick={() => fetchLeads()}
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-circuit-400 hover:text-circuit-300"
              >
                Try Again
              </button>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-24 text-center text-ink-500">
              <FileText className="h-10 w-10 mx-auto text-ink-700 mb-3" />
              <p className="text-sm font-medium">No leads match your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-ink-500">
                    <th className="px-6 py-4">Name / Company</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-ink-300">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-white/[0.01] transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-ink-100">{lead.full_name}</div>
                        {lead.company_name && (
                          <div className="text-xs text-ink-500">{lead.company_name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div>
                          <a href={`mailto:${lead.email}`} className="hover:text-circuit-400 hover:underline">
                            {lead.email}
                          </a>
                        </div>
                        <div className="text-xs text-ink-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded bg-white/[0.04] border border-white/5 px-2 py-0.5 text-xs text-ink-100">
                          {lead.service_required}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-ink-500">{lead.source}</span>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`rounded px-2.5 py-1 text-xs font-semibold border outline-none ${
                            lead.status === "New"
                              ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                              : lead.status === "Contacted"
                              ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-accent"
                              : "bg-green-500/10 border-green-500/20 text-green-400"
                          }`}
                        >
                          <option value="New" className="bg-abyss text-yellow-500">New</option>
                          <option value="Contacted" className="bg-abyss text-cyan-400">Contacted</option>
                          <option value="Closed" className="bg-abyss text-green-400">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-xs text-ink-500">
                        {new Date(lead.created_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 text-ink-500 hover:text-ink-100 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeletingLead(lead)}
                            className="p-1.5 text-ink-500 hover:text-red-400 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Lead Details Modal */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-abyss p-7 shadow-glow max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-ink-500 hover:text-ink-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="inline-flex items-center rounded-full border border-circuit-400/30 bg-circuit-400/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-circuit-300">
                Lead Detail
              </span>

              <h2 className="mt-4 font-display text-2xl font-semibold text-ink-100">
                {selectedLead.full_name}
              </h2>
              <p className="mt-1 text-xs text-ink-500">ID: {selectedLead.id}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <DetailItem label="Email" value={selectedLead.email} isLink href={`mailto:${selectedLead.email}`} />
                <DetailItem
                  label="Phone Number"
                  value={selectedLead.phone}
                  isLink
                  href={`https://wa.me/${selectedLead.phone.replace(/\D/g, "")}`}
                  linkText="Open WhatsApp chat"
                />
                <DetailItem label="Company Name" value={selectedLead.company_name || "—"} />
                <DetailItem label="Business Type" value={selectedLead.business_type || "—"} />
                <DetailItem label="Service Required" value={selectedLead.service_required} />
                <DetailItem label="Budget" value={selectedLead.budget || "—"} />
                <DetailItem label="Preferred Contact Method" value={selectedLead.preferred_contact} className="capitalize" />
                <DetailItem label="Submission Date & Time" value={new Date(selectedLead.created_at).toLocaleString()} />
                <DetailItem label="IP Address" value={selectedLead.ip_address || "Unknown"} />
                <DetailItem label="Lead Source" value={selectedLead.source} />

                {selectedLead.recommended_package && (
                  <DetailItem label="AI Recommended Package" value={selectedLead.recommended_package} className="sm:col-span-2 text-cyan-accent font-semibold" />
                )}

                {selectedLead.preferred_date && (
                  <DetailItem
                    label="Preferred Booking"
                    value={`${selectedLead.preferred_date} at ${selectedLead.preferred_time || "Not specified"}`}
                    className="sm:col-span-2"
                  />
                )}

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-ink-500 font-medium">Status</label>
                  <div className="mt-1.5">
                    <select
                      value={selectedLead.status}
                      onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                      className={`rounded px-3 py-1.5 text-sm font-semibold border outline-none ${
                        selectedLead.status === "New"
                          ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                          : selectedLead.status === "Contacted"
                          ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-accent"
                          : "bg-green-500/10 border-green-500/20 text-green-400"
                      }`}
                    >
                      <option value="New" className="bg-abyss text-yellow-500">New</option>
                      <option value="Contacted" className="bg-abyss text-cyan-400">Contacted</option>
                      <option value="Closed" className="bg-abyss text-green-400">Closed</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs uppercase tracking-wider text-ink-500 font-medium">
                    Project Description / Requirements
                  </label>
                  <div className="mt-1.5 text-sm leading-relaxed text-ink-300 whitespace-pre-wrap bg-white/[0.01] border border-white/5 rounded-xl p-4">
                    {selectedLead.description || "No project description provided."}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Lead Confirmation Modal */}
      <AnimatePresence>
        {deletingLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingLead(null)}
              className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-abyss p-6 shadow-glow text-center"
            >
              <Trash2 className="h-10 w-10 text-red-500 mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-ink-100">Delete Lead?</h3>
              <p className="mt-2 text-sm text-ink-500 leading-relaxed">
                Are you sure you want to delete <strong>{deletingLead.full_name}</strong>? This action is permanent.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setDeletingLead(null)}
                  disabled={isDeleting}
                  className="flex-1 rounded-full border border-white/10 py-2.5 text-xs font-semibold text-ink-300 hover:text-ink-100 hover:bg-white/[0.05] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteLead}
                  disabled={isDeleting}
                  className="flex-1 rounded-full bg-red-600 py-2.5 text-xs font-semibold text-white hover:bg-red-700 shadow-glow transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isDeleting && <Loader2 className="h-3 w-3 animate-spin" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stats Card Helper
function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-abyss p-5 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-ink-500 font-medium">{label}</p>
        <h3 className="mt-1.5 font-display text-2xl font-bold text-ink-100">{value}</h3>
      </div>
      <span className={`h-10 w-10 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 ${color}`}>
        <Icon className="h-5 w-5" />
      </span>
    </div>
  );
}

// Detail Item Helper
function DetailItem({
  label,
  value,
  isLink = false,
  href = "",
  linkText = "",
  className = "",
}: {
  label: string;
  value: string;
  isLink?: boolean;
  href?: string;
  linkText?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-wider text-ink-500 font-medium">{label}</label>
      <div className="mt-1 text-sm font-semibold text-ink-100">
        {isLink ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-circuit-400 hover:underline hover:text-circuit-300 flex flex-wrap gap-1.5 items-center"
          >
            {value}
            {linkText && <span className="text-[10px] text-ink-500 font-normal">({linkText})</span>}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
