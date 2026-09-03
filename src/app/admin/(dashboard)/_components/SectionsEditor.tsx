"use client";

import type { CustomSection } from "@/lib/content-types";
import { Field, TextAreaField, SectionCard } from "./FormControls";
import { MediaUpload } from "./MediaUpload";

function newSection(): CustomSection {
  return {
    id: crypto.randomUUID(),
    title: "Nouvelle section",
    text: "",
    image: null,
    video: null,
    mediaPosition: "right",
  };
}

export function SectionsEditor({
  sections,
  onChange,
  keyPrefix,
  sizeOf,
  onSizeChange,
}: {
  sections: CustomSection[];
  onChange: (next: CustomSection[]) => void;
  keyPrefix: string;
  sizeOf: (key: string) => number | undefined;
  onSizeChange: (key: string, v: number | null) => void;
}) {
  function update(id: string, patch: Partial<CustomSection>) {
    onChange(sections.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function remove(id: string) {
    onChange(sections.filter((s) => s.id !== id));
  }

  function move(id: string, dir: -1 | 1) {
    const idx = sections.findIndex((s) => s.id === id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sections.length) return;
    const next = [...sections];
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    onChange(next);
  }

  function add() {
    onChange([...sections, newSection()]);
  }

  return (
    <div className="space-y-6">
      {sections.map((section, i) => (
        <SectionCard key={section.id} title={`Section personnalisée ${i + 1}`}>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => move(section.id, -1)}
              disabled={i === 0}
              className="rounded border border-hairline px-2 py-1 text-xs text-ink-soft disabled:opacity-30"
            >
              ↑ Monter
            </button>
            <button
              type="button"
              onClick={() => move(section.id, 1)}
              disabled={i === sections.length - 1}
              className="rounded border border-hairline px-2 py-1 text-xs text-ink-soft disabled:opacity-30"
            >
              ↓ Descendre
            </button>
            <button
              type="button"
              onClick={() => remove(section.id)}
              className="ml-auto text-xs text-ink-soft hover:text-red-600"
            >
              Supprimer cette section
            </button>
          </div>

          <Field
            label="Titre"
            value={section.title}
            onChange={(v) => update(section.id, { title: v })}
            sizeRem={sizeOf(`${keyPrefix}.${section.id}.title`)}
            onSizeChange={(v) => onSizeChange(`${keyPrefix}.${section.id}.title`, v)}
          />
          <TextAreaField
            label="Texte"
            value={section.text}
            onChange={(v) => update(section.id, { text: v })}
            rows={4}
            sizeRem={sizeOf(`${keyPrefix}.${section.id}.text`)}
            onSizeChange={(v) => onSizeChange(`${keyPrefix}.${section.id}.text`, v)}
          />
          <label className="block">
            <span className="text-sm font-medium text-navy-900">Position du média</span>
            <select
              value={section.mediaPosition}
              onChange={(e) =>
                update(section.id, { mediaPosition: e.target.value as "left" | "right" })
              }
              className="mt-1.5 rounded-lg border border-hairline bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-blue-600 focus:outline-none"
            >
              <option value="right">À droite du texte</option>
              <option value="left">À gauche du texte</option>
            </select>
          </label>
          <MediaUpload
            label="Image ou vidéo"
            imageUrl={section.image}
            videoUrl={section.video}
            onChange={({ image, video }) => update(section.id, { image, video })}
          />
        </SectionCard>
      ))}

      <button
        type="button"
        onClick={add}
        className="rounded-full border border-navy-900 px-4 py-2 text-xs font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-paper"
      >
        + Ajouter une section
      </button>
    </div>
  );
}
