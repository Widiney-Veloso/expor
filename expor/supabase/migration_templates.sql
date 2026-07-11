-- ============================================================
-- EXPOR — Migração: sistema de templates de portfólio
-- Rode este script no SQL Editor do Supabase (projeto já existente).
-- Não apaga nada — só adiciona colunas novas na tabela profiles.
-- ============================================================

alter table public.profiles
  add column if not exists template text
    check (template in ('photographer', 'developer', 'nutritionist')),
  add column if not exists theme jsonb not null default '{
    "primary": "#7C3AED",
    "secondary": "#3B82F6",
    "background": "#ffffff",
    "dark": "#111827"
  }'::jsonb,
  add column if not exists content jsonb not null default '{}'::jsonb;
