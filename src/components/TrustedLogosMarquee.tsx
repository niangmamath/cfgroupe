import type { TrustedLogo } from "@/lib/content-types";
import { sizeStyle } from "@/lib/typography";
import Reveal from "@/components/Reveal";

export default function TrustedLogosMarquee({
  title,
  logos,
  fieldSizes,
}: {
  title: string;
  logos: TrustedLogo[];
  fieldSizes: Record<string, number>;
}) {
  if (logos.length === 0) return null;

  // Repeated 4x (not just doubled) so the track stays wider than the
  // viewport on large/ultra-wide screens too — otherwise the loop point
  // becomes visible as a gap once the content runs out before wrapping.
  const repeated = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-8">
      <Reveal>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2
            className="font-display text-2xl text-navy-950 sm:text-3xl"
            style={sizeStyle(fieldSizes, "trustedSection.title")}
          >
            {title}
          </h2>
        </div>

        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex w-max items-center gap-16">
            {repeated.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${logo.id}-${i}`}
                src={logo.image}
                alt={logo.alt}
                className="w-auto shrink-0 object-contain"
                style={{ height: `${3 * (logo.scale || 1)}rem` }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
