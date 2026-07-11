import Link from "next/link";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

export default function DashboardNav({ username }: { username: string }) {
  return (
    <header className="border-b border-base-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden gap-6 text-sm font-medium text-ink-muted md:flex">
            <Link href="/dashboard" className="hover:text-ink">
              Meu painel
            </Link>
            <Link href="/dashboard/template" className="hover:text-ink">
              Modelo do site
            </Link>
            <Link href="/dashboard/editor" className="hover:text-ink">
              Editar meu site
            </Link>
            <Link href="/explore" className="hover:text-ink">
              Explorar
            </Link>
            <Link href="/dashboard/settings" className="hover:text-ink">
              Editar perfil
            </Link>
            <Link href={`/p/${username}`} className="hover:text-ink">
              Ver meu portfólio
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/dashboard/template" className="btn-primary">
            Criar Portfólio
          </Link>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
