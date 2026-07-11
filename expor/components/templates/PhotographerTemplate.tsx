"use client";

import { useState } from "react";
import { Menu, X, Star, ArrowRight, Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import type { PhotographerContent, ThemeColors } from "@/lib/types";

export default function PhotographerTemplate({
  content,
  theme,
}: {
  content: PhotographerContent;
  theme: ThemeColors;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Sobre", href: "#about" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Planos", href: "#plans" },
    { label: "Avaliações", href: "#testimonials" },
  ];

  return (
    <div
      style={{ backgroundColor: theme.background, fontFamily: "'Playfair Display', serif" }}
      className="min-h-screen text-gray-900"
    >
      <style>{`
        .pf-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 border-b shadow-sm"
        style={{ backgroundColor: theme.background, borderColor: "rgba(0,0,0,0.06)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold">{content.brandName}</span>
          <nav className="hidden items-center gap-8 md:flex pf-body">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="font-medium text-gray-700 hover:opacity-70">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden gap-3 md:flex pf-body">
            <a
              href={`https://wa.me/${content.whatsapp}`}
              target="_blank"
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 hover:bg-gray-50"
            >
              WhatsApp
            </a>
            <a
              href={`https://wa.me/${content.whatsapp}`}
              target="_blank"
              className="rounded-lg px-6 py-3 font-medium text-white"
              style={{ backgroundColor: theme.primary }}
            >
              Agendar
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t px-6 py-4 md:hidden pf-body">
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
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6 pf-body">
            <div>
              <h1 className="mb-4 font-serif text-5xl font-bold md:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                {content.heroTitle}
              </h1>
              <p className="text-xl text-gray-600">{content.heroSubtitle}</p>
            </div>
            <p className="text-lg leading-relaxed text-gray-700">{content.heroParagraph}</p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <a
                href={`https://wa.me/${content.whatsapp}`}
                target="_blank"
                className="flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-medium text-white"
                style={{ backgroundColor: theme.primary }}
              >
                Agendar Sessão <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#portfolio"
                className="rounded-lg border border-gray-300 px-8 py-4 text-center text-lg font-medium text-gray-900 hover:bg-gray-50"
              >
                Ver Portfólio
              </a>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-2xl bg-gray-100">
            {content.heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.heroImage} alt={content.brandName} className="h-full w-full object-cover" />
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28" style={{ backgroundColor: theme.secondary }}>
        <div className="mx-auto max-w-6xl px-6 pf-body">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-4xl font-bold md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sobre Meu Trabalho
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">{content.aboutText}</p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 text-4xl font-bold md:text-5xl" style={{ color: theme.primary }}>
                  {stat.number}
                </div>
                <p className="font-medium text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Minha Filosofia</h3>
              <div className="space-y-4 text-gray-700">
                {content.philosophy.map((p) => (
                  <p key={p.title}>
                    <strong>{p.title}:</strong> {p.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white p-8 shadow-lg">
              <h3 className="mb-4 text-2xl font-bold">Especialidades</h3>
              <ul className="space-y-3">
                {content.specialties.map((s) => (
                  <li key={s} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                    <span className="text-gray-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 md:py-28 pf-body" style={{ backgroundColor: theme.background }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meu Portfólio
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Uma seleção dos meus trabalhos mais recentes
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.gallery.map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <div className="aspect-square overflow-hidden">
                  {item.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-end bg-black/0 transition-colors group-hover:bg-black/40">
                  <div className="w-full translate-y-4 p-6 text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="mb-1 text-xl font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 md:py-28 pf-body" style={{ backgroundColor: theme.secondary }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Planos e Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {content.plans.map((plan, i) => (
              <div
                key={i}
                className="rounded-lg bg-white p-8 shadow-lg"
                style={plan.highlighted ? { boxShadow: `0 0 0 2px ${theme.primary}` } : undefined}
              >
                {plan.highlighted && (
                  <div
                    className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-semibold text-white"
                    style={{ backgroundColor: theme.primary }}
                  >
                    Mais Popular
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                <p className="mb-6 text-sm text-gray-600">{plan.description}</p>
                <div className="mb-6">
                  <div className="text-4xl font-bold">{plan.price}</div>
                  <p className="mt-2 text-sm text-gray-600">{plan.period}</p>
                </div>
                <a
                  href={`https://wa.me/${content.whatsapp}`}
                  target="_blank"
                  className="mb-8 block rounded-lg py-3 text-center font-semibold text-white"
                  style={{ backgroundColor: theme.primary }}
                >
                  Agendar Agora
                </a>
                <div className="space-y-3">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                      <span style={{ color: theme.primary }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28 pf-body" style={{ backgroundColor: theme.background }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              O que Meus Clientes Dizem
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {content.testimonials.map((t, i) => (
              <div key={i} className="rounded-lg border border-gray-100 p-8 shadow-md" style={{ backgroundColor: theme.secondary }}>
                <div className="mb-4 flex gap-1">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="h-5 w-5" style={{ color: theme.primary, fill: theme.primary }} />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-gray-700">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                    {t.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-white md:py-20 pf-body" style={{ backgroundColor: theme.dark }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <span className="mb-4 block text-xl font-bold">{content.brandName}</span>
              <p className="text-gray-400">Capturando histórias através da lente.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Contato</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5" style={{ color: theme.primary }} /> {content.phone}
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5" style={{ color: theme.primary }} /> {content.email}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" style={{ color: theme.primary }} /> {content.address}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Redes Sociais</h3>
              <div className="flex gap-3">
                <a
                  href={`https://instagram.com/${content.instagram.replace("@", "")}`}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={`https://wa.me/${content.whatsapp}`}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: theme.primary }}
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} {content.brandName}. Todos os direitos reservados. Feito com{" "}
            <a href="/" className="underline">EXPOR</a>.
          </div>
        </div>
      </footer>
    </div>
  );
}
