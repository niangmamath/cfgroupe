import type { CustomSection } from "@/lib/content-types";
import { sizeStyle } from "@/lib/typography";
import Reveal from "@/components/Reveal";

export default function CustomSections({
  sections,
  fieldSizes,
  keyPrefix,
}: {
  sections: CustomSection[];
  fieldSizes: Record<string, number>;
  keyPrefix: string;
}) {
  return (
    <>
      {sections
        .filter(
          (s) =>
            s.title.trim() ||
            s.text.trim() ||
            (s.mediaPublished !== false && (s.image || s.video))
        )
        .map((section) => (
          <section key={section.id} className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
            <Reveal>
              <div className="grid items-center gap-10 sm:grid-cols-2">
                <div className={section.mediaPosition === "left" ? "sm:order-2" : ""}>
                  <h2
                    className="font-display text-3xl text-navy-950 sm:text-4xl"
                    style={sizeStyle(fieldSizes, `${keyPrefix}.${section.id}.title`)}
                  >
                    {section.title}
                  </h2>
                  <p
                    className="mt-4 text-base leading-relaxed text-ink-soft"
                    style={sizeStyle(fieldSizes, `${keyPrefix}.${section.id}.text`)}
                  >
                    {section.text}
                  </p>
                </div>
                <div className={section.mediaPosition === "left" ? "sm:order-1" : ""}>
                  {section.mediaPublished !== false && section.video ? (
                    <video
                      src={section.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                  ) : section.mediaPublished !== false && section.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={section.image}
                      alt=""
                      className="aspect-[4/3] w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="aspect-[4/3] w-full rounded-2xl bg-paper-dim" />
                  )}
                </div>
              </div>
            </Reveal>
          </section>
        ))}
    </>
  );
}
