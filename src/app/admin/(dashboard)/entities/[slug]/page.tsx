"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { SiteContent, SiteTheme, Entity, Group, Pole } from "@/lib/content-types";
import { Field, TextAreaField, SectionCard, SaveBar } from "../../_components/FormControls";
import { SectionsEditor } from "../../_components/SectionsEditor";

export default function AdminEntityEditPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [theme, setTheme] = useState<SiteTheme | null>(null);
  const [entity, setEntity] = useState<Entity | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content").then((r) => r.json()),
      fetch("/api/admin/theme").then((r) => r.json()),
    ]).then(([data, themeData]: [SiteContent, SiteTheme]) => {
      setContent(data);
      setTheme(themeData);
      const found = data.entities.find((e) => e.slug === slug);
      if (!found) {
        router.replace("/admin/entities");
        return;
      }
      setEntity(found);
    });
  }, [slug, router]);

  function sizeOf(key: string) {
    return theme?.typography.fieldSizes[key];
  }

  function setSize(key: string, v: number | null) {
    setTheme((prev) => {
      if (!prev) return prev;
      const fieldSizes = { ...prev.typography.fieldSizes };
      if (v == null) delete fieldSizes[key];
      else fieldSizes[key] = v;
      return { ...prev, typography: { ...prev.typography, fieldSizes } };
    });
  }

  function updateEntity(patch: Partial<Entity>) {
    setEntity((prev) => (prev ? { ...prev, ...patch } : prev));
  }

  function updateGroup(index: number, patch: Partial<Group>) {
    setEntity((prev) => {
      if (!prev) return prev;
      const groups = prev.groups.map((g, i) => (i === index ? { ...g, ...patch } : g));
      return { ...prev, groups };
    });
  }

  function addGroup() {
    setEntity((prev) =>
      prev ? { ...prev, groups: [...prev.groups, { title: "Nouveau groupe", items: [] }] } : prev
    );
  }

  function removeGroup(index: number) {
    setEntity((prev) =>
      prev ? { ...prev, groups: prev.groups.filter((_, i) => i !== index) } : prev
    );
  }

  function updateItem(groupIndex: number, itemIndex: number, patch: { label?: string; description?: string }) {
    setEntity((prev) => {
      if (!prev) return prev;
      const groups = prev.groups.map((g, gi) => {
        if (gi !== groupIndex) return g;
        const items = g.items.map((it, ii) => (ii === itemIndex ? { ...it, ...patch } : it));
        return { ...g, items };
      });
      return { ...prev, groups };
    });
  }

  function addItem(groupIndex: number) {
    setEntity((prev) => {
      if (!prev) return prev;
      const groups = prev.groups.map((g, gi) =>
        gi === groupIndex ? { ...g, items: [...g.items, { label: "Nouvel élément", description: "" }] } : g
      );
      return { ...prev, groups };
    });
  }

  function removeItem(groupIndex: number, itemIndex: number) {
    setEntity((prev) => {
      if (!prev) return prev;
      const groups = prev.groups.map((g, gi) =>
        gi === groupIndex ? { ...g, items: g.items.filter((_, ii) => ii !== itemIndex) } : g
      );
      return { ...prev, groups };
    });
  }

  function updatePole(index: number, patch: Partial<Pole>) {
    setEntity((prev) => {
      if (!prev || !prev.poles) return prev;
      const poles = prev.poles.map((p, i) => (i === index ? { ...p, ...patch } : p));
      return { ...prev, poles };
    });
  }

  function addPole() {
    setEntity((prev) =>
      prev
        ? { ...prev, poles: [...(prev.poles ?? []), { name: "Nouveau pôle", description: "" }] }
        : prev
    );
  }

  function removePole(index: number) {
    setEntity((prev) =>
      prev && prev.poles ? { ...prev, poles: prev.poles.filter((_, i) => i !== index) } : prev
    );
  }

  async function handleSave() {
    if (!content || !entity || !theme) return;
    setSaving(true);
    try {
      const nextContent: SiteContent = {
        ...content,
        entities: content.entities.map((e) => (e.slug === entity.slug ? entity : e)),
      };
      const [res1, res2] = await Promise.all([
        fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nextContent),
        }),
        fetch("/api/admin/theme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(theme),
        }),
      ]);
      if (!res1.ok || !res2.ok) throw new Error();
      setContent(nextContent);
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  if (!entity || !theme) {
    return <p className="text-ink-soft">Chargement...</p>;
  }

  const base = `entities.${entity.slug}`;

  return (
    <div>
      <h1 className="font-display text-3xl text-navy-950">{entity.name}</h1>
      <p className="mt-2 text-ink-soft">Pôle {entity.number}</p>

      <div className="mt-8 space-y-6">
        <SectionCard title="Informations générales">
          <Field
            label="Nom"
            value={entity.name}
            onChange={(v) => updateEntity({ name: v })}
            sizeRem={sizeOf(`${base}.name`)}
            onSizeChange={(v) => setSize(`${base}.name`, v)}
          />
          <Field
            label="Description courte (carte)"
            value={entity.short}
            onChange={(v) => updateEntity({ short: v })}
            sizeRem={sizeOf(`${base}.short`)}
            onSizeChange={(v) => setSize(`${base}.short`, v)}
          />
          <Field
            label="Accroche (tagline)"
            value={entity.tagline}
            onChange={(v) => updateEntity({ tagline: v })}
            sizeRem={sizeOf(`${base}.tagline`)}
            onSizeChange={(v) => setSize(`${base}.tagline`, v)}
          />
          <Field
            label="Petit label"
            value={entity.kicker}
            onChange={(v) => updateEntity({ kicker: v })}
            sizeRem={sizeOf(`${base}.kicker`)}
            onSizeChange={(v) => setSize(`${base}.kicker`, v)}
          />
          <TextAreaField
            label="Description complète"
            value={entity.description}
            onChange={(v) => updateEntity({ description: v })}
            rows={4}
            sizeRem={sizeOf(`${base}.description`)}
            onSizeChange={(v) => setSize(`${base}.description`, v)}
          />
          <TextAreaField
            label="Synergie avec les autres pôles"
            value={entity.synergy}
            onChange={(v) => updateEntity({ synergy: v })}
            sizeRem={sizeOf(`${base}.synergy`)}
            onSizeChange={(v) => setSize(`${base}.synergy`, v)}
          />
          <Field
            label="Libellé de la section des groupes"
            value={entity.groupsLabel}
            onChange={(v) => updateEntity({ groupsLabel: v })}
            sizeRem={sizeOf(`${base}.groupsLabel`)}
            onSizeChange={(v) => setSize(`${base}.groupsLabel`, v)}
          />
        </SectionCard>

        {entity.groups.map((group, groupIndex) => {
          const groupBase = `${base}.groups.${groupIndex}`;
          return (
            <SectionCard key={groupIndex} title={`Groupe ${groupIndex + 1}`}>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <Field
                    label="Titre du groupe"
                    value={group.title}
                    onChange={(v) => updateGroup(groupIndex, { title: v })}
                    sizeRem={sizeOf(`${groupBase}.title`)}
                    onSizeChange={(v) => setSize(`${groupBase}.title`, v)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGroup(groupIndex)}
                  className="mb-0.5 shrink-0 text-xs text-ink-soft hover:text-red-600"
                >
                  Supprimer le groupe
                </button>
              </div>

              <div className="space-y-3 border-t border-hairline pt-4">
                {group.items.map((item, itemIndex) => {
                  const itemBase = `${groupBase}.items.${itemIndex}`;
                  return (
                    <div key={itemIndex} className="rounded-lg border border-hairline p-3">
                      <div className="flex items-end gap-3">
                        <div className="flex-1">
                          <Field
                            label="Libellé"
                            value={item.label}
                            onChange={(v) => updateItem(groupIndex, itemIndex, { label: v })}
                            sizeRem={sizeOf(`${itemBase}.label`)}
                            onSizeChange={(v) => setSize(`${itemBase}.label`, v)}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(groupIndex, itemIndex)}
                          className="mb-0.5 shrink-0 text-xs text-ink-soft hover:text-red-600"
                        >
                          Retirer
                        </button>
                      </div>
                      <div className="mt-3">
                        <TextAreaField
                          label="Description"
                          value={item.description}
                          onChange={(v) => updateItem(groupIndex, itemIndex, { description: v })}
                          rows={2}
                          sizeRem={sizeOf(`${itemBase}.description`)}
                          onSizeChange={(v) => setSize(`${itemBase}.description`, v)}
                        />
                      </div>
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={() => addItem(groupIndex)}
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  + Ajouter un élément
                </button>
              </div>
            </SectionCard>
          );
        })}

        <button
          type="button"
          onClick={addGroup}
          className="rounded-full border border-navy-900 px-4 py-2 text-xs font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-paper"
        >
          + Ajouter un groupe
        </button>

        {entity.poles && (
          <SectionCard title="Pôles internes (spécifique à ce pôle)">
            <div className="space-y-3">
              {entity.poles.map((pole, index) => {
                const poleBase = `${base}.poles.${index}`;
                return (
                  <div key={index} className="rounded-lg border border-hairline p-3">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <Field
                          label="Nom"
                          value={pole.name}
                          onChange={(v) => updatePole(index, { name: v })}
                          sizeRem={sizeOf(`${poleBase}.name`)}
                          onSizeChange={(v) => setSize(`${poleBase}.name`, v)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePole(index)}
                        className="mb-0.5 shrink-0 text-xs text-ink-soft hover:text-red-600"
                      >
                        Retirer
                      </button>
                    </div>
                    <div className="mt-3">
                      <TextAreaField
                        label="Description"
                        value={pole.description}
                        onChange={(v) => updatePole(index, { description: v })}
                        rows={2}
                        sizeRem={sizeOf(`${poleBase}.description`)}
                        onSizeChange={(v) => setSize(`${poleBase}.description`, v)}
                      />
                    </div>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addPole}
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                + Ajouter un pôle interne
              </button>
            </div>
          </SectionCard>
        )}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl text-navy-950">
          Sections personnalisées (page de ce pôle)
        </h2>
        <p className="mt-2 text-ink-soft">
          S&apos;affichent sur la page &laquo; {entity.name} &raquo;, après la
          synergie et avant la navigation précédent/suivant.
        </p>
        <div className="mt-6">
          <SectionsEditor
            sections={entity.sections}
            onChange={(next) => updateEntity({ sections: next })}
            keyPrefix={`${base}.sections`}
            sizeOf={sizeOf}
            onSizeChange={setSize}
          />
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} status={status} />
    </div>
  );
}
