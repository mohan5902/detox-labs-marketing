# Detox Lab Marketing — Website

A production-ready marketing website for **Detox Lab Marketing**, built with Next.js 15 (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The build requires internet access the first time, since `next/font/google` downloads Space Grotesk, Inter, and JetBrains Mono at build time.

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
  app/                  Routes (App Router)
    page.tsx            Home
    services/           Services page
    projects/           Projects / portfolio page
    packages/website/   Website & web app pricing
    packages/mobile-app/Mobile app pricing
    contact/            Contact page (form, booking, channels)
    layout.tsx          Root layout, fonts, navbar/footer/AI/WhatsApp
    sitemap.ts           Auto-generated sitemap.xml
    robots.ts            Auto-generated robots.txt
  components/
    layout/             Navbar, Footer, FloatingWhatsApp
    home/               Hero, About, Stats, Testimonials, FAQ, CTA...
    services/           ServiceCard
    projects/           ProjectCard
    pricing/            PricingCard
    modals/             ContactModal (shown from "Get This Package")
    booking/            ContactForm, BookingForm (appointment booking)
    ai/                 DetoxAI floating assistant
    ui/                 Container, SectionHeading, GlassCard, GradientBlob...
  data/                 Editable content: services, projects, packages, FAQ, testimonials
  lib/                  utils (WhatsApp link builder, site constants), leads storage, recommendation engine
  types/                Shared TypeScript types
```

## Editing Content

Almost everything on the site is data-driven — to update content without touching components, edit the files in `src/data/`:

- `services.ts` — services + "Why Choose Us" cards
- `projects.ts` — portfolio projects
- `websitePackages.ts` — website & web app pricing
- `mobileAppPackages.ts` — mobile app pricing
- `testimonials.ts` — placeholder testimonials (replace with real client quotes)
- `faq.ts` — FAQ section

Company details (phone, WhatsApp, email, Instagram) live in `src/lib/utils.ts` under the `SITE` object — update once and it propagates everywhere (navbar, footer, contact page, WhatsApp links, AI assistant, contact modal).

## Detox AI Assistant

A rule-based conversational widget (`src/components/ai/DetoxAI.tsx`) that:

1. Greets visitors and collects name, business name, project goal, budget, email, phone, and requirements.
2. Generates a consultation summary and recommends a package using `src/lib/recommend.ts`.
3. Saves the lead to `localStorage` via `src/lib/leads.ts` (`getLeads()` / `saveLead()` / `clearLeads()`).
4. Lets the visitor continue the conversation on WhatsApp.

This is intentionally dependency-free (no external AI API key required) so it works immediately. If you want it backed by a real LLM, swap the rule-based logic in `DetoxAI.tsx` for an API call to your model of choice.

## Lead Storage

Leads from the AI assistant, the booking form, and the contact form are all saved to the browser's `localStorage` under the key `detox_lab_leads`. This keeps the project fully self-contained without a backend. To wire it to a real backend or CRM, replace the implementation in `src/lib/leads.ts` with an API call.

## Notes

- Project screenshots in `/projects` use styled placeholders (gradient + icon) instead of real images per the brief — swap in real screenshots via `next/image` when available.
- The Contact page intentionally omits any physical address or map, since the business operates fully online.
