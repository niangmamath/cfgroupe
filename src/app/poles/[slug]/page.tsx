import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { entities, getEntity, getAdjacentEntities } from "@/lib/entities";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return entities.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entity = getEntity(slug);
  if (!entity) return {};
  return {
    title:
      entity.name === "CFGroupe"
        ? entity.tagline
        : `${entity.name} — ${entity.tagline}`,
    description: entity.description,
  };
}

export default async function EntityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entity = getEntity(slug);
  if (!entity) notFound();
  const { prev, next } = getAdjacentEntities(slug);

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 lg:px-8 lg:pt-28">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="numeral text-lg text-cream">{entity.number}</span>
            <span className="h-px flex-1 bg-hairline" />
            <span className="kicker text-ink-soft">{entity.kicker}</span>
          </div>
          <h1 className="font-display mt-6 text-4xl leading-tight text-navy-950 sm:text-5xl">
            {entity.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-blue-600">
            {entity.tagline}
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {entity.description}
          </p>
        </Reveal>
      </section>

      {entity.poles && (
        <section className="border-y border-hairline bg-paper-dim">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <Reveal>
              <p className="kicker text-blue-600">{entity.groupsLabel}</p>
              <div className="mt-8 grid gap-px overflow-hidden border border-hairline bg-hairline sm:grid-cols-3">
                {entity.poles.map((pole) => (
                  <div
                    key={pole.name}
                    className="group bg-paper p-7 transition-colors hover:bg-paper-dim"
                  >
                    <h3 className="font-display text-xl text-navy-950">
                      {pole.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {pole.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {entity.groups.length > 0 && (
        <section className="border-y border-hairline bg-paper-dim">
          <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
            <Reveal>
              <p className="kicker text-blue-600">{entity.groupsLabel}</p>
              <div className="mt-8 grid gap-10 sm:grid-cols-3">
                {entity.groups.map((group) => (
                  <div key={group.title}>
                    <p className="text-sm font-semibold text-navy-900">
                      {group.title}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Synergy callout, echoing the original doc's blue box */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <Reveal className="border border-blue-600/30 bg-blue-100 p-8 sm:p-10">
          <p className="kicker text-navy-800">Synergie CFGroupe</p>
          <p className="mt-4 text-base leading-relaxed text-navy-900">
            {entity.synergy}
          </p>
        </Reveal>
      </section>

      {/* Prev / next */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-4xl grid-cols-2 px-6 lg:px-8">
          <Link
            href={`/poles/${prev.slug}`}
            className="group flex flex-col gap-2 border-r border-hairline py-10 pr-6"
          >
            <span className="kicker text-ink-soft">Précédent</span>
            <span className="font-display text-xl text-navy-950 transition-transform group-hover:-translate-x-1">
              ← {prev.name}
            </span>
          </Link>
          <Link
            href={`/poles/${next.slug}`}
            className="group flex flex-col items-end gap-2 py-10 pl-6 text-right"
          >
            <span className="kicker text-ink-soft">Suivant</span>
            <span className="font-display text-xl text-navy-950 transition-transform group-hover:translate-x-1">
              {next.name} →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
