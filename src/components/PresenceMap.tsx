import type { PresenceLocation } from "@/lib/content-types";
import { sizeStyle } from "@/lib/typography";
import Reveal from "@/components/Reveal";

export default function PresenceMap({
  title,
  backgroundImage,
  locations,
  fieldSizes,
}: {
  title: string;
  backgroundImage: string | null;
  locations: PresenceLocation[];
  fieldSizes: Record<string, number>;
}) {
  if (!backgroundImage && locations.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <Reveal>
        <h2
          className="font-display text-center text-3xl text-navy-950 sm:text-4xl"
          style={sizeStyle(fieldSizes, "presence.title")}
        >
          {title}
        </h2>

        {locations.length > 0 && (
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {locations.map((loc) => (
              <div key={loc.id} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: loc.color }}
                />
                <span className="text-sm text-ink-soft">
                  {loc.city} — {loc.year}
                </span>
              </div>
            ))}
          </div>
        )}

        {backgroundImage && (
          <div className="relative mx-auto mt-10 w-full overflow-hidden rounded-2xl bg-paper-dim">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={backgroundImage} alt="" className="block w-full" />
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${loc.xPercent}%`, top: `${loc.yPercent}%` }}
              >
                <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
                  <path
                    d="M11 0C4.9 0 0 4.9 0 11c0 8.25 11 19 11 19s11-10.75 11-19c0-6.1-4.9-11-11-11z"
                    fill={loc.color}
                  />
                  <circle cx="11" cy="11" r="4" fill="white" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
