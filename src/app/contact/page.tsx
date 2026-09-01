import type { Metadata } from "next";
import { entities } from "@/lib/entities";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez CFGroupe pour votre projet, quel que soit le pôle le plus pertinent : CFGroupe, CFSolutions, CFSoft ou CFTech.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 lg:px-8 lg:pt-28">
        <Reveal>
          <p className="kicker text-blue-600">Contact</p>
          <h1 className="font-display mt-6 text-4xl leading-tight text-navy-950 sm:text-5xl">
            Parlons de votre projet.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Quel que soit votre besoin — cadrage, exécution, logiciels métiers
            ou solution sectorielle — une même équipe coordonne votre
            accompagnement à travers les quatre pôles de CFGroupe.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-hairline">
        <Reveal className="mx-auto grid max-w-4xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="kicker text-ink-soft">Coordonnées</p>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-sm font-semibold text-navy-900">Email</dt>
                <dd className="mt-1">
                  <a
                    href="mailto:contact@cfgroupe.fr"
                    className="link-underline text-base text-blue-600"
                  >
                    contact@cfgroupe.fr
                  </a>
                  <span className="ml-2 text-xs text-ink-soft/60">
                    (à confirmer)
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-navy-900">
                  Téléphone
                </dt>
                <dd className="mt-1 text-base text-ink-soft">
                  +33 (0)1 XX XX XX XX{" "}
                  <span className="ml-2 text-xs text-ink-soft/60">
                    (à confirmer)
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-navy-900">
                  Adresse
                </dt>
                <dd className="mt-1 text-base text-ink-soft">
                  Adresse à venir
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="kicker text-ink-soft">Par pôle</p>
            <ul className="mt-6 space-y-4">
              {entities.map((entity) => (
                <li
                  key={entity.slug}
                  className="flex items-baseline justify-between border-b border-hairline pb-4"
                >
                  <div>
                    <p className="font-display text-lg text-navy-950">
                      {entity.name}
                    </p>
                    <p className="text-sm text-ink-soft">{entity.tagline}</p>
                  </div>
                  <a
                    href={`mailto:${entity.slug}@cfgroupe.fr`}
                    className="link-underline text-sm text-blue-600 whitespace-nowrap"
                  >
                    {entity.slug}@cfgroupe.fr
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
