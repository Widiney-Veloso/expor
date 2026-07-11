"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ImageField from "./ImageField";
import ColorEditor from "./ColorEditor";
import type { PhotographerContent, ThemeColors } from "@/lib/types";

export default function PhotographerEditorForm({
  userId,
  initialContent,
  initialTheme,
}: {
  userId: string;
  initialContent: PhotographerContent;
  initialTheme: ThemeColors;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [content, setContent] = useState<PhotographerContent>(initialContent);
  const [theme, setTheme] = useState<ThemeColors>(initialTheme);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof PhotographerContent>(key: K, value: PhotographerContent[K]) {
    setContent((c) => ({ ...c, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const { error } = await supabase
      .from("profiles")
      .update({ content, theme })
      .eq("id", userId);
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
        <Field label="Subtítulo" value={content.heroSubtitle} onChange={(v) => set("heroSubtitle", v)} textarea />
        <Field label="Parágrafo" value={content.heroParagraph} onChange={(v) => set("heroParagraph", v)} textarea />
        <ImageField label="Foto principal" value={content.heroImage} onChange={(v) => set("heroImage", v)} userId={userId} aspect="aspect-square" />
      </Section>

      <Section title="Sobre">
        <Field label="Texto sobre você" value={content.aboutText} onChange={(v) => set("aboutText", v)} textarea />

        <h4 className="mt-4 text-sm font-semibold text-ink-muted">Números de destaque</h4>
        <div className="grid gap-4 sm:grid-cols-3">
          {content.stats.map((stat, i) => (
            <div key={i} className="rounded-xl border border-base-border p-3">
              <Field label="Número" value={stat.number} onChange={(v) => updateAt(content.stats, i, { ...stat, number: v }, (arr) => set("stats", arr))} />
              <Field label="Legenda" value={stat.label} onChange={(v) => updateAt(content.stats, i, { ...stat, label: v }, (arr) => set("stats", arr))} />
            </div>
          ))}
        </div>

        <h4 className="mt-4 text-sm font-semibold text-ink-muted">Filosofia de trabalho</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.philosophy.map((p, i) => (
            <div key={i} className="rounded-xl border border-base-border p-3">
              <Field label="Título" value={p.title} onChange={(v) => updateAt(content.philosophy, i, { ...p, title: v }, (arr) => set("philosophy", arr))} />
              <Field label="Texto" value={p.text} onChange={(v) => updateAt(content.philosophy, i, { ...p, text: v }, (arr) => set("philosophy", arr))} textarea />
            </div>
          ))}
        </div>

        <ListEditor
          label="Especialidades"
          items={content.specialties}
          onChange={(v) => set("specialties", v)}
        />
      </Section>

      <Section title="Galeria de projetos">
        {content.gallery.map((item, i) => (
          <div key={i} className="mb-4 rounded-xl border border-base-border p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-muted">Projeto {i + 1}</span>
              <button
                type="button"
                onClick={() => set("gallery", content.gallery.filter((_, idx) => idx !== i))}
                className="text-xs font-semibold text-red-400 hover:underline"
              >
                Remover
              </button>
            </div>
            <ImageField label="Imagem" value={item.image} onChange={(v) => updateAt(content.gallery, i, { ...item, image: v }, (arr) => set("gallery", arr))} userId={userId} aspect="aspect-square" />
            <Field label="Título" value={item.title} onChange={(v) => updateAt(content.gallery, i, { ...item, title: v }, (arr) => set("gallery", arr))} />
            <Field label="Categoria" value={item.category} onChange={(v) => updateAt(content.gallery, i, { ...item, category: v }, (arr) => set("gallery", arr))} />
            <Field label="Descrição" value={item.description} onChange={(v) => updateAt(content.gallery, i, { ...item, description: v }, (arr) => set("gallery", arr))} textarea />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            set("gallery", [...content.gallery, { title: "Novo projeto", category: "", image: "", description: "" }])
          }
          className="btn-outline text-sm"
        >
          + Adicionar projeto
        </button>
      </Section>

      <Section title="Planos">
        {content.plans.map((plan, i) => (
          <div key={i} className="mb-4 rounded-xl border border-base-border p-4">
            <span className="mb-3 block text-sm font-semibold text-ink-muted">Plano {i + 1}</span>
            <Field label="Nome" value={plan.name} onChange={(v) => updateAt(content.plans, i, { ...plan, name: v }, (arr) => set("plans", arr))} />
            <Field label="Preço" value={plan.price} onChange={(v) => updateAt(content.plans, i, { ...plan, price: v }, (arr) => set("plans", arr))} />
            <Field label="Duração / período" value={plan.period} onChange={(v) => updateAt(content.plans, i, { ...plan, period: v }, (arr) => set("plans", arr))} />
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
            <Field label="Função / relação" value={t.role} onChange={(v) => updateAt(content.testimonials, i, { ...t, role: v }, (arr) => set("testimonials", arr))} />
            <Field label="Depoimento" value={t.text} onChange={(v) => updateAt(content.testimonials, i, { ...t, text: v }, (arr) => set("testimonials", arr))} textarea />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            set("testimonials", [...content.testimonials, { name: "Cliente", role: "", image: "", text: "", rating: 5 }])
          }
          className="btn-outline text-sm"
        >
          + Adicionar depoimento
        </button>
      </Section>

      <Section title="Contato">
        <Field label="Telefone" value={content.phone} onChange={(v) => set("phone", v)} />
        <Field label="E-mail" value={content.email} onChange={(v) => set("email", v)} />
        <Field label="Cidade / endereço" value={content.address} onChange={(v) => set("address", v)} />
        <Field label="Instagram (@usuario)" value={content.instagram} onChange={(v) => set("instagram", v)} />
        <Field label="WhatsApp (só números, com DDI 55)" value={content.whatsapp} onChange={(v) => set("whatsapp", v)} />
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

function ListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div>
      <label className="label">{label} (um por linha)</label>
      <textarea
        className="input min-h-[100px]"
        value={items.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
      />
    </div>
  );
}
