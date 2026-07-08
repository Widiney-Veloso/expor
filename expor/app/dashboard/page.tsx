import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/DashboardNav";
import ProjectCard from "@/components/ProjectCard";
import PortfolioCard from "@/components/PortfolioCard";
import type { Profile, Project } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: myProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("profile_id", user.id)
    .order("position", { ascending: true });

  const { data: favoriteRows } = await supabase
    .from("favorites")
    .select("profile_id, profiles:profile_id(*)")
    .eq("user_id", user.id);

  const { data: discover } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_public", true)
    .neq("id", user.id)
    .order("created_at", { ascending: false })
    .limit(8);

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
              Gerencie seus projetos e acompanhe seu portfólio.
            </p>
          </div>
          <Link href="/dashboard/projects/new" className="btn-primary">
            Criar Portfólio
          </Link>
        </div>

        {/* MEUS PROJETOS */}
        <section className="mb-14">
          <h2 className="mb-4 font-display text-lg font-bold text-ink">
            Meus Portfólios Editados
          </h2>
          {myProjects && myProjects.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {(myProjects as Project[]).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  editHref={`/dashboard/projects/${project.id}/edit`}
                />
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center">
              <p className="text-ink-muted">
                Você ainda não adicionou nenhum projeto ao seu portfólio.
              </p>
              <Link
                href="/dashboard/projects/new"
                className="btn-primary mt-4 inline-flex"
              >
                Adicionar primeiro projeto
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

        {/* DESCOBRIR */}
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-ink">
            Descubra novos portfólios e inspire-se
          </h2>
          {discover && discover.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {(discover as Profile[]).map((p) => (
                <PortfolioCard key={p.id} profile={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-muted">
              Ainda não há outros portfólios públicos para explorar.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
