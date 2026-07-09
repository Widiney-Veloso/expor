import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/DashboardNav";
import ProjectForm from "@/components/ProjectForm";

export default async function NewProjectPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  return (
    <>
      <DashboardNav username={profile?.username ?? ""} />
      <main className="mx-auto max-w-2xl px-6 py-10 md:px-10">
        <h1 className="mb-6 font-display text-2xl font-bold text-ink">
          Novo projeto
        </h1>
        <div className="card p-8">
          <ProjectForm userId={user.id} />
        </div>
      </main>
    </>
  );
}
