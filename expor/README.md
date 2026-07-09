# EXPOR — Plataforma de Portfólios Digitais

MVP funcional da plataforma EXPOR, desenvolvida como parte do TCC do curso de
Análise e Desenvolvimento de Sistemas (IFPI — Campus Picos).

## Stack utilizada

- **Next.js 16** (App Router) — frontend e backend em um único projeto
- **Supabase** — banco de dados PostgreSQL, autenticação e armazenamento de imagens
- **Tailwind CSS** — estilização, seguindo a identidade visual da EXPOR (tema escuro + roxo)
- **TypeScript**

## Funcionalidades implementadas neste incremento (MVP)

- Cadastro e login de usuários (e-mail/senha)
- Criação e edição de perfil profissional (foto, capa, bio, área, redes sociais)
- Criação, edição e exclusão de projetos do portfólio, com upload de imagens
- Página pública do portfólio (`/p/[username]`), acessível sem login
- Página de exploração/descoberta de portfólios públicos
- Dashboard do criador com seus projetos, favoritos e descoberta de outros portfólios
- Controle de visibilidade (portfólio público/privado, projeto publicado/rascunho)

## Passo a passo para rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior instalado (necessário para o Next.js 16)
- Uma conta gratuita no [Supabase](https://supabase.com/)

### 2. Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com/) e crie um novo projeto (escolha uma senha de banco e a região mais próxima, ex: São Paulo).
2. Aguarde o projeto ser provisionado (leva cerca de 2 minutos).
3. No menu lateral, vá em **SQL Editor** → **New query**.
4. Copie todo o conteúdo do arquivo `supabase/schema.sql` deste projeto, cole no editor e clique em **Run**.
   - Isso cria as tabelas (`profiles`, `projects`, `project_images`, `favorites`), as regras de segurança (RLS) e o bucket de imagens `portfolio-images`.
5. Vá em **Project Settings → API** e copie:
   - **Project URL**
   - **anon public key**

### 3. Configurar o projeto localmente

```bash
# instalar dependências
npm install

# copiar o arquivo de variáveis de ambiente
cp .env.local.example .env.local
```

Abra o `.env.local` e preencha com os dados copiados do Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-public
```

### 4. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:3000`.

### 5. Publicar (deploy)

Quando quiser colocar a EXPOR no ar:

1. Suba este projeto para um repositório no GitHub.
2. Crie uma conta na [Vercel](https://vercel.com/) e importe o repositório.
3. Na Vercel, em **Environment Variables**, adicione as mesmas duas variáveis do `.env.local`.
4. Clique em **Deploy**. A Vercel builda e publica automaticamente.

O banco de dados (Supabase) já está na nuvem desde o passo 2, então não precisa de nenhuma configuração extra de banco no deploy.

## Estrutura do projeto

```
app/
  page.tsx                          → landing page
  login/page.tsx                    → login
  signup/page.tsx                   → cadastro
  explore/page.tsx                  → descoberta de portfólios públicos
  p/[username]/page.tsx             → portfólio público de um criador
  dashboard/page.tsx                → painel do criador logado
  dashboard/settings/page.tsx       → edição do perfil
  dashboard/projects/new/page.tsx   → criar projeto
  dashboard/projects/[id]/edit/     → editar projeto
components/                         → componentes reutilizáveis de UI
lib/supabase/                       → clientes Supabase (browser, server, middleware)
lib/types.ts                        → tipos TypeScript do domínio
supabase/schema.sql                 → schema completo do banco (rodar no Supabase)
```

## Próximos incrementos sugeridos (alinhados ao modelo incremental do TCC)

- Reordenação de projetos por arrastar-e-soltar (drag and drop)
- Galeria com múltiplas imagens por projeto (a tabela `project_images` já está pronta no banco)
- Sistema de favoritar portfólios (tabela `favorites` já está pronta; falta a UI de "favoritar" na página pública)
- Filtros por área/categoria na página de exploração
- Aplicação do questionário de validação (escala Likert) com os participantes da pesquisa
- Métricas simples de visualização de portfólio para o criador
