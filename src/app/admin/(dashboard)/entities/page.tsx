"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content-types";

export default function AdminEntitiesPage() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-navy-950">Les 4 pôles</h1>
      <p className="mt-2 text-ink-soft">
        Sélectionne un pôle pour modifier son nom, sa description et ses
        groupes de compétences.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {content?.entities.map((entity) => (
          <Link
            key={entity.slug}
            href={`/admin/entities/${entity.slug}`}
            className="block rounded-2xl border border-hairline bg-paper p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="text-xs font-medium text-blue-600">
              {entity.number}
            </span>
            <h2 className="font-display text-xl text-navy-950">{entity.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {entity.short}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-blue-600">
              Modifier →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
