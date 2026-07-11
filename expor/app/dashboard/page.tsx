import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/DashboardNav";
import PortfolioCard from "@/components/PortfolioCard";
import { TEMPLATE_LABELS, TEMPLATE_DESCRIPTIONS } from "@/lib/templates/defaults";
import type { Profile, TemplateId } from "@/lib/types";

const SHOWCASE_TEMPLATES: { id: TemplateId; preview: { bg: string; accent: string } }[] = [
  { id: "photographer", preview: { bg: "#ffffff", accent: "#d97706" } },
  { id: "developer", preview: { bg: "#0f1115", accent: "#0055d4" } },
  { id: "nutritionist", preview: { bg: "#ffffff", accent: "#10b981" } },
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: favoriteRows } = await supabase
    .from("favorites")
    .select("profile_id, profiles:profile_id(*)")
    .eq("user_id", user.id);

  const favorites = (favoriteRows ?? [])
    .map((f: any) => f.profiles as Profile)
    .filter(Boolean);

  return (
    <>
      <DashboardNav username={profile?.username ?? ""} />

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              Olá, {profile?.full_name?.split(" ")[0] ?? "criador"} 👋
            </h1>
            <p className="text-sm text-ink-muted">
              Gerencie seu portfólio e acompanhe suas informações.
            </p>
          </div>
        </div>

        {/* MEU SITE (TEMPLATE) */}
        <section className="mb-14">
          <h2 className="mb-4 font-display text-lg font-bold text-ink">
            Meu portfólio
          </h2>
          {profile?.template ? (
            <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
              <div>
                <p className="font-display font-bold text-ink">
                  Modelo escolhido: {TEMPLATE_LABELS[profile.template]}
                </p>
                <p className="text-sm text-ink-muted">
                  Seu site está em{" "}
                  <Link href={`/p/${profile.username}`} target="_blank" className="text-brand-light hover:underline">
                    expor.com/p/{profile.username}
                  </Link>
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/dashboard/editor" className="btn-primary">
                  Editar meu site
                </Link>
                <Link href={`/p/${profile.username}`} target="_blank" className="btn-outline">
                  Ver site publicado
                </Link>
              </div>
            </div>
          ) : (
            <div className="card p-10 text-center">
              <p className="text-ink-muted">
                Você ainda não escolheu um modelo para o seu portfólio.
              </p>
              <Link href="/dashboard/template" className="btn-primary mt-4 inline-flex">
                Escolher modelo
              </Link>
            </div>
          )}
        </section>

        {/* FAVORITOS */}
        {favorites.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-4 font-display text-lg font-bold text-ink">
              Portfólios Favoritos
            </h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {favorites.map((p) => (
                <PortfolioCard key={p.id} profile={p} />
              ))}
            </div>
          </section>
        )}

        {/* DESCOBRIR TEMPLATES */}
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-ink">
            Descubra novos portfólios e inspire-se
          </h2>
          <p className="mb-6 text-sm text-ink-muted">
            Veja como cada modelo fica pronto antes de escolher o seu.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SHOWCASE_TEMPLATES.map((t) => (
              <div key={t.id} className="card overflow-hidden">
                <div
                  className="flex aspect-[4/3] items-center justify-center"
                  style={{ backgroundColor: t.preview.bg }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-3 w-24 rounded-full" style={{ backgroundColor: t.preview.accent }} />
                    <div className="h-2 w-32 rounded-full bg-black/10" />
                    <div className="h-2 w-20 rounded-full bg-black/10" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink">{TEMPLATE_LABELS[t.id]}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{TEMPLATE_DESCRIPTIONS[t.id]}</p>
                  <div className="mt-4 flex gap-3">
                    <Link href={`/templates/${t.id}`} target="_blank" className="btn-outline flex-1 text-center text-sm">
                      Ver exemplo
                    </Link>
                    <Link href="/dashboard/template" className="btn-primary flex-1 text-center text-sm">
                      Usar modelo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
