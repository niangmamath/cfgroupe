import Link from "next/link";
import { isBlobConfigured } from "@/lib/store";

export default function AdminDashboard() {
  const blobReady = isBlobConfigured();

  return (
    <div>
      <h1 className="font-display text-3xl text-navy-950">Tableau de bord</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Gérez les textes, les couleurs et les médias du site CFConsulting.
        Toute modification enregistrée est visible immédiatement sur le site.
      </p>

      {!blobReady && (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">Stockage non configuré</p>
          <p className="mt-1">
            La variable d&apos;environnement <code>BLOB_READ_WRITE_TOKEN</code>{" "}
            n&apos;est pas définie. Le site affiche le contenu par défaut et
            aucune modification ne peut être enregistrée pour l&apos;instant.
            Active Vercel Blob dans l&apos;onglet <strong>Storage</strong> de
            ton projet Vercel, puis redéploie.
          </p>
        </div>
      )}

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          href="/admin/content"
          title="Contenu des sections"
          description="Héro, image/vidéo de fond, pôles, fil conducteur, contact, footer."
        />
        <AdminCard
          href="/admin/entities"
          title="Les 4 pôles"
          description="Nom, description, synergie et détails de chaque pôle."
        />
        <AdminCard
          href="/admin/theme"
          title="Thème & couleurs"
          description="Palette de couleurs et taille du texte du site."
        />
      </div>
    </div>
  );
}

function AdminCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-hairline bg-paper p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <h2 className="font-display text-xl text-navy-950">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
      <span className="mt-4 inline-block text-sm font-medium text-blue-600">
        Modifier →
      </span>
    </Link>
  );
}
