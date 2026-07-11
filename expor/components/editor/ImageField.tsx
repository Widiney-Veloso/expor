"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ImageField({
  label,
  value,
  onChange,
  userId,
  aspect = "aspect-video",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  userId: string;
  aspect?: string;
}) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const path = `${userId}/template-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(path, file, { upsert: true });

    if (!error) {
      const { data } = supabase.storage.from("portfolio-images").getPublicUrl(path);
      onChange(data.publicUrl);
    }
    setUploading(false);
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex items-center gap-4">
        <div className={`w-32 shrink-0 overflow-hidden rounded-lg border border-base-border bg-base-card2 ${aspect}`}>
          {value && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="h-full w-full object-cover" />
          )}
        </div>
        <label className="btn-outline cursor-pointer text-xs">
          {uploading ? "Enviando..." : "Escolher imagem"}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
    </div>
  );
}
