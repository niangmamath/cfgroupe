"use client";

import { useRef, useState } from "react";
import type { PresenceLocation } from "@/lib/content-types";
import { Field } from "./FormControls";
import { MediaUpload } from "./MediaUpload";

const PIN_COLORS = ["#12224a", "#5ec8ce", "#2f7fd1", "#8fc4bb", "#c65b3f", "#7a5cc6"];

function newLocation(index: number): PresenceLocation {
  return {
    id: crypto.randomUUID(),
    city: "Nouvelle ville",
    year: new Date().getFullYear().toString(),
    xPercent: 50,
    yPercent: 50,
    color: PIN_COLORS[index % PIN_COLORS.length],
  };
}

export function PresenceMapEditor({
  title,
  onTitleChange,
  backgroundImage,
  onBackgroundChange,
  locations,
  onLocationsChange,
}: {
  title: string;
  onTitleChange: (v: string) => void;
  backgroundImage: string | null;
  onBackgroundChange: (url: string | null) => void;
  locations: PresenceLocation[];
  onLocationsChange: (next: PresenceLocation[]) => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  function update(id: string, patch: Partial<PresenceLocation>) {
    onLocationsChange(locations.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function remove(id: string) {
    onLocationsChange(locations.filter((l) => l.id !== id));
    if (activeId === id) setActiveId(null);
  }

  function add() {
    const loc = newLocation(locations.length);
    onLocationsChange([...locations, loc]);
    setActiveId(loc.id);
  }

  function handleMapClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!activeId || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    update(activeId, {
      xPercent: Math.round(xPercent * 10) / 10,
      yPercent: Math.round(yPercent * 10) / 10,
    });
  }

  return (
    <div className="space-y-4">
      <Field label="Titre" value={title} onChange={onTitleChange} />

      <MediaUpload
        label="Image de la carte du monde"
        imageUrl={backgroundImage}
        videoUrl={null}
        onChange={({ image }) => onBackgroundChange(image)}
      />

      {backgroundImage && (
        <div>
          <p className="text-xs text-ink-soft">
            Sélectionne une ville ci-dessous puis clique sur la carte pour
            positionner son repère.
          </p>
          <div
            className="relative mt-2 w-full max-w-xl cursor-crosshair overflow-hidden rounded-lg border border-hairline"
            onClick={handleMapClick}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={backgroundImage} alt="" className="block w-full select-none" />
            {locations.map((loc) => (
              <button
                type="button"
                key={loc.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveId(loc.id);
                }}
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
                style={{
                  left: `${loc.xPercent}%`,
                  top: `${loc.yPercent}%`,
                  backgroundColor: loc.color,
                  outline: activeId === loc.id ? "2px solid black" : "none",
                  outlineOffset: 2,
                }}
                title={loc.city}
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {locations.map((loc) => (
          <div
            key={loc.id}
            onClick={() => setActiveId(loc.id)}
            className={`cursor-pointer rounded-lg border p-3 ${
              activeId === loc.id ? "border-navy-900" : "border-hairline"
            }`}
          >
            <div className="grid grid-cols-[1fr_auto_auto] items-end gap-3">
              <Field
                label="Ville"
                value={loc.city}
                onChange={(v) => update(loc.id, { city: v })}
              />
              <div className="w-24">
                <Field label="Année" value={loc.year} onChange={(v) => update(loc.id, { year: v })} />
              </div>
              <label className="block">
                <span className="text-sm font-medium text-navy-900">Couleur</span>
                <input
                  type="color"
                  value={loc.color}
                  onChange={(e) => update(loc.id, { color: e.target.value })}
                  className="mt-1.5 h-[42px] w-14 cursor-pointer rounded border border-hairline"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                remove(loc.id);
              }}
              className="mt-2 text-xs text-ink-soft hover:text-red-600"
            >
              Supprimer cette ville
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="rounded-full border border-navy-900 px-4 py-2 text-xs font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-paper"
      >
        + Ajouter une ville
      </button>
    </div>
  );
}
