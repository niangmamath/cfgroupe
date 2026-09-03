"use client";

import { useEffect, useState } from "react";
import type { SiteContent, SiteTheme } from "@/lib/content-types";
import { Field, TextAreaField, SectionCard, SaveBar } from "../_components/FormControls";
import { MediaUpload } from "../_components/MediaUpload";
import { SectionsEditor } from "../_components/SectionsEditor";

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

      <div className="mt-8 space-y-6">
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
          S&apos;affichent entre &laquo; Le fil conducteur &raquo; et
          &laquo; Contact &raquo;, dans l&apos;ordre choisi ci-dessous.
        </p>
        <div className="mt-6">
          <SectionsEditor
            sections={content.homeSections}
            onChange={(next) => setContent({ ...content, homeSections: next })}
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
