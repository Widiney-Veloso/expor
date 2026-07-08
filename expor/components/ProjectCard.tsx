import Link from "next/link";
import type { Project } from "@/lib/types";

export default function ProjectCard({
  project,
  editHref,
}: {
  project: Project;
  editHref?: string;
}) {
  return (
    <div className="card group relative overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-base-card2">
        {project.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-ink-faint">
            Sem imagem
          </div>
        )}
        {!project.is_published && (
          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-ink">
            Rascunho
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="truncate font-display text-sm font-bold text-ink">
          {project.title}
        </p>
        {project.category && (
          <p className="mt-1 text-xs text-ink-muted">{project.category}</p>
        )}
        {editHref && (
          <Link
            href={editHref}
            className="mt-3 inline-block text-xs font-semibold text-brand-light hover:underline"
          >
            Editar projeto
          </Link>
        )}
      </div>
    </div>
  );
}
