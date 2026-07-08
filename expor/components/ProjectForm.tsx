"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";

export default function ProjectForm({
  userId,
  project,
}: {
  userId: string;
  project?: Project;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [tags, setTags] = useState((project?.tags ?? []).join(", "));
  const [externalUrl, setExternalUrl] = useState(project?.external_url ?? "");
  const [isPublished, setIsPublished] = useState(project?.is_published ?? true);
  const [coverUrl, setCoverUrl] = useState(project?.cover_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const path = `${userId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError("Não foi possível enviar a imagem. Tente novamente.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path);

    setCoverUrl(data.publicUrl);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      title,
      description,
      category,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      external_url: externalUrl || null,
      is_published: isPublished,
      cover_url: coverUrl || null,
      profile_id: userId,
    };

    const query = project
      ? supabase.from("projects").update(payload).eq("id", project.id)
      : supabase.from("projects").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError("Não foi possível salvar o projeto. Tente novamente.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleDelete() {
    if (!project) return;
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

    await supabase.from("projects").delete().eq("id", project.id);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label">Imagem de capa</label>
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-base-border bg-base-card2">
            {coverUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverUrl}
                alt="Capa do projeto"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <label className="btn-outline cursor-pointer">
            {uploading ? "Enviando..." : "Escolher imagem"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="title">
          Título do projeto
        </label>
        <input
          id="title"
          className="input"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Identidade visual — Café Aurora"
        />
      </div>

      <div>
        <label className="label" htmlFor="description">
          Descrição
        </label>
        <textarea
          id="description"
          className="input min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Conte um pouco sobre o projeto, o processo e os resultados."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="category">
            Categoria
          </label>
          <input
            id="category"
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ex: Branding, UI/UX, Fotografia"
          />
        </div>
        <div>
          <label className="label" htmlFor="tags">
            Tags (separadas por vírgula)
          </label>
          <input
            id="tags"
            className="input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="logotipo, minimalista, branding"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="externalUrl">
          Link externo (opcional)
        </label>
        <input
          id="externalUrl"
          className="input"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-base-border bg-base-card2 text-brand"
        />
        Publicar este projeto no meu portfólio público
      </label>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between pt-2">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Salvando..." : project ? "Salvar alterações" : "Adicionar projeto"}
        </button>
        {project && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm font-semibold text-red-400 hover:underline"
          >
            Excluir projeto
          </button>
        )}
      </div>
    </form>
  );
}
