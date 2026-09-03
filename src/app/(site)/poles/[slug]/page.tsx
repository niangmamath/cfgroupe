import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Target,
  Building2,
  Wrench,
  Layers,
  Package,
  FileType,
  Rocket,
  HeartPulse,
  GraduationCap,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { getEntity, getAdjacentEntities } from "@/lib/entities";
import { getContent, getTheme } from "@/lib/store";
import { sizeStyle } from "@/lib/typography";
import Reveal from "@/components/Reveal";
import CustomSections from "@/components/CustomSections";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { entities } = await getContent();
  const entity = getEntity(entities, slug);
  if (!entity) return {};
  return {
    title:
      entity.name === "CFConsulting"
        ? entity.tagline
        : `${entity.name} — ${entity.tagline}`,
    description: entity.description,
  };
}

const poleIcons: Record<string, LucideIcon> = {
  Healthtech: HeartPulse,
  Edtech: GraduationCap,
  Fintech: TrendingUp,
};

const groupIcons: Record<string, LucideIcon> = {
  Missions: Target,
  Secteurs: Building2,
  Prestations: Wrench,
  Domaines: Layers,
  Produits: Package,
  Formats: FileType,
  Déploiement: Rocket,
};

function cardWidthClass(count: number) {
  if (count <= 1) return "sm:w-[calc(70%-0.75rem)] lg:w-[calc(60%-0.75rem)]";
  if (count === 2) return "sm:w-[calc(50%-0.75rem)] lg:w-[calc(46%-0.75rem)]";
  return "sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]";
}

const cardBorder = "border-2 border-navy-950/70 sm:border sm:border-hairline";

export default async function EntityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ entities }, theme] = await Promise.all([getContent(), getTheme()]);
  const entity = getEntity(entities, slug);
  if (!entity) notFound();
  const { prev, next } = getAdjacentEntities(entities, slug);
  const fs = theme.typography.fieldSizes;
  const base = `entities.${entity.slug}`;

  const groupsBlock = entity.poles ? (
    <section key="groups" className="border-y border-hairline bg-paper-dim">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <Reveal className="text-center">
          <p className="kicker text-blue-600" style={sizeStyle(fs, `${base}.groupsLabel`)}>
            {entity.groupsLabel}
          </p>
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-6">
            {entity.poles.map((pole, poleIndex) => {
              const Icon = poleIcons[pole.name] ?? Package;
              const poleBase = `${base}.poles.${poleIndex}`;
              return (
                <div
                  key={pole.name}
                  className={`flex w-full flex-col rounded-2xl ${cardBorder} bg-paper p-8 text-left shadow-sm transition-shadow hover:shadow-md ${cardWidthClass(entity.poles!.length)}`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                    <Icon className="h-6 w-6 text-navy-800" strokeWidth={1.75} />
                  </div>
                  <h3
                    className="font-display mt-6 text-xl text-navy-950"
                    style={sizeStyle(fs, `${poleBase}.name`)}
                  >
                    {pole.name}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-ink-soft"
                    style={sizeStyle(fs, `${poleBase}.description`)}
                  >
                    {pole.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  ) : (
    (() => {
      const filteredGroups = entity.groups
        .map((g, i) => ({ ...g, originalIndex: i }))
        .filter((g) => g.title !== "Modalités");
      if (filteredGroups.length === 0) return null;
      return (
        <section key="groups" className="border-y border-hairline bg-paper-dim">
          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
            <Reveal className="text-center">
              <p className="kicker text-blue-600" style={sizeStyle(fs, `${base}.groupsLabel`)}>
                {entity.groupsLabel}
              </p>
              <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-6">
                {filteredGroups.map((group) => {
                  const Icon = groupIcons[group.title] ?? Package;
                  const groupBase = `${base}.groups.${group.originalIndex}`;
                  return (
                    <div
                      key={group.title}
                      className={`flex w-full flex-col rounded-2xl ${cardBorder} bg-paper p-8 text-left shadow-sm transition-shadow hover:shadow-md ${cardWidthClass(filteredGroups.length)}`}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                        <Icon className="h-6 w-6 text-navy-800" strokeWidth={1.75} />
                      </div>
                      <h3
                        className="font-display mt-6 text-xl text-navy-950"
                        style={sizeStyle(fs, `${groupBase}.title`)}
                      >
                        {group.title}
                      </h3>
                      <ul className="mt-5 space-y-4">
                        {group.items.map((item, itemIndex) => {
                          const itemBase = `${groupBase}.items.${itemIndex}`;
                          return (
                            <li key={item.label}>
                              <p
                                className="text-sm font-semibold text-navy-900"
                                style={sizeStyle(fs, `${itemBase}.label`)}
                              >
                                {item.label}
                              </p>
                              <p
                                className="mt-1 text-sm leading-relaxed text-ink-soft"
                                style={sizeStyle(fs, `${itemBase}.description`)}
                              >
                                {item.description}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </section>
      );
    })()
  );

  const synergyBlock = (
    <section key="synergy" className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <Reveal className="border border-blue-600/30 bg-blue-100 p-8 sm:p-10">
        <p className="kicker text-navy-800">Synergie CFConsulting</p>
        <p
          className="mt-4 text-base leading-relaxed text-navy-900"
          style={sizeStyle(fs, `${base}.synergy`)}
        >
          {entity.synergy}
        </p>
      </Reveal>
    </section>
  );

  const fixedSections: Record<string, React.ReactNode> = {
    groups: groupsBlock,
    synergy: synergyBlock,
  };

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-8 pb-6 lg:px-8 lg:pt-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="numeral text-lg text-cream">{entity.number}</span>
            <span className="h-px flex-1 bg-hairline" />
            <span className="kicker text-ink-soft" style={sizeStyle(fs, `${base}.kicker`)}>
              {entity.kicker}
            </span>
          </div>
          <h1
            className="font-display mt-4 text-3xl leading-tight text-navy-950 sm:text-4xl"
            style={sizeStyle(fs, `${base}.name`)}
          >
            {entity.name}
          </h1>
          <p
            className="mt-2 text-base font-medium text-blue-600"
            style={sizeStyle(fs, `${base}.tagline`)}
          >
            {entity.tagline}
          </p>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft"
            style={sizeStyle(fs, `${base}.description`)}
          >
            {entity.description}
          </p>
        </Reveal>
      </section>

      {entity.sectionOrder.map((entry) => {
        if (entry.kind === "fixed") {
          return <Fragment key={entry.key}>{fixedSections[entry.key]}</Fragment>;
        }
        const section = entity.sections.find((s) => s.id === entry.id);
        if (!section) return null;
        return (
          <CustomSections
            key={entry.id}
            sections={[section]}
            fieldSizes={fs}
            keyPrefix={`${base}.sections`}
          />
        );
      })}

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
