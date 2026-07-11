import PhotographerTemplate from "./PhotographerTemplate";
import DeveloperTemplate from "./DeveloperTemplate";
import NutritionistTemplate from "./NutritionistTemplate";
import { getDefaultContent, DEFAULT_THEME_BY_TEMPLATE } from "@/lib/templates/defaults";
import type { Profile, ThemeColors } from "@/lib/types";

export default function TemplateRenderer({ profile }: { profile: Profile }) {
  if (!profile.template) return null;

  const defaults = getDefaultContent(profile.template);
  const content = { ...defaults, ...(profile.content ?? {}) } as any;

  const defaultTheme = DEFAULT_THEME_BY_TEMPLATE[profile.template];
  const theme: ThemeColors = { ...defaultTheme, ...(profile.theme ?? {}) };

  if (profile.template === "photographer") {
    return <PhotographerTemplate content={content} theme={theme} />;
  }
  if (profile.template === "developer") {
    return <DeveloperTemplate content={content} theme={theme} />;
  }
  return <NutritionistTemplate content={content} theme={theme} />;
}
