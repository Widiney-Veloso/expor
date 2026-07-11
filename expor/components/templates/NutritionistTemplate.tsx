"use client";

import { useState } from "react";
import { Menu, X, Check, Star, MessageCircle, Instagram } from "lucide-react";
import type { NutritionistContent, ThemeColors } from "@/lib/types";

export default function NutritionistTemplate({
  content,
  theme,
}: {
  content: NutritionistContent;
  theme: ThemeColors;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Sobre", href: "#sobre" },
    { label: "Planos", href: "#planos" },
    { label: "Resultados", href: "#resultados" },
    { label: "Depoimentos", href: "#depoimentos" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: theme.background }} className="min-h-screen text-gray-900">
      <style>{`.nt-display { font-family: 'Poppins', sans-serif; }`}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="nt-display text-lg font-bold">{content.brandName}</span>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-gray-600 hover:opacity-70">
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
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="nt-display text-5xl font-bold leading-tight md:text-6xl">
            {content.heroTitle} <span style={{ color: theme.primary }}>{content.heroHighlight}</span>
          </h1>
          <p className="text-xl leading-relaxed text-gray-600">{content.heroParagraph}</p>
          <div className="flex gap-4 pt-4">
            <a
              href={`https://wa.me/${content.whatsapp}`}
              target="_blank"
              className="flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white"
              style={{ backgroundColor: theme.primary }}
            >
              <MessageCircle className="h-5 w-5" /> Agende Consulta
            </a>
            <a
              href="#planos"
              className="rounded-lg border px-6 py-3 font-medium"
              style={{ borderColor: theme.primary, color: theme.primary }}
            >
              Saiba Mais
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
            {content.heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.heroImage} alt={content.brandName} className="h-full w-full object-cover" />
            )}
          </div>
          <div className="absolute -bottom-6 -left-6 max-w-xs rounded-2xl p-6 shadow-lg" style={{ backgroundColor: `${theme.secondary}20` }}>
            <p className="nt-display text-lg font-bold">{content.heroBadgeNumber}</p>
            <p className="text-gray-600">{content.heroBadgeLabel}</p>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="nt-display mb-4 text-4xl font-bold">Sobre Mim</h2>
            <p className="text-lg text-gray-600">{content.aboutParagraph}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.aboutCards.map((card) => (
              <div key={card.title} className="rounded-xl bg-white p-8 shadow-md">
                <h3 className="nt-display mb-3 text-xl font-bold">{card.title}</h3>
                <p className="text-gray-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="nt-display mb-4 text-4xl font-bold">Planos de Atendimento</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Escolha o plano que melhor se adequa aos seus objetivos
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-8 ${plan.highlighted ? "text-white shadow-xl md:-mt-4" : "border-2 border-gray-200"}`}
                style={plan.highlighted ? { backgroundColor: theme.primary } : undefined}
              >
                {plan.highlighted && (
                  <div
                    className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-bold"
                    style={{ backgroundColor: theme.secondary, color: "white" }}
                  >
                    Popular
                  </div>
                )}
                <h3 className="nt-display mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className={`mb-6 ${plan.highlighted ? "text-white/90" : "text-gray-600"}`}>{plan.description}</p>
                <div className="mb-6">
                  <span className="nt-display text-4xl font-bold">{plan.price}</span>
                  <span className={`ml-2 ${plan.highlighted ? "text-white/90" : "text-gray-600"}`}>{plan.period}</span>
                </div>
                <ul className="mb-8 space-y-4">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3">
                      <Check className="h-5 w-5" style={{ color: plan.highlighted ? "white" : theme.primary }} />
                      <span className={plan.highlighted ? "text-white" : "text-gray-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${content.whatsapp}`}
                  target="_blank"
                  className="block rounded-lg py-3 text-center font-medium"
                  style={
                    plan.highlighted
                      ? { backgroundColor: "white", color: theme.primary }
                      : { backgroundColor: theme.primary, color: "white" }
                  }
                >
                  Agendar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section id="resultados" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="nt-display mb-4 text-4xl font-bold">Resultados que Falam por Si</h2>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {content.results.map((r, i) => (
              <div key={i} className="space-y-6">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200">
                  {r.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.image} alt={r.title} className="h-full w-full object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="nt-display mb-2 text-2xl font-bold">{r.title}</h3>
                  <p className="leading-relaxed text-gray-600">&quot;{r.text}&quot;</p>
                  <p className="mt-4 text-sm text-gray-500">{r.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="nt-display mb-4 text-4xl font-bold">O Que Meus Pacientes Dizem</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.testimonials.map((t, i) => (
              <div key={i} className="rounded-xl bg-white p-8 shadow-md">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                    {t.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h4 className="nt-display font-bold">{t.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} className="h-4 w-4" style={{ color: theme.secondary, fill: theme.secondary }} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">&quot;{t.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center text-white" style={{ backgroundColor: theme.primary }}>
        <div className="mx-auto max-w-3xl space-y-8 px-6">
          <h2 className="nt-display text-4xl font-bold">Pronto para Começar Sua Transformação?</h2>
          <p className="text-xl text-white/90">
            Entre em contato agora e agende sua consulta inicial.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/${content.whatsapp}`}
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 font-medium"
              style={{ color: theme.primary }}
            >
              <MessageCircle className="h-5 w-5" /> Agendar Consulta
            </a>
            <a
              href={`https://instagram.com/${content.instagram.replace("@", "")}`}
              target="_blank"
              className="flex items-center justify-center gap-2 rounded-lg border border-white px-8 py-3 font-medium hover:bg-white/10"
            >
              <Instagram className="h-5 w-5" /> Instagram
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-white" style={{ backgroundColor: theme.dark }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <span className="nt-display mb-4 block font-bold">{content.brandName}</span>
              <p className="text-gray-400">Transformando vidas através de nutrição personalizada.</p>
            </div>
            <div>
              <h4 className="nt-display mb-4 font-bold">Contato</h4>
              <ul className="space-y-2 text-gray-400">
                <li>WhatsApp: {content.whatsapp}</li>
                <li>Instagram: {content.instagram}</li>
              </ul>
            </div>
            <div>
              <h4 className="nt-display mb-4 font-bold">Horários</h4>
              <ul className="space-y-2 text-gray-400">
                {content.hours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} {content.brandName}. Feito com{" "}
            <a href="/" className="underline">EXPOR</a>.
          </div>
        </div>
      </footer>
    </div>
  );
}
