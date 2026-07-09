import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

const STEPS = [
  {
    title: "1. Crie sua conta",
    desc: "Cadastre-se gratuitamente com seu e-mail em menos de um minuto.",
  },
  {
    title: "2. Personalize seu portfólio",
    desc: "Adicione seus projetos, imagens e defina sua identidade visual.",
  },
  {
    title: "3. Publique seus projetos",
    desc: "Organize seus trabalhos em cases claros e bem apresentados.",
  },
  {
    title: "4. Compartilhe com o mundo",
    desc: "Divulgue o link do seu portfólio para recrutadores e clientes.",
  },
];

const REASONS = [
  {
    title: "Feito para criativos",
    desc: "Estrutura pensada para designers, fotógrafos, devs e artistas.",
  },
  {
    title: "100% personalizável",
    desc: "Organize seus projetos do seu jeito, com sua própria identidade.",
  },
  {
    title: "Fácil de usar",
    desc: "Sem código. Publique seu portfólio em poucos minutos.",
  },
  {
    title: "Portfólio responsivo",
    desc: "Seus projetos ficam ótimos em qualquer tela, do celular ao desktop.",
  },
];

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(4);

  const featured = (profiles ?? []) as Profile[];

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-10 md:pt-16">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <h1 className="font-display text-6xl font-extrabold leading-none text-ink sm:text-7xl">
              EXPOR
            </h1>
            <p className="mt-6 text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              Materialize sua presença digital com portfólios profissionais e
              personalizados
            </p>
            <p className="mt-4 max-w-md text-ink-muted">
              Crie, personalize e compartilhe seu portfólio em poucos
              minutos.{" "}
              <span className="font-semibold text-brand-light">
                Seu mundo profissional em destaque.
              </span>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="btn-primary">
                Começar agora
              </Link>
              <Link href="/explore" className="btn-outline">
                Ver exemplos
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-base-border bg-gradient-to-b from-brand/40 via-accent-blue/20 to-base-card2 md:block" />
        </div>
      </section>

      {/* PORTFÓLIOS EM DESTAQUE */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <h2 className="mb-8 text-center font-display text-xl font-bold text-ink">
            Portfólios criados na EXPOR
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/p/${p.username}`}
                className="card overflow-hidden transition-colors hover:border-brand"
              >
                <div className="aspect-[4/3] bg-base-card2" />
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-ink">
                    {p.full_name}
                  </p>
                  <p className="truncate text-xs text-ink-muted">
                    {p.headline || p.area}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* O QUE É */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="card grid gap-10 p-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">
              O que é a EXPOR?
            </h2>
            <p className="mt-4 text-ink-muted">
              A EXPOR é uma plataforma digital especializada na criação,
              organização e divulgação de portfólios criativos. Reunimos, em
              um único espaço, tudo o que profissionais como designers,
              fotógrafos, videomakers e desenvolvedores precisam para expor
              seus trabalhos de forma clara e profissional.
            </p>
            <Link href="/signup" className="btn-primary mt-6 inline-flex">
              Criar meu portfólio
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-brand/50 to-accent-blue/30" />
            <div className="aspect-square rounded-xl bg-base-card2" />
            <div className="aspect-square rounded-xl bg-base-card2" />
            <div className="aspect-square rounded-xl bg-gradient-to-tr from-accent-blue/40 to-brand/30" />
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <h2 className="mb-10 text-center font-display text-2xl font-bold text-ink">
          Como funciona
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.title} className="card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/20 text-accent-blue">
                ●
              </div>
              <h3 className="font-display text-sm font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUE ESCOLHER */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <h2 className="mb-10 text-center font-display text-2xl font-bold text-ink">
          Por que escolher a EXPOR?
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          {REASONS.map((reason) => (
            <div key={reason.title} className="card p-6">
              <h3 className="font-display text-sm font-bold text-ink">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center md:px-10">
        <h2 className="font-display text-3xl font-bold text-ink">
          Seu mundo profissional merece ser visto.
        </h2>
        <p className="mt-3 text-ink-muted">
          Crie seu portfólio agora e comece a receber oportunidades.
        </p>
        <Link href="/signup" className="btn-primary mt-6 inline-flex">
          Começar agora
        </Link>
      </section>

      <Footer />
    </>
  );
}
