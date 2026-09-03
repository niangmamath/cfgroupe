import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { getContent, getTheme } from "@/lib/store";
import { sizeStyle } from "@/lib/typography";
import Reveal from "@/components/Reveal";
import PoleCard from "@/components/PoleCard";
import HeroWaves from "@/components/HeroWaves";
import CustomSections from "@/components/CustomSections";

export default async function Home() {
  const [content, theme] = await Promise.all([getContent(), getTheme()]);
  const { hero, polesSection, filConducteur, contact, entities, homeSections, homeSectionOrder } =
    content;
  const fs = theme.typography.fieldSizes;
  const hasMedia =
    hero.mediaPublished !== false && Boolean(hero.backgroundImage || hero.backgroundVideo);

  const heroSection = (
    <section key="hero" className="relative flex items-center overflow-hidden bg-navy-800">
      {hero.mediaPublished !== false && hero.backgroundVideo ? (
        <video
          src={hero.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : hero.mediaPublished !== false && hero.backgroundImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.backgroundImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <HeroWaves />
      )}
      {hasMedia && <div className="absolute inset-0 bg-navy-950/60" />}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-8 text-center lg:px-8 lg:py-10">
        <Reveal className="flex max-w-2xl flex-col items-center">
          <h1 className="font-display max-w-2xl text-4xl leading-[1.1] text-paper sm:text-6xl lg:text-7xl">
            <span style={sizeStyle(fs, "hero.titleMain")}>{hero.titleMain}</span>{" "}
            <span className="italic text-blue-200" style={sizeStyle(fs, "hero.titleAccent")}>
              {hero.titleAccent}
            </span>
          </h1>
          <p
            className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-paper/90 sm:text-base"
            style={sizeStyle(fs, "hero.subtitle")}
          >
            {hero.subtitle}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#poles"
              className="rounded-full bg-paper px-7 py-3.5 text-sm font-medium tracking-wide text-navy-950 transition-transform duration-300 hover:scale-[1.03]"
              style={sizeStyle(fs, "hero.ctaPrimaryLabel")}
            >
              {hero.ctaPrimaryLabel}
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-paper/40 px-7 py-3.5 text-sm font-medium tracking-wide text-paper transition-colors duration-300 hover:border-paper hover:bg-white/5"
              style={sizeStyle(fs, "hero.ctaSecondaryLabel")}
            >
              {hero.ctaSecondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );

  const polesGridSection = (
    <section key="poles" id="poles" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-14 lg:px-8">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <p className="kicker text-blue-600" style={sizeStyle(fs, "polesSection.kicker")}>
          {polesSection.kicker}
        </p>
        <h2
          className="font-display mt-3 text-4xl text-navy-950 sm:text-5xl"
          style={sizeStyle(fs, "polesSection.title")}
        >
          {polesSection.title}
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
  );

  const filConducteurSection = (
    <section key="filConducteur" className="grain relative bg-black text-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <Reveal>
          <p className="kicker text-cream-dim" style={sizeStyle(fs, "filConducteur.kicker")}>
            {filConducteur.kicker}
          </p>
          <blockquote
            className="font-display mt-6 max-w-3xl text-2xl italic leading-snug text-paper/90 sm:text-3xl"
            style={sizeStyle(fs, "filConducteur.quote")}
          >
            &laquo; {filConducteur.quote} &raquo;
          </blockquote>

          <div className="mt-14 grid gap-10 border-t border-hairline-dark pt-14 sm:grid-cols-2">
            <div>
              <p
                className="text-sm font-medium text-cream-dim"
                style={sizeStyle(fs, "filConducteur.caseALabel")}
              >
                {filConducteur.caseALabel}
              </p>
              <p
                className="mt-3 text-sm leading-relaxed text-paper/70"
                style={sizeStyle(fs, "filConducteur.caseAText")}
              >
                {filConducteur.caseAText}
              </p>
            </div>
            <div>
              <p
                className="text-sm font-medium text-cream-dim"
                style={sizeStyle(fs, "filConducteur.caseBLabel")}
              >
                {filConducteur.caseBLabel}
              </p>
              <p
                className="mt-3 text-sm leading-relaxed text-paper/70"
                style={sizeStyle(fs, "filConducteur.caseBText")}
              >
                {filConducteur.caseBText}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );

  const contactSection = (
    <section
      key="contact"
      id="contact"
      className="relative overflow-hidden bg-contact-blue scroll-mt-24"
    >
      <HeroWaves />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center lg:px-8">
        <Reveal>
          <p className="kicker text-cream-dim" style={sizeStyle(fs, "contact.kicker")}>
            {contact.kicker}
          </p>
          <h2
            className="font-display mt-4 text-4xl text-paper sm:text-5xl"
            style={sizeStyle(fs, "contact.title")}
          >
            {contact.title}
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-paper/75"
            style={sizeStyle(fs, "contact.subtitle")}
          >
            {contact.subtitle}
          </p>

          <div className="mx-auto mt-14 grid max-w-lg gap-12 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30">
                <Mail className="h-5 w-5 text-paper" strokeWidth={1.5} />
              </span>
              <p className="text-sm font-medium text-paper/70">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="link-underline text-lg text-paper"
                style={sizeStyle(fs, "contact.email")}
              >
                {contact.email}
              </a>
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/30">
                <Phone className="h-5 w-5 text-paper" strokeWidth={1.5} />
              </span>
              <p className="text-sm font-medium text-paper/70">Téléphone</p>
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="link-underline text-lg text-paper"
                style={sizeStyle(fs, "contact.phone")}
              >
                {contact.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );

  const fixedSections: Record<string, React.ReactNode> = {
    hero: heroSection,
    poles: polesGridSection,
    filConducteur: filConducteurSection,
    contact: contactSection,
  };

  return (
    <>
      {homeSectionOrder.map((entry) => {
        if (entry.kind === "fixed") {
          return fixedSections[entry.key];
        }
        const section = homeSections.find((s) => s.id === entry.id);
        if (!section) return null;
        return (
          <CustomSections
            key={entry.id}
            sections={[section]}
            fieldSizes={fs}
            keyPrefix="homeSections"
          />
        );
      })}
    </>
  );
}
