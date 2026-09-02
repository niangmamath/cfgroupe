import Link from "next/link";
import LogoutButton from "./LogoutButton";

const navItems = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/content", label: "Contenu des sections" },
  { href: "/admin/entities", label: "Pôles" },
  { href: "/admin/theme", label: "Thème & couleurs" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-dim">
      <header className="border-b border-hairline bg-navy-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-lg text-paper">
              CFConsulting <span className="text-paper/50">· Admin</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-paper/60 hover:text-paper"
            >
              Voir le site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
        <nav className="flex items-center gap-4 overflow-x-auto border-t border-hairline-dark px-6 py-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-xs text-paper/70 hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
