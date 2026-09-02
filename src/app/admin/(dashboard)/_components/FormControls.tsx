"use client";

function SizeControl({
  value,
  onChange,
}: {
  value?: number;
  onChange: (v: number | null) => void;
}) {
  return (
    <span className="flex shrink-0 items-center gap-1 text-xs text-ink-soft">
      <input
        type="number"
        step={0.05}
        min={0.5}
        max={8}
        value={value ?? ""}
        placeholder="auto"
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? null : parseFloat(v));
        }}
        className="w-16 rounded border border-hairline bg-paper px-1.5 py-0.5 text-xs text-ink focus:border-blue-600 focus:outline-none"
      />
      <span>rem</span>
      {value != null && (
        <button
          type="button"
          onClick={() => onChange(null)}
          title="Réinitialiser la taille"
          className="text-ink-soft hover:text-red-600"
        >
          ×
        </button>
      )}
    </span>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  sizeRem,
  onSizeChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  sizeRem?: number;
  onSizeChange?: (v: number | null) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-navy-900">{label}</span>
        {onSizeChange && <SizeControl value={sizeRem} onChange={onSizeChange} />}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-hairline bg-paper px-3.5 py-2.5 text-sm text-ink focus:border-blue-600 focus:outline-none"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  sizeRem,
  onSizeChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  sizeRem?: number;
  onSizeChange?: (v: number | null) => void;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-navy-900">{label}</span>
        {onSizeChange && <SizeControl value={sizeRem} onChange={onSizeChange} />}
      </div>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-hairline bg-paper px-3.5 py-2.5 text-sm leading-relaxed text-ink focus:border-blue-600 focus:outline-none"
      />
    </label>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-hairline bg-paper p-6 shadow-sm">
      <h2 className="font-display text-xl text-navy-950">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

export function SaveBar({
  onSave,
  saving,
  status,
}: {
  onSave: () => void;
  saving: boolean;
  status: "idle" | "saved" | "error";
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-8 flex items-center justify-between gap-4 rounded-xl border border-hairline bg-navy-950 px-5 py-3.5 shadow-lg">
      <p className="text-sm text-paper/70">
        {status === "saved" && "Modifications enregistrées."}
        {status === "error" && (
          <span className="text-red-400">Échec de l&apos;enregistrement.</span>
        )}
        {status === "idle" && "Modifications non enregistrées."}
      </p>
      <button
        onClick={onSave}
        disabled={saving}
        className="rounded-full bg-paper px-6 py-2.5 text-sm font-medium tracking-wide text-navy-950 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Enregistrement..." : "Enregistrer"}
      </button>
    </div>
  );
}
