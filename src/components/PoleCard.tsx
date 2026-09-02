import Link from "next/link";
import {
  Compass,
  Cpu,
  LineChart,
  Layers,
  type LucideIcon,
} from "lucide-react";
import type { Entity } from "@/lib/entities";

const icons: Record<string, LucideIcon> = {
  cfconsulting: Compass,
  cfsolutions: Cpu,
  cfsoft: LineChart,
  cftech: Layers,
};

function listFor(entity: Entity): string[] {
  if (entity.poles) return entity.poles.map((p) => p.name);
  return entity.groups[0]?.items.map((item) => item.label) ?? [];
}

export default function PoleCard({ entity }: { entity: Entity }) {
  const Icon = icons[entity.slug] ?? Compass;
  const items = listFor(entity);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950">
      <div className="flex flex-1 flex-col p-8 sm:p-9">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-navy-700">
          <Icon className="h-6 w-6 text-paper" strokeWidth={1.75} />
        </div>

        <h3 className="font-display mt-6 text-2xl text-paper">
          {entity.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-blue-200">
          {entity.tagline}
        </p>

        <ul className="mt-6 flex-1 space-y-3">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-paper/80">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cream" />
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={`/poles/${entity.slug}`}
          className="mt-8 block rounded-lg bg-gradient-to-r from-navy-700 to-blue-600 py-3 text-center text-sm font-medium tracking-wide text-paper transition-opacity hover:opacity-90"
        >
          En savoir plus
        </Link>
      </div>

      <div className="border-t border-hairline-dark bg-black/25 px-8 py-3 text-center">
        <span className="kicker text-blue-200">{entity.kicker}</span>
      </div>
    </div>
  );
}
