import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardNav from "@/components/DashboardNav";
import ProfileForm from "@/components/ProfileForm";

export default async function SettingsPage() {
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
      <main className="mx-auto max-w-2xl px-6 py-10 md:px-10">
        <h1 className="mb-6 font-display text-2xl font-bold text-ink">
          Editar perfil
        </h1>
        <div className="card p-8">
          <ProfileForm profile={profile} />
        </div>
      </main>
    </>
  );
}
