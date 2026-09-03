"use client";

import { useEffect, useState } from "react";
import type { SiteContent, SiteTheme } from "@/lib/content-types";
import { Field, TextAreaField, SectionCard, SaveBar } from "../_components/FormControls";
import { MediaUpload } from "../_components/MediaUpload";
import { SectionsEditor } from "../_components/SectionsEditor";
import { SectionOrderEditor } from "../_components/SectionOrderEditor";
import { PresenceMapEditor } from "../_components/PresenceMapEditor";
import { TrustedLogosEditor } from "../_components/TrustedLogosEditor";
import type { CustomSection } from "@/lib/content-types";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [theme, setTheme] = useState<SiteTheme | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content").then((r) => r.json()),
      fetch("/api/admin/theme").then((r) => r.json()),
    ]).then(([c, t]) => {
      setContent(c);
      setTheme(t);
    });
  }, []);

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

  function updateHomeSections(nextSections: CustomSection[]) {
    setContent((prev) => {
      if (!prev) return prev;
      const prevIds = new Set(prev.homeSections.map((s) => s.id));
      const nextIds = new Set(nextSections.map((s) => s.id));
      let order = prev.homeSectionOrder.filter(
        (e) => e.kind !== "custom" || nextIds.has(e.id)
      );
      for (const s of nextSections) {
        if (!prevIds.has(s.id)) {
          const contactIdx = order.findIndex(
            (e) => e.kind === "fixed" && e.key === "contact"
          );
          const entry = { kind: "custom" as const, id: s.id };
          order =
            contactIdx >= 0
              ? [...order.slice(0, contactIdx), entry, ...order.slice(contactIdx)]
              : [...order, entry];
        }
      }
      return { ...prev, homeSections: nextSections, homeSectionOrder: order };
    });
  }

  async function handleSave() {
    if (!content || !theme) return;
    setSaving(true);
    try {
      const [res1, res2] = await Promise.all([
        fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(content),
        }),
        fetch("/api/admin/theme", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(theme),
        }),
      ]);
      if (!res1.ok || !res2.ok) throw new Error();
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  if (!content || !theme) {
    return <p className="text-ink-soft">Chargement...</p>;
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-navy-950">Contenu des sections</h1>
      <p className="mt-2 text-ink-soft">
        Textes affichés sur la page d&apos;accueil. Les 4 pôles se modifient
        séparément dans la section &laquo; Pôles &raquo;. Le champ &laquo;
        rem &raquo; à côté de chaque texte règle sa taille indépendamment
        (laisser vide pour la taille par défaut).
      </p>

      <div className="mt-8">
        <h2 className="font-display text-2xl text-navy-950">Ordre des sections</h2>
        <p className="mt-2 text-ink-soft">
          L&apos;ordre d&apos;affichage des sections sur la page d&apos;accueil.
        </p>
        <div className="mt-4">
          <SectionOrderEditor
            order={content.homeSectionOrder}
            customSections={content.homeSections}
            onChange={(next) => setContent({ ...content, homeSectionOrder: next })}
          />
        </div>
      </div>

      <div className="mt-10 space-y-6">
        <SectionCard title="Héro">
          <Field
            label="Titre (partie 1)"
            value={content.hero.titleMain}
            onChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, titleMain: v } })
            }
            sizeRem={sizeOf("hero.titleMain")}
            onSizeChange={(v) => setSize("hero.titleMain", v)}
          />
          <Field
            label="Titre (partie accentuée, en italique)"
            value={content.hero.titleAccent}
            onChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, titleAccent: v } })
            }
            sizeRem={sizeOf("hero.titleAccent")}
            onSizeChange={(v) => setSize("hero.titleAccent", v)}
          />
          <TextAreaField
            label="Sous-titre"
            value={content.hero.subtitle}
            onChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, subtitle: v } })
            }
            sizeRem={sizeOf("hero.subtitle")}
            onSizeChange={(v) => setSize("hero.subtitle", v)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Bouton principal"
              value={content.hero.ctaPrimaryLabel}
              onChange={(v) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, ctaPrimaryLabel: v },
                })
              }
              sizeRem={sizeOf("hero.ctaPrimaryLabel")}
              onSizeChange={(v) => setSize("hero.ctaPrimaryLabel", v)}
            />
            <Field
              label="Bouton secondaire"
              value={content.hero.ctaSecondaryLabel}
              onChange={(v) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, ctaSecondaryLabel: v },
                })
              }
              sizeRem={sizeOf("hero.ctaSecondaryLabel")}
              onSizeChange={(v) => setSize("hero.ctaSecondaryLabel", v)}
            />
          </div>
          <MediaUpload
            label="Image ou vidéo de fond (facultatif — sinon fond bleu marine uni)"
            imageUrl={content.hero.backgroundImage}
            videoUrl={content.hero.backgroundVideo}
            onChange={({ image, video }) =>
              setContent({
                ...content,
                hero: {
                  ...content.hero,
                  backgroundImage: image,
                  backgroundVideo: video,
                },
              })
            }
            published={content.hero.mediaPublished}
            onPublishedChange={(v) =>
              setContent({ ...content, hero: { ...content.hero, mediaPublished: v } })
            }
          />
        </SectionCard>

        <SectionCard title="Section « Nos pôles »">
          <Field
            label="Petit label"
            value={content.polesSection.kicker}
            onChange={(v) =>
              setContent({
                ...content,
                polesSection: { ...content.polesSection, kicker: v },
              })
            }
            sizeRem={sizeOf("polesSection.kicker")}
            onSizeChange={(v) => setSize("polesSection.kicker", v)}
          />
          <Field
            label="Titre"
            value={content.polesSection.title}
            onChange={(v) =>
              setContent({
                ...content,
                polesSection: { ...content.polesSection, title: v },
              })
            }
            sizeRem={sizeOf("polesSection.title")}
            onSizeChange={(v) => setSize("polesSection.title", v)}
          />
        </SectionCard>

        <SectionCard title="Le fil conducteur">
          <Field
            label="Petit label"
            value={content.filConducteur.kicker}
            onChange={(v) =>
              setContent({
                ...content,
                filConducteur: { ...content.filConducteur, kicker: v },
              })
            }
            sizeRem={sizeOf("filConducteur.kicker")}
            onSizeChange={(v) => setSize("filConducteur.kicker", v)}
          />
          <TextAreaField
            label="Citation"
            value={content.filConducteur.quote}
            onChange={(v) =>
              setContent({
                ...content,
                filConducteur: { ...content.filConducteur, quote: v },
              })
            }
            sizeRem={sizeOf("filConducteur.quote")}
            onSizeChange={(v) => setSize("filConducteur.quote", v)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Exemple A — titre"
              value={content.filConducteur.caseALabel}
              onChange={(v) =>
                setContent({
                  ...content,
                  filConducteur: { ...content.filConducteur, caseALabel: v },
                })
              }
              sizeRem={sizeOf("filConducteur.caseALabel")}
              onSizeChange={(v) => setSize("filConducteur.caseALabel", v)}
            />
            <Field
              label="Exemple B — titre"
              value={content.filConducteur.caseBLabel}
              onChange={(v) =>
                setContent({
                  ...content,
                  filConducteur: { ...content.filConducteur, caseBLabel: v },
                })
              }
              sizeRem={sizeOf("filConducteur.caseBLabel")}
              onSizeChange={(v) => setSize("filConducteur.caseBLabel", v)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextAreaField
              label="Exemple A — texte"
              value={content.filConducteur.caseAText}
              onChange={(v) =>
                setContent({
                  ...content,
                  filConducteur: { ...content.filConducteur, caseAText: v },
                })
              }
              sizeRem={sizeOf("filConducteur.caseAText")}
              onSizeChange={(v) => setSize("filConducteur.caseAText", v)}
            />
            <TextAreaField
              label="Exemple B — texte"
              value={content.filConducteur.caseBText}
              onChange={(v) =>
                setContent({
                  ...content,
                  filConducteur: { ...content.filConducteur, caseBText: v },
                })
              }
              sizeRem={sizeOf("filConducteur.caseBText")}
              onSizeChange={(v) => setSize("filConducteur.caseBText", v)}
            />
          </div>
        </SectionCard>

        <SectionCard title="Contact">
          <Field
            label="Petit label"
            value={content.contact.kicker}
            onChange={(v) =>
              setContent({ ...content, contact: { ...content.contact, kicker: v } })
            }
            sizeRem={sizeOf("contact.kicker")}
            onSizeChange={(v) => setSize("contact.kicker", v)}
          />
          <Field
            label="Titre"
            value={content.contact.title}
            onChange={(v) =>
              setContent({ ...content, contact: { ...content.contact, title: v } })
            }
            sizeRem={sizeOf("contact.title")}
            onSizeChange={(v) => setSize("contact.title", v)}
          />
          <TextAreaField
            label="Sous-titre"
            value={content.contact.subtitle}
            onChange={(v) =>
              setContent({ ...content, contact: { ...content.contact, subtitle: v } })
            }
            sizeRem={sizeOf("contact.subtitle")}
            onSizeChange={(v) => setSize("contact.subtitle", v)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Email"
              value={content.contact.email}
              onChange={(v) =>
                setContent({ ...content, contact: { ...content.contact, email: v } })
              }
              sizeRem={sizeOf("contact.email")}
              onSizeChange={(v) => setSize("contact.email", v)}
            />
            <Field
              label="Téléphone"
              value={content.contact.phone}
              onChange={(v) =>
                setContent({ ...content, contact: { ...content.contact, phone: v } })
              }
              sizeRem={sizeOf("contact.phone")}
              onSizeChange={(v) => setSize("contact.phone", v)}
            />
          </div>
        </SectionCard>

        <SectionCard title="Présence (carte du monde)">
          <PresenceMapEditor
            title={content.presence.title}
            onTitleChange={(v) =>
              setContent({ ...content, presence: { ...content.presence, title: v } })
            }
            backgroundImage={content.presence.backgroundImage}
            onBackgroundChange={(url) =>
              setContent({
                ...content,
                presence: { ...content.presence, backgroundImage: url },
              })
            }
            locations={content.presence.locations}
            onLocationsChange={(next) =>
              setContent({ ...content, presence: { ...content.presence, locations: next } })
            }
          />
        </SectionCard>

        <SectionCard title="Ils nous font confiance (logos partenaires)">
          <TrustedLogosEditor
            title={content.trustedSection.title}
            onTitleChange={(v) =>
              setContent({
                ...content,
                trustedSection: { ...content.trustedSection, title: v },
              })
            }
            subtitle={content.trustedSection.subtitle}
            onSubtitleChange={(v) =>
              setContent({
                ...content,
                trustedSection: { ...content.trustedSection, subtitle: v },
              })
            }
            logos={content.trustedSection.logos}
            onLogosChange={(next) =>
              setContent({
                ...content,
                trustedSection: { ...content.trustedSection, logos: next },
              })
            }
          />
        </SectionCard>

        <SectionCard title="Footer">
          <TextAreaField
            label="Texte de présentation"
            value={content.footer.tagline}
            onChange={(v) =>
              setContent({ ...content, footer: { ...content.footer, tagline: v } })
            }
            sizeRem={sizeOf("footer.tagline")}
            onSizeChange={(v) => setSize("footer.tagline", v)}
          />
          <Field
            label="Nom affiché dans le copyright"
            value={content.footer.copyrightName}
            onChange={(v) =>
              setContent({
                ...content,
                footer: { ...content.footer, copyrightName: v },
              })
            }
            sizeRem={sizeOf("footer.copyrightName")}
            onSizeChange={(v) => setSize("footer.copyrightName", v)}
          />
        </SectionCard>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl text-navy-950">
          Sections personnalisées (page d&apos;accueil)
        </h2>
        <p className="mt-2 text-ink-soft">
          Une fois ajoutée, une section apparaît dans le panneau &laquo; Ordre
          des sections &raquo; ci-dessus, où tu peux la positionner où tu veux.
        </p>
        <div className="mt-6">
          <SectionsEditor
            sections={content.homeSections}
            onChange={updateHomeSections}
            keyPrefix="homeSections"
            sizeOf={sizeOf}
            onSizeChange={setSize}
          />
        </div>
      </div>

      <SaveBar onSave={handleSave} saving={saving} status={status} />
    </div>
  );
}
