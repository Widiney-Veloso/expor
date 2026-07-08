import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import type { Project } from "@/lib/types";

export default async function PublicPortfolioPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!profile || !profile.is_public) notFound();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("profile_id", profile.id)
    .eq("is_published", true)
    .order("position", { ascending: true });

  return (
    <>
      <header className="border-b border-base-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
          <Logo />
          <Link href="/explore" className="text-sm font-semibold text-ink-muted hover:text-ink">
            Explorar mais portfólios
          </Link>
        </div>
      </header>

      {/* CAPA */}
      <div className="h-48 w-full bg-gradient-to-r from-brand/40 via-accent-blue/20 to-base-card2 md:h-64">
        {profile.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.cover_url}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24 md:px-10">
        {/* CABEÇALHO DO PERFIL */}
        <div className="-mt-14 mb-12 flex flex-col items-start gap-5 sm:flex-row sm:items-end">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-base bg-base-card2">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-display text-3xl font-extrabold text-ink-faint">
                {profile.full_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-ink">
              {profile.full_name}
            </h1>
            {profile.headline && (
              <p className="text-ink-muted">{profile.headline}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-3 text-sm">
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  className="text-brand-light hover:underline"
                >
                  Site
                </a>
              )}
              {profile.instagram && (
                <span className="text-ink-muted">{profile.instagram}</span>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  className="text-brand-light hover:underline"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        {profile.bio && (
          <p className="mb-12 max-w-2xl text-ink-muted">{profile.bio}</p>
        )}

        {/* PROJETOS */}
        <h2 className="mb-5 font-display text-lg font-bold text-ink">
          Projetos
        </h2>
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(projects as Project[]).map((project) => (
              <article key={project.id} className="card overflow-hidden">
                <div className="aspect-[4/3] w-full overflow-hidden bg-base-card2">
                  {project.cover_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.cover_url}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-ink">
                    {project.title}
                  </h3>
                  {project.category && (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-light">
                      {project.category}
                    </p>
                  )}
                  {project.description && (
                    <p className="mt-2 text-sm text-ink-muted">
                      {project.description}
                    </p>
                  )}
                  {project.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-base-card2 px-3 py-1 text-xs text-ink-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.external_url && (
                    <a
                      href={project.external_url}
                      target="_blank"
                      className="mt-3 inline-block text-sm font-semibold text-brand-light hover:underline"
                    >
                      Ver projeto completo →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-ink-muted">
            Este criador ainda não publicou projetos.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
