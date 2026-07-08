"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types";

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState(profile.full_name);
  const [headline, setHeadline] = useState(profile.headline ?? "");
  const [area, setArea] = useState(profile.area ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [website, setWebsite] = useState(profile.website ?? "");
  const [instagram, setInstagram] = useState(profile.instagram ?? "");
  const [linkedin, setLinkedin] = useState(profile.linkedin ?? "");
  const [isPublic, setIsPublic] = useState(profile.is_public);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
  const [coverUrl, setCoverUrl] = useState(profile.cover_url ?? "");
  const [uploading, setUploading] = useState<"avatar" | "cover" | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    kind: "avatar" | "cover"
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(kind);
    setError(null);

    const path = `${profile.id}/${kind}-${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError("Não foi possível enviar a imagem. Tente novamente.");
      setUploading(null);
      return;
    }

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(path);

    if (kind === "avatar") setAvatarUrl(data.publicUrl);
    else setCoverUrl(data.publicUrl);

    setUploading(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    setSaved(false);

    const { error: saveError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        headline,
        area,
        bio,
        website: website || null,
        instagram: instagram || null,
        linkedin: linkedin || null,
        is_public: isPublic,
        avatar_url: avatarUrl || null,
        cover_url: coverUrl || null,
      })
      .eq("id", profile.id);

    setSaving(false);

    if (saveError) {
      setError("Não foi possível salvar suas alterações. Tente novamente.");
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Foto de perfil</label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-base-border bg-base-card2">
              {avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="Foto de perfil" className="h-full w-full object-cover" />
              )}
            </div>
            <label className="btn-outline cursor-pointer text-xs">
              {uploading === "avatar" ? "Enviando..." : "Alterar"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload(e, "avatar")}
                disabled={uploading !== null}
              />
            </label>
          </div>
        </div>
        <div>
          <label className="label">Imagem de capa</label>
          <div className="flex items-center gap-4">
            <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-base-border bg-base-card2">
              {coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={coverUrl} alt="Capa do perfil" className="h-full w-full object-cover" />
              )}
            </div>
            <label className="btn-outline cursor-pointer text-xs">
              {uploading === "cover" ? "Enviando..." : "Alterar"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUpload(e, "cover")}
                disabled={uploading !== null}
              />
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="fullName">
          Nome completo
        </label>
        <input
          id="fullName"
          className="input"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="headline">
            Título profissional
          </label>
          <input
            id="headline"
            className="input"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Ex: Designer Gráfico e Ilustrador"
          />
        </div>
        <div>
          <label className="label" htmlFor="area">
            Área de atuação
          </label>
          <input
            id="area"
            className="input"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Ex: Design, Fotografia, Desenvolvimento"
          />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="bio">
          Sobre você
        </label>
        <textarea
          id="bio"
          className="input min-h-[120px]"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Fale sobre sua trajetória, estilo e experiência."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label" htmlFor="website">
            Site
          </label>
          <input
            id="website"
            className="input"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="label" htmlFor="instagram">
            Instagram
          </label>
          <input
            id="instagram"
            className="input"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@seuusuario"
          />
        </div>
        <div>
          <label className="label" htmlFor="linkedin">
            LinkedIn
          </label>
          <input
            id="linkedin"
            className="input"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="linkedin.com/in/..."
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-muted">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="h-4 w-4 rounded border-base-border bg-base-card2 text-brand"
        />
        Tornar meu portfólio público (visível para qualquer pessoa)
      </label>

      {error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}
      {saved && (
        <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
          Alterações salvas com sucesso.
        </p>
      )}

      <button type="submit" disabled={saving} className="btn-primary">
        {saving ? "Salvando..." : "Salvar alterações"}
      </button>
    </form>
  );
}
