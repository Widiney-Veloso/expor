import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/DashboardNav";
import ProjectForm from "@/components/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", params.id)
    .eq("profile_id", user.id)
    .single();

  if (!project) notFound();

  return (
    <>
      <DashboardNav username={profile?.username ?? ""} />
      <main className="mx-auto max-w-2xl px-6 py-10 md:px-10">
        <h1 className="mb-6 font-display text-2xl font-bold text-ink">
          Editar projeto
        </h1>
        <div className="card p-8">
          <ProjectForm userId={user.id} project={project} />
        </div>
      </main>
    </>
  );
}
