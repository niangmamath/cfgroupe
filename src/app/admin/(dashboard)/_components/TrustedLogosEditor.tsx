"use client";

import { useRef, useState } from "react";
import type { TrustedLogo } from "@/lib/content-types";
import { Field } from "./FormControls";

export function TrustedLogosEditor({
  title,
  onTitleChange,
  logos,
  onLogosChange,
}: {
  title: string;
  onTitleChange: (v: string) => void;
  logos: TrustedLogo[];
  onLogosChange: (next: TrustedLogo[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'upload.");
      onLogosChange([
        ...logos,
        { id: crypto.randomUUID(), image: data.url, alt: file.name.replace(/\.[^.]+$/, "") },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setUploading(false);
    }
  }

  function update(id: string, patch: Partial<TrustedLogo>) {
    onLogosChange(logos.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function remove(id: string) {
    onLogosChange(logos.filter((l) => l.id !== id));
  }

  function move(id: string, dir: -1 | 1) {
    const idx = logos.findIndex((l) => l.id === id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= logos.length) return;
    const next = [...logos];
    [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
    onLogosChange(next);
  }

  return (
    <div className="space-y-4">
      <Field label="Titre" value={title} onChange={onTitleChange} />

      <div className="space-y-3">
        {logos.map((logo, i) => (
          <div key={logo.id} className="flex items-center gap-3 rounded-lg border border-hairline p-3">
            <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded border border-hairline bg-paper-dim">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.image} alt={logo.alt} className="max-h-10 max-w-20 object-contain" />
            </div>
            <div className="flex-1">
              <Field
                label="Texte alternatif (nom du partenaire)"
                value={logo.alt}
                onChange={(v) => update(logo.id, { alt: v })}
              />
            </div>
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                onClick={() => move(logo.id, -1)}
                disabled={i === 0}
                className="rounded border border-hairline px-2 py-1 text-xs text-ink-soft disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(logo.id, 1)}
                disabled={i === logos.length - 1}
                className="rounded border border-hairline px-2 py-1 text-xs text-ink-soft disabled:opacity-30"
              >
                ↓
              </button>
            </div>
            <button
              type="button"
              onClick={() => remove(logo.id)}
              className="shrink-0 text-xs text-ink-soft hover:text-red-600"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-full border border-navy-900 px-4 py-2 text-xs font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-paper disabled:opacity-50"
      >
        {uploading ? "Envoi..." : "+ Ajouter un logo"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
