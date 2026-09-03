import type { TrustedLogo } from "@/lib/content-types";
import { sizeStyle } from "@/lib/typography";
import Reveal from "@/components/Reveal";

export default function TrustedLogosMarquee({
  title,
  subtitle,
  logos,
  fieldSizes,
}: {
  title: string;
  subtitle: string;
  logos: TrustedLogo[];
  fieldSizes: Record<string, number>;
}) {
  if (logos.length === 0) return null;

  const doubled = [...logos, ...logos];

  return (
    <section className="py-12">
      <Reveal>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2
            className="font-display text-3xl text-navy-950 sm:text-4xl"
            style={sizeStyle(fieldSizes, "trustedSection.title")}
          >
            {title}
          </h2>
          <p
            className="mt-3 text-ink-soft"
            style={sizeStyle(fieldSizes, "trustedSection.subtitle")}
          >
            {subtitle}
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-16">
            {doubled.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${logo.id}-${i}`}
                src={logo.image}
                alt={logo.alt}
                className="h-12 w-auto shrink-0 object-contain"
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
