"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Phone,
  MessageCircle,
  Mail,
  Instagram,
  Loader2,
} from "lucide-react";
import { saveLead } from "@/lib/leads";
import { recommendPackage } from "@/lib/recommend";
import { SITE, buildWhatsAppLink } from "@/lib/utils";
import { ProjectGoal } from "@/types";

type Step =
  | "welcome"
  | "name"
  | "country"
  | "business"
  | "email"
  | "phone"
  | "goal"
  | "budget"
  | "requirements"
  | "summary"
  | "done";

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

const countryOptions = [
  "🇮🇳 India",
  "🇺🇸 International"
];

const goalOptions: ProjectGoal[] = [
  "N8N AI Automation",
  "Website Development",
  "Mobile App Development",
  "Web Application Development",
];

const budgetOptionsIndia = [
  "Under ₹20,000",
  "₹20,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "Above ₹1,00,000",
];

const budgetOptionsInternational = [
  "Under $1,500",
  "$1,500 – $3,000",
  "$3,000 – $6,000",
  "Above $6,000",
];

export default function DetoxAI() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [data, setData] = useState({
    name: "",
    country: "",
    business: "",
    goal: "" as ProjectGoal | "",
    budget: "",
    email: "",
    phone: "",
    requirements: "",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open && messages.length === 0) {
      triggerBotMessage("Hello! I am the N8N AI Agent, your 24/7 business assistant. Let&apos;s find the best solution for your project. What is your name?");
      setStep("name");
    }
  }, [open, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, isTyping]);

  function triggerBotMessage(text: string, delay = 600) {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { from: "bot", text }]);
    }, delay);
  }

  function pushUser(text: string) {
    setMessages((m) => [...m, { from: "user", text }]);
  }

  function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const value = input.trim();
    pushUser(value);
    setInput("");

    if (step === "name") {
      setData((d) => ({ ...d, name: value }));
      triggerBotMessage(`Great to meet you, ${value}! Which region is your business based in?`);
      setStep("country");
    } else if (step === "business") {
      setData((d) => ({ ...d, business: value }));
      triggerBotMessage("Got it. What is the best email to send your quote or consultation summary to?");
      setStep("email");
    } else if (step === "email") {
      setData((d) => ({ ...d, email: value }));
      triggerBotMessage("Thank you. And what is your WhatsApp or phone number? (Include country code if outside India)");
      setStep("phone");
    } else if (step === "phone") {
      setData((d) => ({ ...d, phone: value }));
      triggerBotMessage("Perfect. What service are you looking for?");
      setStep("goal");
    } else if (step === "requirements") {
      const updated = { ...data, requirements: value };
      setData(updated);
      finishSummary(updated);
    }
  }

  function selectCountry(country: string) {
    pushUser(country);
    setData((d) => ({ ...d, country }));
    triggerBotMessage("Got it. What is the name of your business?");
    setStep("business");
  }

  function selectGoal(goal: ProjectGoal) {
    pushUser(goal);
    setData((d) => ({ ...d, goal }));
    triggerBotMessage("What budget range are you working with?");
    setStep("budget");
  }

  function selectBudget(budget: string) {
    pushUser(budget);
    setData((d) => ({ ...d, budget }));
    triggerBotMessage("Lastly, please share a brief description of your requirements and what you want to achieve.");
    setStep("requirements");
  }

  function finishSummary(updated: typeof data) {
    const isIndia = updated.country.includes("India");
    const recommended = recommendPackage(
      (updated.goal || "Not sure yet") as ProjectGoal,
      updated.budget,
      isIndia
    );

    triggerBotMessage(`Thanks, ${updated.name}! I have gathered your requirements. Here is a summary of your inquiry:`);
    
    setTimeout(() => {
      triggerBotMessage(
        `📋 Name: ${updated.name}\n🌐 Country: ${updated.country}\n🏢 Business: ${updated.business || "—"}\n📧 Email: ${updated.email}\n📞 Phone: ${updated.phone}\n🎯 Service: ${updated.goal || "Not sure yet"}\n💰 Budget: ${updated.budget}\n📝 Requirements: ${updated.requirements}\n\n🤖 Recommended Package: ${recommended}`
      );
      setStep("summary");
    }, 1200);
  }

  async function requestConsultation() {
    setIsSaving(true);
    const isIndia = data.country.includes("India");
    const recommended = recommendPackage(
      (data.goal || "Not sure yet") as ProjectGoal,
      data.budget,
      isIndia
    );

    try {
      await saveLead({
        source: "Detox AI",
        name: data.name,
        country: data.country,
        businessName: data.business,
        email: data.email,
        phone: data.phone,
        budget: data.budget,
        goal: (data.goal || "Not sure yet") as ProjectGoal,
        requirements: data.requirements,
        recommendedPackage: recommended,
        // Default preferred contact
        preferredContact: "email",
      });

      triggerBotMessage(
        "Your consultation request and project specifications have been saved successfully! You can contact us directly on any of these channels to finalize your booking:"
      );
      setStep("done");
    } catch (err: any) {
      triggerBotMessage(
        "I'm sorry, I encountered an error saving your request: " +
          (err.message || "Please check your network and try again.")
      );
    } finally {
      setIsSaving(false);
    }
  }

  function resetChat() {
    setMessages([]);
    setData({
      name: "",
      country: "",
      business: "",
      goal: "",
      budget: "",
      email: "",
      phone: "",
      requirements: "",
    });
    setStep("welcome");
  }

  return (
    <>
      {/* Floating Button with Glow & Lift Effect */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-circuit-500 to-cyan-accent text-void shadow-glow"
        aria-label="Open N8N AI Agent assistant"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6 animate-pulse" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 flex h-[540px] w-[380px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-white/10 bg-abyss shadow-glow"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-circuit-400 to-cyan-accent">
                  <Sparkles className="h-4 w-4 text-void" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ink-100">
                    N8N AI Agent
                  </p>
                  <p className="text-[10px] text-circuit-300 font-mono">ASSISTANT • ONLINE</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-700 hover:text-ink-100 transition-colors"
                aria-label="Restart chat"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                      msg.from === "user"
                        ? "bg-gradient-to-r from-circuit-500 to-cyan-accent text-void font-semibold"
                        : "border border-white/10 bg-white/[0.04] text-ink-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 border border-white/10 bg-white/[0.04] px-4 py-3 rounded-2xl">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-circuit-300 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-circuit-300 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-circuit-300" />
                  </div>
                </div>
              )}

              {/* Country Selection */}
              {step === "country" && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {countryOptions.map((c) => (
                    <button
                      key={c}
                      onClick={() => selectCountry(c)}
                      className="rounded-full border border-circuit-400/30 bg-circuit-400/5 px-4 py-2 text-xs font-semibold text-circuit-300 hover:bg-circuit-400/15 hover:scale-[1.02] transition-all"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {/* Goal Selection */}
              {step === "goal" && !isTyping && (
                <div className="flex flex-col gap-2 pt-1">
                  {goalOptions.map((g) => (
                    <button
                      key={g}
                      onClick={() => selectGoal(g)}
                      className="w-full text-left rounded-xl border border-circuit-400/30 bg-circuit-400/5 px-4 py-2.5 text-xs font-semibold text-circuit-300 hover:bg-circuit-400/15 hover:scale-[1.01] transition-all"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}

              {/* Budget Selection */}
              {step === "budget" && !isTyping && (
                <div className="flex flex-col gap-2 pt-1">
                  {(data.country.includes("India") ? budgetOptionsIndia : budgetOptionsInternational).map((b) => (
                    <button
                      key={b}
                      onClick={() => selectBudget(b)}
                      className="w-full text-left rounded-xl border border-circuit-400/30 bg-circuit-400/5 px-4 py-2.5 text-xs font-semibold text-circuit-300 hover:bg-circuit-400/15 hover:scale-[1.01] transition-all"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}

              {/* Summary Trigger */}
              {step === "summary" && !isTyping && (
                <button
                  onClick={requestConsultation}
                  disabled={isSaving}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-circuit-500 to-cyan-accent px-5 py-3 text-xs font-bold text-void shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-70"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  {isSaving ? "Saving..." : "Confirm Request & Suggest Package"}
                </button>
              )}

              {/* Contact Channels (After done) */}
              {step === "done" && !isTyping && (
                <div className="space-y-2.5 pt-2">
                  <a
                    href={`tel:${SITE.phoneDial}`}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-ink-200 hover:border-circuit-400/40 hover:bg-white/[0.06] transition-colors"
                  >
                    <Phone className="h-4 w-4 text-circuit-400" /> Call Now: {SITE.phone}
                  </a>
                  <a
                    href={buildWhatsAppLink(`Hello Detox Labs, I just finished speaking with the N8N AI Agent and would like to confirm my consultation booking.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-ink-200 hover:border-circuit-400/40 hover:bg-white/[0.06] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-circuit-400" /> WhatsApp Chat: {SITE.whatsapp}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-ink-200 hover:border-circuit-400/40 hover:bg-white/[0.06] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-circuit-400" /> Email: {SITE.email}
                  </a>
                  <a
                    href={SITE.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-ink-200 hover:border-circuit-400/40 hover:bg-white/[0.06] transition-colors"
                  >
                    <Instagram className="h-4 w-4 text-circuit-400" /> Instagram: {SITE.instagram}
                  </a>
                </div>
              )}
            </div>

            {/* Input Form */}
            {!["country", "goal", "budget", "summary", "done"].includes(step) && (
              <form
                onSubmit={handleTextSubmit}
                className="flex items-center gap-2 border-t border-white/10 p-3 bg-white/[0.01]"
              >
                <input
                  disabled={isTyping}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isTyping ? "Agent is typing..." : "Type your answer..."}
                  className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-ink-100 outline-none placeholder:text-ink-700 focus:border-circuit-400/50 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-circuit-500 to-cyan-accent text-void disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
