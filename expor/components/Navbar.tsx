import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Logo />
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="hidden text-sm font-semibold text-ink underline decoration-2 underline-offset-4 md:inline"
          >
            Já tenho conta
          </Link>
          <Link href="/signup" className="btn-primary">
            Criar meu portfólio
          </Link>
        </div>
      </nav>
    </header>
  );
}
