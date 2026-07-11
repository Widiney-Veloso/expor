import type {
  DeveloperContent,
  NutritionistContent,
  PhotographerContent,
  TemplateId,
  ThemeColors,
} from "@/lib/types";

export const TEMPLATE_LABELS: Record<TemplateId, string> = {
  photographer: "Fotógrafo",
  developer: "Desenvolvedor de Sistemas",
  nutritionist: "Nutricionista",
};

export const TEMPLATE_DESCRIPTIONS: Record<TemplateId, string> = {
  photographer:
    "Elegante e minimalista, com foco em galeria de fotos, planos de sessão e depoimentos.",
  developer:
    "Moderno e ousado, com seções de serviços, tecnologias, portfólio de projetos e planos.",
  nutritionist:
    "Acolhedor e profissional, com seção de resultados, planos de atendimento e depoimentos.",
};

export const DEFAULT_THEME_BY_TEMPLATE: Record<TemplateId, ThemeColors> = {
  photographer: {
    primary: "#d97706",
    secondary: "#f3f4f6",
    background: "#ffffff",
    dark: "#111827",
  },
  developer: {
    primary: "#0055d4",
    secondary: "#ff6b35",
    background: "#ffffff",
    dark: "#111827",
  },
  nutritionist: {
    primary: "#10b981",
    secondary: "#3b82f6",
    background: "#ffffff",
    dark: "#111827",
  },
};

export const DEFAULT_PHOTOGRAPHER_CONTENT: PhotographerContent = {
  brandName: "Seu Nome",
  heroTitle: "Capturando Histórias",
  heroSubtitle:
    "Através da lente, cada momento se torna uma obra de arte. Especializado em fotografia de eventos, retratos e sessões especiais.",
  heroParagraph:
    "Com anos de experiência, transformo momentos ordinários em memórias extraordinárias. Meu trabalho é caracterizado pela atenção aos detalhes, iluminação sofisticada e composição impecável.",
  heroImage: "",
  aboutText:
    "Acredito que toda fotografia deve contar uma história. Meu objetivo é capturar não apenas imagens, mas emoções, conexões e momentos que definem nossas vidas.",
  stats: [
    { number: "500+", label: "Projetos Realizados" },
    { number: "10+", label: "Anos de Experiência" },
    { number: "98%", label: "Clientes Satisfeitos" },
  ],
  philosophy: [
    { title: "Autenticidade", text: "Capturo momentos reais, sem poses forçadas." },
    { title: "Iluminação", text: "Domino a luz natural e artificial para criar atmosferas perfeitas." },
    { title: "Atenção aos Detalhes", text: "Cada elemento da composição é cuidadosamente considerado." },
    { title: "Pós-Produção Refinada", text: "Edição profissional que realça sem exagerar." },
  ],
  specialties: [
    "Fotografia de Casamentos",
    "Retratos Profissionais",
    "Sessões de Gestação",
    "Fotografia de Eventos",
  ],
  gallery: [
    { title: "Projeto 1", category: "Categoria", image: "", description: "Descrição do projeto" },
    { title: "Projeto 2", category: "Categoria", image: "", description: "Descrição do projeto" },
    { title: "Projeto 3", category: "Categoria", image: "", description: "Descrição do projeto" },
  ],
  plans: [
    {
      name: "Essencial",
      price: "R$ 1.500",
      period: "4 horas",
      description: "Perfeito para sessões menores",
      features: ["Até 4 horas de cobertura", "Edição profissional", "100 fotos em alta qualidade"],
      highlighted: false,
    },
    {
      name: "Premium",
      price: "R$ 3.500",
      period: "8 horas",
      description: "Nossa opção mais popular",
      features: ["Até 8 horas de cobertura", "300+ fotos em alta qualidade", "Álbum digital"],
      highlighted: true,
    },
    {
      name: "Exclusivo",
      price: "R$ 6.000",
      period: "Customizado",
      description: "Cobertura completa",
      features: ["Cobertura ilimitada", "500+ fotos selecionadas", "Álbum físico premium"],
      highlighted: false,
    },
  ],
  testimonials: [
    { name: "Cliente 1", role: "Noiva", image: "", text: "Depoimento do cliente aqui.", rating: 5 },
    { name: "Cliente 2", role: "Empresário", image: "", text: "Depoimento do cliente aqui.", rating: 5 },
  ],
  phone: "(00) 00000-0000",
  email: "contato@seudominio.com",
  address: "Sua cidade, UF",
  instagram: "@seuusuario",
  whatsapp: "5500000000000",
};

export const DEFAULT_DEVELOPER_CONTENT: DeveloperContent = {
  brandName: "Seu Nome",
  heroBadge: "🚀 Transformando Ideias em Código",
  heroTitle: "Seu Próximo Projeto Merece",
  heroHighlight: "Excelência",
  heroParagraph:
    "Desenvolvedor de sistemas especializado em criar soluções web modernas, escaláveis e com excelente experiência do usuário.",
  heroImage: "",
  aboutBadge: "Sobre Mim",
  aboutTitle: "Criando Soluções que Transformam Negócios",
  aboutParagraph:
    "Com experiência em desenvolvimento de sistemas, ajudo empresas a transformar suas ideias em soluções digitais de impacto.",
  services: [
    { title: "Desenvolvimento Web", description: "Sites e aplicações modernas." },
    { title: "Apps Móveis", description: "Aplicações nativas e híbridas." },
    { title: "Otimização", description: "Performance, SEO e experiência do usuário." },
    { title: "Consultoria", description: "Orientação técnica e arquitetura de sistemas." },
  ],
  skills: ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL"],
  gallery: [
    { title: "Projeto 1", category: "Web", image: "", description: "Descrição do projeto" },
    { title: "Projeto 2", category: "Mobile", image: "", description: "Descrição do projeto" },
    { title: "Projeto 3", category: "Design", image: "", description: "Descrição do projeto" },
  ],
  plans: [
    {
      name: "Starter",
      price: "R$ 2.500",
      period: "/projeto",
      description: "Perfeito para pequenos projetos",
      features: ["Até 5 páginas", "Design responsivo", "SEO básico"],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "R$ 7.500",
      period: "/projeto",
      description: "Para projetos de médio porte",
      features: ["Até 15 páginas", "Integração com APIs", "Suporte prioritário"],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Customizado",
      period: "/projeto",
      description: "Soluções completas",
      features: ["Páginas ilimitadas", "Dashboard admin", "Suporte 24/7"],
      highlighted: false,
    },
  ],
  testimonials: [
    { name: "Cliente 1", role: "CEO", content: "Excelente trabalho, recomendo!", rating: 5 },
    { name: "Cliente 2", role: "Diretora", content: "Profissional muito competente.", rating: 5 },
  ],
  ctaTitle: "Vamos Criar Algo Incrível Juntos?",
  ctaParagraph:
    "Tenha uma conversa inicial sem compromisso. Vamos entender suas necessidades e apresentar a melhor solução.",
  whatsapp: "5500000000000",
  instagram: "@seuusuario",
};

export const DEFAULT_NUTRITIONIST_CONTENT: NutritionistContent = {
  brandName: "Seu Nome",
  heroTitle: "Sua transformação começa",
  heroHighlight: "aqui",
  heroParagraph:
    "Acompanhamento nutricional personalizado para alcançar seus objetivos de saúde e bem-estar.",
  heroImage: "",
  heroBadgeNumber: "+500",
  heroBadgeLabel: "Pacientes transformados com sucesso",
  aboutParagraph:
    "Sou nutricionista especializada em nutrição clínica e emagrecimento saudável. Minha missão é ajudar você a alcançar seus objetivos através de uma abordagem personalizada.",
  aboutCards: [
    { title: "Formação", text: "Graduado(a) em Nutrição com especialização na área." },
    { title: "Abordagem", text: "Nutrição humanizada e personalizada." },
    { title: "Objetivo", text: "Transformar vidas através de nutrição equilibrada." },
  ],
  plans: [
    {
      name: "Consulta Inicial",
      price: "R$ 150",
      period: "uma vez",
      description: "Avaliação completa",
      features: ["Avaliação nutricional completa", "Análise de hábitos alimentares", "Plano nutricional inicial"],
      highlighted: false,
    },
    {
      name: "Acompanhamento 3 Meses",
      price: "R$ 450",
      period: "/mês",
      description: "Mais completo",
      features: ["Consultas mensais", "Planos personalizados", "Acompanhamento por WhatsApp"],
      highlighted: true,
    },
    {
      name: "Acompanhamento Premium",
      price: "R$ 650",
      period: "/mês",
      description: "Suporte total",
      features: ["Consultas quinzenais", "Suporte prioritário", "Planos customizados"],
      highlighted: false,
    },
  ],
  results: [
    { image: "", title: "Nome - resultado alcançado", text: "Depoimento sobre a transformação.", duration: "3 meses de acompanhamento" },
    { image: "", title: "Nome - resultado alcançado", text: "Depoimento sobre a transformação.", duration: "6 meses de acompanhamento" },
  ],
  testimonials: [
    { name: "Paciente 1", image: "", text: "Profissional excelente! Muito atenciosa.", rating: 5 },
    { name: "Paciente 2", image: "", text: "Consegui emagrecer sem sofrer.", rating: 5 },
  ],
  whatsapp: "5500000000000",
  instagram: "@seuusuario",
  hours: ["Seg - Sex: 8h - 18h", "Sábado: 9h - 13h", "Domingo: Fechado"],
};

export function getDefaultContent(template: TemplateId) {
  if (template === "photographer") return DEFAULT_PHOTOGRAPHER_CONTENT;
  if (template === "developer") return DEFAULT_DEVELOPER_CONTENT;
  return DEFAULT_NUTRITIONIST_CONTENT;
}
