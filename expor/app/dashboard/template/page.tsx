import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/DashboardNav";
import TemplatePickerCards from "@/components/TemplatePickerCards";

export default async function TemplatePage() {
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

  return (
    <>
      <DashboardNav username={profile.username} />
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <h1 className="mb-2 font-display text-2xl font-bold text-ink">
          Escolha um modelo para o seu portfólio
        </h1>
        <p className="mb-8 text-ink-muted">
          Depois de escolher, você poderá personalizar textos, fotos e cores.
        </p>
        <TemplatePickerCards profile={profile} />
      </main>
    </>
  );
}
