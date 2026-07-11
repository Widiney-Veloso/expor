"use client";

import type { ThemeColors } from "@/lib/types";

const ROLES: { key: keyof ThemeColors; label: string; hint: string }[] = [
  { key: "primary", label: "Cor de destaque", hint: "Botões, títulos e detalhes principais" },
  { key: "secondary", label: "Cor secundária", hint: "Seções alternadas e detalhes de apoio" },
  { key: "background", label: "Cor de fundo", hint: "Fundo principal do site" },
  { key: "dark", label: "Cor do rodapé", hint: "Fundo escuro do rodapé" },
];

export default function ColorEditor({
  theme,
  onChange,
}: {
  theme: ThemeColors;
  onChange: (theme: ThemeColors) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {ROLES.map((role) => (
        <div key={role.key}>
          <label className="label">{role.label}</label>
          <div className="flex items-center gap-2 rounded-xl border border-base-border bg-base-card2 p-2">
            <input
              type="color"
              value={theme[role.key]}
              onChange={(e) => onChange({ ...theme, [role.key]: e.target.value })}
              className="h-9 w-9 cursor-pointer rounded border-none bg-transparent"
            />
            <span className="text-xs text-ink-faint">{theme[role.key]}</span>
          </div>
          <p className="mt-1 text-xs text-ink-faint">{role.hint}</p>
        </div>
      ))}
    </div>
  );
}
