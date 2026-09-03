"use client";

import type { SectionOrderEntry, CustomSection } from "@/lib/content-types";

const FIXED_LABELS: Record<string, string> = {
  hero: "Héro",
  poles: "Nos pôles",
  filConducteur: "Le fil conducteur",
  contact: "Contact",
  groups: "Groupes / pôles internes",
  synergy: "Synergie",
};

function entryKey(entry: SectionOrderEntry) {
  return entry.kind === "fixed" ? `fixed:${entry.key}` : `custom:${entry.id}`;
}

export function SectionOrderEditor({
  order,
  customSections,
  onChange,
}: {
  order: SectionOrderEntry[];
  customSections: CustomSection[];
  onChange: (next: SectionOrderEntry[]) => void;
}) {
  function labelFor(entry: SectionOrderEntry) {
    if (entry.kind === "fixed") return FIXED_LABELS[entry.key] ?? entry.key;
    const section = customSections.find((s) => s.id === entry.id);
    return section?.title?.trim() || "Section personnalisée (sans titre)";
  }

  function move(index: number, dir: -1 | 1) {
    const swapIdx = index + dir;
    if (swapIdx < 0 || swapIdx >= order.length) return;
    const next = [...order];
    [next[index], next[swapIdx]] = [next[swapIdx], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {order.map((entry, i) => (
        <div
          key={entryKey(entry)}
          className="flex items-center justify-between rounded-lg border border-hairline bg-paper px-4 py-3"
        >
          <span className="text-sm font-medium text-navy-900">{labelFor(entry)}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="rounded border border-hairline px-2 py-1 text-xs text-ink-soft disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === order.length - 1}
              className="rounded border border-hairline px-2 py-1 text-xs text-ink-soft disabled:opacity-30"
            >
              ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
