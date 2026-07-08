import Link from "next/link";
import type { Profile } from "@/lib/types";

export default function PortfolioCard({ profile }: { profile: Profile }) {
  return (
    <Link
      href={`/p/${profile.username}`}
      className="card group block overflow-hidden transition-colors hover:border-brand"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-card2">
        {profile.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.cover_url}
            alt={profile.full_name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-3xl font-extrabold text-ink-faint">
            {profile.full_name?.charAt(0) ?? "?"}
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="truncate font-display text-sm font-bold text-ink">
          {profile.full_name}
        </p>
        <p className="truncate text-xs text-ink-muted">
          {profile.headline || profile.area || "Portfólio criativo"}
        </p>
      </div>
    </Link>
  );
}
