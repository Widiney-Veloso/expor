import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/PortfolioCard";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export default async function ExplorePage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <h1 className="mb-2 font-display text-3xl font-bold text-ink">
          Descubra portfólios criativos
        </h1>
        <p className="mb-10 text-ink-muted">
          Conheça o trabalho de profissionais que usam a EXPOR para exibir
          suas produções.
        </p>

        {profiles && profiles.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {(profiles as Profile[]).map((p) => (
              <PortfolioCard key={p.id} profile={p} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center text-ink-muted">
            Ainda não há portfólios públicos. Seja o primeiro a criar o seu!
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
