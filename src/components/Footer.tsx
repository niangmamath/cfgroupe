import Link from "next/link";
import { getContent, getTheme } from "@/lib/store";
import { sizeStyle } from "@/lib/typography";
import Logo from "@/components/Logo";

export default async function Footer() {
  const [content, theme] = await Promise.all([getContent(), getTheme()]);
  const fs = theme.typography.fieldSizes;

  return (
    <footer className="border-t border-hairline-dark bg-black text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" className="h-9 w-auto" />
            <p
              className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60"
              style={sizeStyle(fs, "footer.tagline")}
            >
              {content.footer.tagline}
            </p>
          </div>

          <div>
            <p className="kicker text-paper/40">Pôles</p>
            <ul className="mt-4 space-y-2.5">
              {content.entities.map((e) => (
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
                <Link href="/#contact" className="link-underline text-sm text-paper/75 hover:text-paper">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="kicker text-paper/40">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/75">
              <li>
                <a
                  href={`mailto:${content.contact.email}`}
                  className="link-underline hover:text-paper"
                >
                  {content.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${content.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="link-underline hover:text-paper"
                >
                  {content.contact.phone}
                </a>
              </li>
              <li className="text-paper/50">Maroc</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline-dark pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <span style={sizeStyle(fs, "footer.copyrightName")}>
              {content.footer.copyrightName}
            </span>
            . Tous droits réservés.
          </p>
          <p>{content.entities.map((e) => e.name).join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
