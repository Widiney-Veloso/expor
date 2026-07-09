"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(traduzErroLogin(signInError.message));
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="card p-8">
          <h1 className="font-display text-xl font-bold text-ink">
            Bem-vindo de volta
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Entre para gerenciar seu portfólio.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className="input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                className="input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-muted">
            Ainda não tem portfólio?{" "}
            <Link href="/signup" className="font-semibold text-brand-light">
              Criar agora
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

function traduzErroLogin(msg: string) {
  if (msg.toLowerCase().includes("email not confirmed")) {
    return "Você ainda não confirmou seu e-mail. Verifique sua caixa de entrada (e o spam) e clique no link de confirmação antes de entrar.";
  }
  if (msg.toLowerCase().includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  return "Não foi possível entrar. Tente novamente em instantes.";
}
