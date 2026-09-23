import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  HardHat,
  Package,
  Receipt,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Building2,
    title: "Project management",
    desc: "Track every project from planning to completion — phases, tasks, milestones, and schedule in one place.",
  },
  {
    icon: Package,
    title: "Material tracking",
    desc: "Know exactly what's in stock, what's been used on site, and when to reorder before you run out.",
  },
  {
    icon: Wallet,
    title: "Financial management",
    desc: "Estimates, budgets, expenses, invoices and payments — all tied to the project they belong to.",
  },
  {
    icon: ClipboardList,
    title: "Progress tracking",
    desc: "Daily site reports roll up into real project progress, so everyone knows where things stand.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    features: ["Limited projects & clients", "Task management", "Basic expenses", "Estimates"],
  },
  {
    name: "Professional",
    price: "$129",
    period: "/mo",
    highlighted: true,
    features: ["More projects", "Materials & workers", "Invoicing", "Reports", "Client portal"],
  },
  {
    name: "Business",
    price: "$299",
    period: "/mo",
    features: ["Unlimited projects", "Advanced analytics", "Advanced permissions", "Multiple locations"],
  },
];

const faqs = [
  { q: "Can I import my existing projects?", a: "Yes — CSV import is available for clients, projects, and materials during onboarding." },
  { q: "Does BuildFlow support multiple companies?", a: "Every organization's data is fully isolated. If you run multiple companies, use separate accounts." },
  { q: "Can clients see my internal costs?", a: "No. The client portal only ever shows what you choose to share — progress, documents, estimates, and invoices." },
  { q: "Is there a free trial?", a: "Yes, every plan starts with a 14-day free trial, no card required." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-ink-300/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-brand-600" />
            <span className="text-lg font-semibold text-ink-900">BuildFlow</span>
          </div>
          <nav className="hidden gap-8 text-sm font-medium text-ink-700 md:flex">
            <a href="#features" className="hover:text-brand-600">Features</a>
            <a href="#pricing" className="hover:text-brand-600">Pricing</a>
            <a href="#faq" className="hover:text-brand-600">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-ink-700 hover:text-brand-600">Log in</Link>
            <Link to="/register" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
          Build better. Track everything. Stay in control.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-500">
          The construction management platform that takes a project from estimate to
          completion — clients, crews, materials, and money, all in one place.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register" className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700">
            Start Free
          </Link>
          <a href="#features" className="rounded-lg border border-ink-300/40 px-6 py-3 font-semibold text-ink-700 hover:border-brand-400">
            View Demo
          </a>
        </div>

        {/* Dashboard preview */}
        <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-ink-300/20 bg-ink-900 p-2 shadow-2xl">
          <div className="rounded-xl bg-white p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              {[
                { label: "Active Projects", value: "18" },
                { label: "Outstanding", value: "$42,300" },
                { label: "Tasks Due Today", value: "9" },
                { label: "Avg. Progress", value: "64%" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-ink-300/20 p-4 text-left">
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold text-ink-900">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-ink-900">Everything a project manager needs</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-ink-300/20 p-6">
              <f.icon className="h-8 w-8 text-brand-600" />
              <h3 className="mt-4 font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Client portal preview */}
      <section className="bg-ink-900 py-16 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">A client portal they'll actually use</h2>
            <p className="mt-4 text-ink-300">
              Clients see progress, photos, milestones, estimates and invoices —
              nothing about your internal costs or operations.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {["Live project progress", "Photos & documents", "Estimates & invoices", "Payment history"].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-400" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white/5 p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-brand-400">
              <BarChart3 className="h-4 w-4" /> Riverside Villa
            </div>
            <p className="mt-2 text-3xl font-bold">72% Complete</p>
            <div className="mt-3 h-2 rounded-full bg-white/10">
              <div className="h-2 w-[72%] rounded-full bg-brand-500" />
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-ink-300">
              <Receipt className="h-4 w-4" /> Invoice #INV-00152 — Paid
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-ink-900">Simple, transparent pricing</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-8 ${p.highlighted ? "border-brand-500 shadow-lg" : "border-ink-300/20"}`}
            >
              <h3 className="font-semibold text-ink-900">{p.name}</h3>
              <p className="mt-2 text-3xl font-bold text-ink-900">
                {p.price}
                <span className="text-base font-normal text-ink-500">{p.period}</span>
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-700">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`mt-8 block rounded-lg px-4 py-2 text-center text-sm font-semibold ${
                  p.highlighted ? "bg-brand-600 text-white hover:bg-brand-700" : "border border-ink-300/40 text-ink-700 hover:border-brand-400"
                }`}
              >
                Start Free
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-ink-900">Frequently asked questions</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-ink-900">{f.q}</h3>
              <p className="mt-1 text-sm text-ink-500">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to run your projects on BuildFlow?</h2>
        <Link to="/register" className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-600 hover:bg-brand-50">
          Start Free
        </Link>
      </section>

      <footer className="border-t border-ink-300/20 py-8 text-center text-sm text-ink-500">
        © {new Date().getFullYear()} BuildFlow. All rights reserved.
      </footer>
    </div>
  );
}
