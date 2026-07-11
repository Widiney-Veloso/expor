import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/DashboardNav";
import PhotographerEditorForm from "@/components/editor/PhotographerEditorForm";
import DeveloperEditorForm from "@/components/editor/DeveloperEditorForm";
import NutritionistEditorForm from "@/components/editor/NutritionistEditorForm";
import { getDefaultContent, DEFAULT_THEME_BY_TEMPLATE, TEMPLATE_LABELS } from "@/lib/templates/defaults";

export default async function EditorPage() {
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

  if (!profile) redirect("/login");
  if (!profile.template) redirect("/dashboard/template");

  const defaults = getDefaultContent(profile.template);
  const initialContent = { ...defaults, ...(profile.content ?? {}) };
  const initialTheme = { ...DEFAULT_THEME_BY_TEMPLATE[profile.template], ...(profile.theme ?? {}) };

  return (
    <>
      <DashboardNav username={profile.username} />
      <main className="mx-auto max-w-3xl px-6 py-10 md:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              Editando: modelo {TEMPLATE_LABELS[profile.template]}
            </h1>
            <p className="text-sm text-ink-muted">
              Preencha seus dados, fotos e cores. Depois de salvar, seu site fica em{" "}
              <Link href={`/p/${profile.username}`} target="_blank" className="text-brand-light hover:underline">
                expor.com/p/{profile.username}
              </Link>
              .
            </p>
          </div>
          <Link href="/dashboard/template" className="btn-outline text-sm">
            Trocar de modelo
          </Link>
        </div>

        {profile.template === "photographer" && (
          <PhotographerEditorForm userId={user.id} initialContent={initialContent as any} initialTheme={initialTheme} />
        )}
        {profile.template === "developer" && (
          <DeveloperEditorForm userId={user.id} initialContent={initialContent as any} initialTheme={initialTheme} />
        )}
        {profile.template === "nutritionist" && (
          <NutritionistEditorForm userId={user.id} initialContent={initialContent as any} initialTheme={initialTheme} />
        )}
      </main>
    </>
  );
}
