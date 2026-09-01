import Link from "next/link";
import { entities } from "@/lib/entities";
import Reveal from "@/components/Reveal";
import PoleCard from "@/components/PoleCard";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-93px)] items-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/hero/hero-bg.jpg"
            alt=""
            className="h-full w-full object-cover object-[center_38%]"
          />
          <div className="absolute inset-0 bg-black/12" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-10 text-center lg:px-8">
          <Reveal className="hero-shadow flex max-w-2xl flex-col items-center">
            <h1 className="font-display max-w-2xl text-4xl leading-[1.1] text-paper sm:text-5xl lg:text-[3.4rem]">
              Toute la chaîne de valeur digitale,{" "}
              <span className="italic text-blue-200">de la stratégie à l&apos;exécution.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper">
              CFGroupe couvre l&apos;intégralité de la chaîne de valeur
              digitale à travers quatre pôles complémentaires, mobilisés selon
              les besoins de chaque mission — du cadrage stratégique jusqu&apos;à
              l&apos;exécution technique.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 [text-shadow:none]">
              <Link
                href="#poles"
                className="group relative overflow-hidden bg-paper px-7 py-3.5 text-sm font-medium tracking-wide text-navy-950 transition-transform duration-300 hover:scale-[1.03]"
              >
                Découvrir nos pôles
              </Link>
              <Link
                href="/contact"
                className="link-underline text-sm font-medium tracking-wide text-paper"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Entities grid */}
      <section id="poles" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 lg:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <p className="kicker text-blue-600">Nos pôles</p>
          <h2 className="font-display mt-4 text-3xl text-navy-950 sm:text-4xl">
            Quatre expertises, une même exigence
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {entities.map((entity, i) => (
            <Reveal key={entity.slug} delay={i * 80}>
              <PoleCard entity={entity} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fil conducteur */}
      <section className="grain relative bg-black text-paper">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <Reveal>
            <p className="kicker text-cream-dim">Le fil conducteur</p>
            <blockquote className="font-display mt-6 max-w-3xl text-2xl italic leading-snug text-paper/90 sm:text-3xl">
              &laquo; La diversification sectorielle de CFGroupe ne part
              pas de zéro — elle capitalise sur un savoir-faire éprouvé.
              &raquo;
            </blockquote>

            <div className="mt-14 grid gap-10 border-t border-hairline-dark pt-14 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-cream-dim">
                  Un client bancaire
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  Accompagné dès le cadrage, il peut être orienté vers nos
                  produits CFSoft, avec le pôle CFSolutions en support
                  d&apos;intégration.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-cream-dim">
                  Un client santé ou éducation
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">
                  Entrant par CFTech, il bénéficie du même niveau de rigueur
                  méthodologique que nous appliquons historiquement à la
                  banque.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center lg:px-8">
        <Reveal className="flex flex-col items-center">
          <h2 className="font-display text-3xl text-navy-950 sm:text-4xl">
            Un interlocuteur, quatre expertises.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Parlons de votre projet, quel que soit le pôle le plus pertinent
            pour vous.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-block border border-black bg-black px-8 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors hover:bg-navy-800"
          >
            Nous contacter
          </Link>
        </Reveal>
      </section>
    </>
  );
}
