import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { entities } from "@/lib/entities";
import Reveal from "@/components/Reveal";
import PoleCard from "@/components/PoleCard";
import HeroWaves from "@/components/HeroWaves";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center overflow-hidden bg-navy-800">
        <HeroWaves />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-8 text-center lg:px-8 lg:py-10">
          <Reveal className="flex max-w-2xl flex-col items-center">
            <h1 className="font-display max-w-2xl text-4xl leading-[1.1] text-paper sm:text-6xl lg:text-7xl">
              Notre rigueur,{" "}
              <span className="italic text-blue-200">votre transformation.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-paper/90 sm:text-base">
              Banque, santé ou éducation — CFConsulting vous accompagne du
              cadrage à l&apos;exécution.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#poles"
                className="rounded-full bg-paper px-7 py-3.5 text-sm font-medium tracking-wide text-navy-950 transition-transform duration-300 hover:scale-[1.03]"
              >
                Découvrir nos pôles
              </Link>
              <Link
                href="/#contact"
                className="rounded-full border border-paper/40 px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:border-paper hover:bg-white/5"
              >
                Discutons de votre projet
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Entities grid */}
      <section id="poles" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14 lg:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="kicker text-blue-600">Nos pôles</p>
          <h2 className="font-display mt-3 text-4xl text-navy-950 sm:text-5xl">
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
              &laquo; La diversification sectorielle de CFConsulting ne part
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

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden bg-contact-blue scroll-mt-24">
        <HeroWaves />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
          <Reveal>
            <p className="kicker text-cream-dim">Contact</p>
            <h2 className="font-display mt-4 text-4xl text-paper sm:text-5xl">
              Discutons de votre projet
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/75">
              Échangeons sur vos besoins et concrétisons votre transformation.
            </p>

            <div className="mx-auto mt-14 grid max-w-lg gap-12 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30">
                  <Mail className="h-5 w-5 text-paper" strokeWidth={1.5} />
                </span>
                <p className="text-sm font-medium text-paper/70">Email</p>
                <a
                  href="mailto:contact@cfconsulting.fr"
                  className="link-underline text-lg text-paper"
                >
                  contact@cfconsulting.fr
                </a>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30">
                  <Phone className="h-5 w-5 text-paper" strokeWidth={1.5} />
                </span>
                <p className="text-sm font-medium text-paper/70">Téléphone</p>
                <a
                  href="tel:+33100000000"
                  className="link-underline text-lg text-paper"
                >
                  +33 (0)1 XX XX XX XX
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
