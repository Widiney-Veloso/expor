"use client";

import { useState } from "react";
import { Menu, X, Star, ArrowRight, ExternalLink, MessageCircle, Instagram } from "lucide-react";
import type { DeveloperContent, ThemeColors } from "@/lib/types";

export default function DeveloperTemplate({
  content,
  theme,
}: {
  content: DeveloperContent;
  theme: ThemeColors;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Sobre", href: "#about" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Planos", href: "#pricing" },
    { label: "Avaliações", href: "#testimonials" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen text-gray-900">
      <style>{`.dv-display { font-family: 'Poppins', sans-serif; }`}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="dv-display text-xl font-bold">{content.brandName}</span>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="font-medium text-gray-700 hover:opacity-70">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={`https://wa.me/${content.whatsapp}`}
            target="_blank"
            className="hidden rounded-lg px-6 py-3 font-medium text-white md:block"
            style={{ backgroundColor: theme.primary }}
          >
            Contato
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-0 pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <span
                className="inline-block rounded-full border px-4 py-2 text-sm font-medium"
                style={{ borderColor: theme.secondary, color: theme.secondary, backgroundColor: `${theme.secondary}20` }}
              >
                {content.heroBadge}
              </span>
              <h1 className="dv-display text-5xl font-bold leading-tight md:text-7xl">
                {content.heroTitle}{" "}
                <span style={{ color: theme.primary }}>{content.heroHighlight}</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-gray-700">{content.heroParagraph}</p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <a
                  href={`https://wa.me/${content.whatsapp}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 rounded-lg px-8 py-3 font-medium text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  Começar Projeto <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#portfolio"
                  className="rounded-lg border-2 px-8 py-3 text-center font-medium"
                  style={{ borderColor: theme.secondary, color: theme.secondary }}
                >
                  Ver Portfólio
                </a>
              </div>
            </div>
            <div className="relative flex h-96 items-center justify-center">
              <div className="relative h-full w-full max-w-sm overflow-hidden rounded-2xl border-4 border-white bg-gray-100 shadow-2xl">
                {content.heroImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={content.heroImage} alt={content.brandName} className="h-full w-full object-cover" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl">
            <div
              className="mb-4 inline-block rounded-full border px-4 py-2 text-sm font-medium"
              style={{ borderColor: theme.primary, color: theme.primary, backgroundColor: `${theme.primary}15` }}
            >
              {content.aboutBadge}
            </div>
            <h2 className="dv-display mb-6 text-4xl font-bold md:text-5xl">{content.aboutTitle}</h2>
            <p className="text-lg leading-relaxed text-gray-700">{content.aboutParagraph}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.services.map((service, idx) => (
              <div
                key={idx}
                className="rounded-xl border-2 p-6"
                style={{
                  borderColor: idx % 2 === 0 ? `${theme.primary}30` : `${theme.secondary}30`,
                  backgroundColor: idx % 2 === 0 ? `${theme.primary}08` : `${theme.secondary}08`,
                }}
              >
                <h3 className="dv-display mb-2 text-lg font-bold">{service.title}</h3>
                <p className="text-sm text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="dv-display mb-8 text-2xl font-bold">Tecnologias &amp; Skills</h3>
            <div className="flex flex-wrap gap-3">
              {content.skills.map((skill, idx) => (
                <span
                  key={skill}
                  className="rounded-full border-2 px-4 py-2 text-sm font-medium"
                  style={{
                    borderColor: idx % 2 === 0 ? `${theme.primary}40` : `${theme.secondary}40`,
                    color: idx % 2 === 0 ? theme.primary : theme.secondary,
                    backgroundColor: idx % 2 === 0 ? `${theme.primary}10` : `${theme.secondary}10`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <div
              className="mb-4 inline-block rounded-full border px-4 py-2 text-sm font-medium"
              style={{ borderColor: theme.secondary, color: theme.secondary, backgroundColor: `${theme.secondary}10` }}
            >
              Portfólio
            </div>
            <h2 className="dv-display text-4xl font-bold md:text-5xl">Projetos que Transformaram Negócios</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.gallery.map((item, idx) => (
              <div key={idx} className="group">
                <div className="relative mb-4 h-64 overflow-hidden rounded-2xl border-4 border-white bg-gray-200 shadow-lg">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <div
                    className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: theme.secondary }}
                  >
                    {item.category}
                  </div>
                </div>
                <h3 className="dv-display mb-2 text-lg font-bold">{item.title}</h3>
                <p className="mb-3 text-sm text-gray-700">{item.description}</p>
                <span className="inline-flex items-center gap-2 font-medium" style={{ color: theme.primary }}>
                  Ver Projeto <ExternalLink className="h-4 w-4" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="dv-display text-4xl font-bold md:text-5xl">Investimento Justo para Resultados Reais</h2>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {content.plans.map((plan, idx) => (
              <div
                key={idx}
                className="relative rounded-xl border-2 p-8"
                style={
                  plan.highlighted
                    ? { borderColor: theme.secondary, backgroundColor: `${theme.secondary}0a` }
                    : { borderColor: "#e5e7eb" }
                }
              >
                {plan.highlighted && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: theme.secondary }}
                  >
                    ⭐ MAIS POPULAR
                  </div>
                )}
                <h3 className="dv-display mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className="mb-6 text-sm text-gray-600">{plan.description}</p>
                <div className="mb-6">
                  <span className="dv-display text-4xl font-bold">{plan.price}</span>
                  <span className="ml-2 text-sm text-gray-600">{plan.period}</span>
                </div>
                <a
                  href={`https://wa.me/${content.whatsapp}`}
                  target="_blank"
                  className="mb-8 block rounded-lg py-3 text-center font-medium text-white"
                  style={{ backgroundColor: plan.highlighted ? theme.secondary : theme.primary }}
                >
                  Solicitar Orçamento
                </a>
                <ul className="space-y-3">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="font-bold" style={{ color: plan.highlighted ? theme.secondary : theme.primary }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <h2 className="dv-display text-4xl font-bold md:text-5xl">O Que Dizem Meus Clientes</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.testimonials.map((t, idx) => (
              <div
                key={idx}
                className="rounded-xl border-2 p-8"
                style={{
                  borderColor: idx % 2 === 0 ? `${theme.primary}30` : `${theme.secondary}30`,
                  backgroundColor: idx % 2 === 0 ? `${theme.primary}08` : `${theme.secondary}08`,
                }}
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4" style={{ color: theme.secondary, fill: theme.secondary }} />
                  ))}
                </div>
                <p className="mb-6 italic leading-relaxed text-gray-700">&quot;{t.content}&quot;</p>
                <div className="flex items-center gap-4">
                  <div
                    className="dv-display flex h-12 w-12 items-center justify-center rounded-full font-bold text-white"
                    style={{ backgroundColor: idx % 2 === 0 ? theme.primary : theme.secondary }}
                  >
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="dv-display font-bold">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center" style={{ background: `linear-gradient(to bottom right, ${theme.primary}, ${theme.secondary})` }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="dv-display mb-6 text-4xl font-bold text-white md:text-5xl">{content.ctaTitle}</h2>
          <p className="mb-8 text-lg text-white/90">{content.ctaParagraph}</p>
          <a
            href={`https://wa.me/${content.whatsapp}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-medium"
            style={{ color: theme.primary }}
          >
            Agendar Conversa <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 py-12 text-white" style={{ backgroundColor: theme.dark }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="dv-display text-lg font-bold">{content.brandName}</span>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${content.whatsapp}`}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: theme.primary }}
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={`https://instagram.com/${content.instagram.replace("@", "")}`}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: theme.secondary }}
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {content.brandName}. Feito com{" "}
            <a href="/" className="underline">EXPOR</a>.
          </div>
        </div>
      </footer>
    </div>
  );
}
