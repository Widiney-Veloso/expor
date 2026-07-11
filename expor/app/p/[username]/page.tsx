import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Logo from "@/components/Logo";
import TemplateRenderer from "@/components/templates/TemplateRenderer";

export default async function PublicPortfolioPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile || !profile.is_public) notFound();

  // O site público do criador é sempre o template escolhido por ele.
  if (profile.template) {
    return <TemplateRenderer profile={profile} />;
  }

  // Ainda não escolheu/configurou um template.
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
      <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center md:px-10">
        <h1 className="font-display text-2xl font-bold text-ink">
          {profile.full_name} ainda está preparando o portfólio
        </h1>
        <p className="mt-3 text-ink-muted">
          Este criador ainda não publicou seu site na EXPOR. Volte em breve!
        </p>
      </main>
    </>
  );
}
