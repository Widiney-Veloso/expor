-- ============================================================
-- EXPOR — Schema do banco de dados (Supabase / PostgreSQL)
-- Rode este script no SQL Editor do seu projeto Supabase.
-- ============================================================

-- Extensão usada para gerar UUIDs
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tabela: profiles
-- Um perfil profissional por usuário (1:1 com auth.users)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text not null,
  headline text,              -- ex: "Designer Gráfico e Ilustrador"
  bio text,
  area text,                  -- ex: "Design", "Fotografia", "Desenvolvimento"
  avatar_url text,
  cover_url text,
  website text,
  instagram text,
  linkedin text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- username só pode ter letras minúsculas, números, ponto e hífen
alter table public.profiles
  add constraint username_format check (username ~ '^[a-z0-9._-]{3,30}$');

-- ------------------------------------------------------------
-- Tabela: projects
-- Os "cases"/trabalhos que compõem o portfólio do usuário
-- ------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  cover_url text,
  category text,               -- ex: "Branding", "UI/UX", "Fotografia"
  tags text[] default '{}',
  external_url text,
  is_published boolean not null default true,
  position int not null default 0,   -- ordem de exibição no portfólio
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Tabela: project_images
-- Múltiplas imagens por projeto (galeria do case)
-- ------------------------------------------------------------
create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Tabela: favorites
-- Permite favoritar portfólios de outros criadores
-- ------------------------------------------------------------
create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, profile_id)
);

-- ------------------------------------------------------------
-- Trigger: mantém updated_at atualizado
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.profiles;
create trigger set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_updated_at on public.projects;
create trigger set_updated_at before update on public.projects
  for each row execute procedure public.set_updated_at();

-- ------------------------------------------------------------
-- Trigger: cria um profile automaticamente quando um usuário se cadastra
-- (usa metadata enviada no signUp: full_name e username)
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'usuario' || substr(new.id::text, 1, 8)),
    coalesce(new.raw_user_meta_data->>'full_name', 'Novo usuário')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.favorites enable row level security;

-- PROFILES: qualquer pessoa pode ler perfis públicos; o dono pode ler/editar o seu
create policy "Perfis públicos são visíveis a todos"
  on public.profiles for select
  using (is_public = true or auth.uid() = id);

create policy "Usuário pode atualizar o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- PROJECTS: visíveis se publicados e o perfil dono for público; dono sempre vê os seus
create policy "Projetos publicados são visíveis a todos"
  on public.projects for select
  using (
    (is_published = true and exists (
      select 1 from public.profiles p where p.id = profile_id and p.is_public = true
    ))
    or auth.uid() = profile_id
  );

create policy "Usuário pode inserir os próprios projetos"
  on public.projects for insert
  with check (auth.uid() = profile_id);

create policy "Usuário pode atualizar os próprios projetos"
  on public.projects for update
  using (auth.uid() = profile_id);

create policy "Usuário pode excluir os próprios projetos"
  on public.projects for delete
  using (auth.uid() = profile_id);

-- PROJECT_IMAGES: segue a visibilidade do projeto
create policy "Imagens visíveis se o projeto for visível"
  on public.project_images for select
  using (
    exists (
      select 1 from public.projects pr
      join public.profiles p on p.id = pr.profile_id
      where pr.id = project_id
        and ((pr.is_published = true and p.is_public = true) or auth.uid() = pr.profile_id)
    )
  );

create policy "Dono pode gerenciar imagens dos próprios projetos"
  on public.project_images for all
  using (
    exists (
      select 1 from public.projects pr where pr.id = project_id and pr.profile_id = auth.uid()
    )
  );

-- FAVORITES: usuário só vê e gerencia os próprios favoritos
create policy "Usuário vê os próprios favoritos"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Usuário gerencia os próprios favoritos"
  on public.favorites for all
  using (auth.uid() = user_id);

-- ============================================================
-- STORAGE: bucket público para imagens de portfólio
-- ============================================================
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

create policy "Qualquer um pode visualizar imagens do portfólio"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

create policy "Usuário autenticado pode enviar imagens"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');

create policy "Usuário pode gerenciar as próprias imagens"
  on storage.objects for update
  using (bucket_id = 'portfolio-images' and owner = auth.uid());

create policy "Usuário pode excluir as próprias imagens"
  on storage.objects for delete
  using (bucket_id = 'portfolio-images' and owner = auth.uid());
