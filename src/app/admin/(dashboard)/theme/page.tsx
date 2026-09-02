"use client";

import { useEffect, useState } from "react";
import type { SiteTheme } from "@/lib/content-types";
import { SectionCard, SaveBar } from "../_components/FormControls";

const COLOR_LABELS: { key: keyof SiteTheme["colors"]; label: string }[] = [
  { key: "paper", label: "Papier (fond principal)" },
  { key: "paperDim", label: "Papier atténué" },
  { key: "ink", label: "Encre (texte principal)" },
  { key: "inkSoft", label: "Encre atténuée (texte secondaire)" },
  { key: "black", label: "Noir" },
  { key: "navy950", label: "Marine 950 (le plus foncé)" },
  { key: "navy900", label: "Marine 900" },
  { key: "navy800", label: "Marine 800" },
  { key: "navy700", label: "Marine 700" },
  { key: "blue600", label: "Bleu (accents, liens)" },
  { key: "blue100", label: "Bleu clair" },
  { key: "cream", label: "Crème" },
  { key: "creamDim", label: "Crème atténuée" },
  { key: "contactBlue", label: "Bleu de contact" },
];

export default function AdminThemePage() {
  const [theme, setTheme] = useState<SiteTheme | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/admin/theme")
      .then((r) => r.json())
      .then(setTheme);
  }, []);

  async function handleSave() {
    if (!theme) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(theme),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  if (!theme) {
    return <p className="text-ink-soft">Chargement...</p>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-navy-950">Thème & couleurs</h1>
      <p className="mt-2 text-ink-soft">
        Ces couleurs sont utilisées dans tout le site. L&apos;échelle
        ci-dessous ajuste la taille de tous les textes en même temps ; pour
        régler la taille d&apos;un texte précis indépendamment des autres,
        utilise le champ &laquo; rem &raquo; à côté de ce texte dans
        &laquo; Contenu des sections &raquo; ou &laquo; Pôles &raquo;.
      </p>

      <div className="mt-8 space-y-6">
        <SectionCard title="Taille du texte">
          <label className="block">
            <span className="text-sm font-medium text-navy-900">
              Échelle globale — {Math.round(theme.typography.scale * 100)}%
            </span>
            <input
              type="range"
              min={0.8}
              max={1.3}
              step={0.01}
              value={theme.typography.scale}
              onChange={(e) =>
                setTheme({
                  ...theme,
                  typography: { ...theme.typography, scale: parseFloat(e.target.value) },
                })
              }
              className="mt-2 w-full"
            />
            <p className="mt-1 text-xs text-ink-soft">
              Augmente ou diminue la taille de tous les textes du site (titres,
              paragraphes, boutons) proportionnellement.
            </p>
          </label>
        </SectionCard>

        <SectionCard title="Palette de couleurs">
          <div className="grid gap-4 sm:grid-cols-2">
            {COLOR_LABELS.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.colors[key]}
                  onChange={(e) =>
                    setTheme({
                      ...theme,
                      colors: { ...theme.colors, [key]: e.target.value },
                    })
                  }
                  className="h-10 w-14 shrink-0 cursor-pointer rounded border border-hairline"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy-900">{label}</p>
                  <p className="truncate text-xs text-ink-soft">{theme.colors[key]}</p>
                </div>
              </label>
            ))}
          </div>
        </SectionCard>
      </div>

      <SaveBar onSave={handleSave} saving={saving} status={status} />
    </div>
  );
}
