import Link from "next/link";
import { entities } from "@/lib/entities";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-hairline-dark bg-black text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Toute la chaîne de valeur digitale, de la stratégie à
              l&apos;exécution, à travers quatre pôles complémentaires.
            </p>
          </div>

          <div>
            <p className="kicker text-paper/40">Pôles</p>
            <ul className="mt-4 space-y-2.5">
              {entities.map((e) => (
                <li key={e.slug}>
                  <Link
                    href={`/poles/${e.slug}`}
                    className="link-underline text-sm text-paper/75 hover:text-paper"
                  >
                    {e.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kicker text-paper/40">Entreprise</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/contact" className="link-underline text-sm text-paper/75 hover:text-paper">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="kicker text-paper/40">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
              <li>
                <a href="mailto:contact@cfgroupe.fr" className="link-underline hover:text-paper">
                  contact@cfgroupe.fr
                </a>
              </li>
              <li className="text-paper/50">+33 (0)1 XX XX XX XX</li>
              <li className="text-paper/50">Adresse à venir</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline-dark pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CFGroupe. Tous droits réservés.</p>
          <p>CFGroupe · CFSolutions · CFSoft · CFTech</p>
        </div>
      </div>
    </footer>
  );
}
