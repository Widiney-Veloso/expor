"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  TEMPLATE_LABELS,
  TEMPLATE_DESCRIPTIONS,
  DEFAULT_THEME_BY_TEMPLATE,
  getDefaultContent,
} from "@/lib/templates/defaults";
import type { TemplateId, Profile } from "@/lib/types";

const TEMPLATES: TemplateId[] = ["photographer", "developer", "nutritionist"];

const PREVIEW_STYLE: Record<TemplateId, { bg: string; accent: string }> = {
  photographer: { bg: "#ffffff", accent: "#d97706" },
  developer: { bg: "#0f1115", accent: "#0055d4" },
  nutritionist: { bg: "#ffffff", accent: "#10b981" },
};

export default function TemplatePickerCards({ profile }: { profile: Profile }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState<TemplateId | null>(null);

  async function handleChoose(template: TemplateId) {
    if (profile.template && profile.template !== template) {
      const confirmed = confirm(
        "Trocar de modelo vai substituir o conteúdo que você já preencheu no modelo atual. Deseja continuar?"
      );
      if (!confirmed) return;
    }

    setLoading(template);

    const alreadyThisTemplate = profile.template === template;
    const payload = alreadyThisTemplate
      ? { template }
      : {
          template,
          theme: DEFAULT_THEME_BY_TEMPLATE[template],
          content: getDefaultContent(template),
        };

    const { error } = await supabase.from("profiles").update(payload).eq("id", profile.id);

    setLoading(null);

    if (error) {
      alert("Não foi possível selecionar o modelo. Tente novamente.");
      return;
    }

    router.push("/dashboard/editor");
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {TEMPLATES.map((template) => {
        const preview = PREVIEW_STYLE[template];
        const isCurrent = profile.template === template;
        return (
          <div key={template} className="card overflow-hidden">
            <div
              className="flex aspect-[4/3] items-center justify-center"
              style={{ backgroundColor: preview.bg }}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="h-3 w-24 rounded-full"
                  style={{ backgroundColor: preview.accent }}
                />
                <div className="h-2 w-32 rounded-full bg-black/10" />
                <div className="h-2 w-20 rounded-full bg-black/10" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-bold text-ink">
                {TEMPLATE_LABELS[template]}
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                {TEMPLATE_DESCRIPTIONS[template]}
              </p>
              <button
                onClick={() => handleChoose(template)}
                disabled={loading !== null}
                className="btn-primary mt-4 w-full"
              >
                {loading === template
                  ? "Selecionando..."
                  : isCurrent
                  ? "Continuar editando"
                  : "Escolher este modelo"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
