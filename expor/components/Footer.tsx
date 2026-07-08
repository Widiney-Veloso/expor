import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-base-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4 md:px-10">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-muted">
            Seu mundo profissional em destaque por meio de portfólios
            digitais personalizados.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-bold text-ink">
            Plataforma
          </h4>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li>
              <Link href="/explore" className="hover:text-ink">
                Explorar portfólios
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:text-ink">
                Criar portfólio
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-bold text-ink">
            Contato
          </h4>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li>contato@expor.com.br</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-bold text-ink">
            Redes sociais
          </h4>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-base-border py-6 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} EXPOR. Todos os direitos reservados.
      </div>
    </footer>
  );
}
