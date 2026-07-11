"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanUsername = username.trim().toLowerCase();
    if (!/^[a-z0-9._-]{3,30}$/.test(cleanUsername)) {
      setError(
        "Nome de usuário inválido. Use apenas letras minúsculas, números, ponto, hífen (3 a 30 caracteres)."
      );
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: cleanUsername,
        },
      },
    });
    setLoading(false);

    if (signUpError) {
      setError(traduzErro(signUpError.message));
      return;
    }

    // Se a confirmação de e-mail estiver ativada no Supabase, não existe
    // sessão logo após o cadastro — o usuário precisa confirmar o e-mail antes.
    if (!data.session) {
      setConfirmEmailSent(true);
      return;
    }

    router.push("/dashboard/template");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="card p-8">
          {confirmEmailSent ? (
            <div className="text-center">
              <h1 className="font-display text-xl font-bold text-ink">
                Confirme seu e-mail
              </h1>
              <p className="mt-3 text-sm text-ink-muted">
                Enviamos um link de confirmação para <strong className="text-ink">{email}</strong>.
                Abra sua caixa de entrada (verifique também o spam) e clique no
                link para ativar sua conta.
              </p>
              <Link href="/login" className="btn-primary mt-6 inline-flex">
                Ir para o login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-xl font-bold text-ink">
                Crie seu portfólio na EXPOR
              </h1>
              <p className="mt-1 text-sm text-ink-muted">
                Leva menos de um minuto.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="label" htmlFor="fullName">
                    Nome completo
                  </label>
                  <input
                    id="fullName"
                    className="input"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="label" htmlFor="username">
                    Nome de usuário (URL do seu portfólio)
                  </label>
                  <div className="flex items-center overflow-hidden rounded-xl border border-base-border bg-base-card2">
                    <span className="pl-4 text-sm text-ink-faint">expor.com/p/</span>
                    <input
                      id="username"
                      className="w-full bg-transparent px-2 py-3 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="seunome"
                    />
                  </div>
                </div>
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
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo de 6 caracteres"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? "Criando conta..." : "Criar meu portfólio"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-ink-muted">
                Já tem uma conta?{" "}
                <Link href="/login" className="font-semibold text-brand-light">
                  Entrar
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function traduzErro(msg: string) {
  if (msg.includes("already registered")) return "Este e-mail já está cadastrado.";
  if (msg.includes("Password")) return "A senha precisa ter pelo menos 6 caracteres.";
  return "Não foi possível criar sua conta. Verifique os dados e tente novamente.";
}
