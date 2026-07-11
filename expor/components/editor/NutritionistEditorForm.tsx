"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ImageField from "./ImageField";
import ColorEditor from "./ColorEditor";
import type { NutritionistContent, ThemeColors } from "@/lib/types";

export default function NutritionistEditorForm({
  userId,
  initialContent,
  initialTheme,
}: {
  userId: string;
  initialContent: NutritionistContent;
  initialTheme: ThemeColors;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [content, setContent] = useState<NutritionistContent>(initialContent);
  const [theme, setTheme] = useState<ThemeColors>(initialTheme);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof NutritionistContent>(key: K, value: NutritionistContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const { error } = await supabase.from("profiles").update({ content, theme }).eq("id", userId);
    setSaving(false);
    if (!error) {
      setSaved(true);
      router.refresh();
    }
  }

  return (
    <div className="space-y-10">
      <Section title="Cores do template">
        <ColorEditor theme={theme} onChange={setTheme} />
      </Section>

      <Section title="Marca e cabeçalho">
        <Field label="Nome / marca" value={content.brandName} onChange={(v) => set("brandName", v)} />
      </Section>

      <Section title="Seção principal (Hero)">
        <Field label="Título" value={content.heroTitle} onChange={(v) => set("heroTitle", v)} />
        <Field label="Palavra de destaque do título" value={content.heroHighlight} onChange={(v) => set("heroHighlight", v)} />
        <Field label="Parágrafo" value={content.heroParagraph} onChange={(v) => set("heroParagraph", v)} textarea />
        <ImageField label="Foto principal" value={content.heroImage} onChange={(v) => set("heroImage", v)} userId={userId} aspect="aspect-video" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Número de destaque (ex: +500)" value={content.heroBadgeNumber} onChange={(v) => set("heroBadgeNumber", v)} />
          <Field label="Legenda do número" value={content.heroBadgeLabel} onChange={(v) => set("heroBadgeLabel", v)} />
        </div>
      </Section>

      <Section title="Sobre">
        <Field label="Parágrafo sobre você" value={content.aboutParagraph} onChange={(v) => set("aboutParagraph", v)} textarea />
        <div className="grid gap-4 sm:grid-cols-3">
          {content.aboutCards.map((card, i) => (
            <div key={i} className="rounded-xl border border-base-border p-3">
              <Field label="Título" value={card.title} onChange={(v) => updateAt(content.aboutCards, i, { ...card, title: v }, (arr) => set("aboutCards", arr))} />
              <Field label="Texto" value={card.text} onChange={(v) => updateAt(content.aboutCards, i, { ...card, text: v }, (arr) => set("aboutCards", arr))} textarea />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Planos de atendimento">
        {content.plans.map((plan, i) => (
          <div key={i} className="mb-4 rounded-xl border border-base-border p-4">
            <span className="mb-3 block text-sm font-semibold text-ink-muted">Plano {i + 1}</span>
            <Field label="Nome" value={plan.name} onChange={(v) => updateAt(content.plans, i, { ...plan, name: v }, (arr) => set("plans", arr))} />
            <Field label="Preço" value={plan.price} onChange={(v) => updateAt(content.plans, i, { ...plan, price: v }, (arr) => set("plans", arr))} />
            <Field label="Período (ex: /mês, uma vez)" value={plan.period} onChange={(v) => updateAt(content.plans, i, { ...plan, period: v }, (arr) => set("plans", arr))} />
            <Field label="Descrição" value={plan.description} onChange={(v) => updateAt(content.plans, i, { ...plan, description: v }, (arr) => set("plans", arr))} />
            <Field
              label="Itens incluídos (um por linha)"
              value={plan.features.join("\n")}
              onChange={(v) => updateAt(content.plans, i, { ...plan, features: v.split("\n") }, (arr) => set("plans", arr))}
              textarea
            />
            <label className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
              <input
                type="checkbox"
                checked={plan.highlighted}
                onChange={(e) => updateAt(content.plans, i, { ...plan, highlighted: e.target.checked }, (arr) => set("plans", arr))}
                className="h-4 w-4 rounded border-base-border bg-base-card2"
              />
              Destacar este plano
            </label>
          </div>
        ))}
      </Section>

      <Section title="Resultados / transformações">
        {content.results.map((r, i) => (
          <div key={i} className="mb-4 rounded-xl border border-base-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-muted">Resultado {i + 1}</span>
              <button
                type="button"
                onClick={() => set("results", content.results.filter((_, idx) => idx !== i))}
                className="text-xs font-semibold text-red-400 hover:underline"
              >
                Remover
              </button>
            </div>
            <ImageField label="Imagem" value={r.image} onChange={(v) => updateAt(content.results, i, { ...r, image: v }, (arr) => set("results", arr))} userId={userId} aspect="aspect-video" />
            <Field label="Título" value={r.title} onChange={(v) => updateAt(content.results, i, { ...r, title: v }, (arr) => set("results", arr))} />
            <Field label="Depoimento" value={r.text} onChange={(v) => updateAt(content.results, i, { ...r, text: v }, (arr) => set("results", arr))} textarea />
            <Field label="Duração do acompanhamento" value={r.duration} onChange={(v) => updateAt(content.results, i, { ...r, duration: v }, (arr) => set("results", arr))} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => set("results", [...content.results, { image: "", title: "Novo resultado", text: "", duration: "" }])}
          className="btn-outline text-sm"
        >
          + Adicionar resultado
        </button>
      </Section>

      <Section title="Depoimentos">
        {content.testimonials.map((t, i) => (
          <div key={i} className="mb-4 rounded-xl border border-base-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-muted">Depoimento {i + 1}</span>
              <button
                type="button"
                onClick={() => set("testimonials", content.testimonials.filter((_, idx) => idx !== i))}
                className="text-xs font-semibold text-red-400 hover:underline"
              >
                Remover
              </button>
            </div>
            <ImageField label="Foto" value={t.image} onChange={(v) => updateAt(content.testimonials, i, { ...t, image: v }, (arr) => set("testimonials", arr))} userId={userId} aspect="aspect-square" />
            <Field label="Nome" value={t.name} onChange={(v) => updateAt(content.testimonials, i, { ...t, name: v }, (arr) => set("testimonials", arr))} />
            <Field label="Depoimento" value={t.text} onChange={(v) => updateAt(content.testimonials, i, { ...t, text: v }, (arr) => set("testimonials", arr))} textarea />
          </div>
        ))}
        <button
          type="button"
          onClick={() => set("testimonials", [...content.testimonials, { name: "Paciente", image: "", text: "", rating: 5 }])}
          className="btn-outline text-sm"
        >
          + Adicionar depoimento
        </button>
      </Section>

      <Section title="Contato e horários">
        <Field label="WhatsApp (só números, com DDI 55)" value={content.whatsapp} onChange={(v) => set("whatsapp", v)} />
        <Field label="Instagram (@usuario)" value={content.instagram} onChange={(v) => set("instagram", v)} />
        <div>
          <label className="label">Horários de atendimento (um por linha)</label>
          <textarea
            className="input min-h-[80px]"
            value={content.hours.join("\n")}
            onChange={(e) => set("hours", e.target.value.split("\n"))}
          />
        </div>
      </Section>

      <div className="sticky bottom-4 flex items-center gap-4 rounded-xl border border-base-border bg-base-card p-4">
        <button onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? "Salvando..." : "Salvar portfólio"}
        </button>
        {saved && <span className="text-sm text-emerald-400">Salvo com sucesso.</span>}
      </div>
    </div>
  );
}

function updateAt<T>(arr: T[], index: number, value: T, apply: (arr: T[]) => void) {
  const copy = [...arr];
  copy[index] = value;
  apply(copy);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-6">
      <h2 className="mb-4 font-display text-lg font-bold text-ink">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      {textarea ? (
        <textarea className="input min-h-[80px]" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}
