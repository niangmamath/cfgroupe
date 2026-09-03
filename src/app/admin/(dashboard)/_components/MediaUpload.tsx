"use client";

import { useRef, useState } from "react";

export function MediaUpload({
  label,
  imageUrl,
  videoUrl,
  onChange,
  published,
  onPublishedChange,
}: {
  label: string;
  imageUrl: string | null;
  videoUrl: string | null;
  onChange: (next: { image: string | null; video: string | null }) => void;
  published?: boolean;
  onPublishedChange?: (v: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasMedia = Boolean(imageUrl || videoUrl);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Échec de l'upload.");
      const isVideo = (data.contentType as string)?.startsWith("video/");
      if (isVideo) {
        onChange({ image: null, video: data.url });
      } else {
        onChange({ image: data.url, video: null });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="text-sm font-medium text-navy-900">{label}</span>

      <div className="mt-2 flex items-center gap-4">
        <div
          className={`flex h-24 w-40 items-center justify-center overflow-hidden rounded-lg border border-hairline bg-paper-dim ${
            hasMedia && published === false ? "opacity-40" : ""
          }`}
        >
          {videoUrl ? (
            <video src={videoUrl} className="h-full w-full object-cover" muted />
          ) : imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-ink-soft">Aucun média</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-full border border-navy-900 px-4 py-2 text-xs font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-paper disabled:opacity-50"
          >
            {uploading ? "Envoi..." : "Choisir un fichier"}
          </button>
          {hasMedia && (
            <button
              type="button"
              onClick={() => onChange({ image: null, video: null })}
              className="text-xs text-ink-soft hover:text-red-600"
            >
              Retirer le média
            </button>
          )}
          {hasMedia && onPublishedChange && (
            <label className="flex items-center gap-1.5 text-xs text-ink-soft">
              <input
                type="checkbox"
                checked={published !== false}
                onChange={(e) => onPublishedChange(e.target.checked)}
              />
              {published === false ? "Masqué sur le site" : "Publié sur le site"}
            </label>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
