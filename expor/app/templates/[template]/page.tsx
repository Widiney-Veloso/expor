import { notFound } from "next/navigation";
import Link from "next/link";
import PhotographerTemplate from "@/components/templates/PhotographerTemplate";
import DeveloperTemplate from "@/components/templates/DeveloperTemplate";
import NutritionistTemplate from "@/components/templates/NutritionistTemplate";
import { DEFAULT_THEME_BY_TEMPLATE, getDefaultContent, TEMPLATE_LABELS } from "@/lib/templates/defaults";
import type { TemplateId } from "@/lib/types";

const VALID_TEMPLATES: TemplateId[] = ["photographer", "developer", "nutritionist"];

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;

  if (!VALID_TEMPLATES.includes(template as TemplateId)) notFound();

  const templateId = template as TemplateId;
  const content = getDefaultContent(templateId);
  const theme = DEFAULT_THEME_BY_TEMPLATE[templateId];

  return (
    <div className="relative">
      <div className="sticky top-0 z-[60] flex items-center justify-between bg-black px-6 py-3 text-white">
        <span className="text-sm font-medium">
          Pré-visualização do modelo: <strong>{TEMPLATE_LABELS[templateId]}</strong> (conteúdo de exemplo)
        </span>
        <Link href="/signup" className="rounded-full bg-brand px-4 py-2 text-sm font-bold hover:bg-brand-hover">
          Usar este modelo
        </Link>
      </div>

      {templateId === "photographer" && <PhotographerTemplate content={content as any} theme={theme} />}
      {templateId === "developer" && <DeveloperTemplate content={content as any} theme={theme} />}
      {templateId === "nutritionist" && <NutritionistTemplate content={content as any} theme={theme} />}
    </div>
  );
}
