import { NextResponse } from "next/server";
import { getTheme, saveTheme } from "@/lib/store";
import type { SiteTheme } from "@/lib/content-types";

// Route Handlers with no dynamic API usage get statically cached by
// default — this one must always read the live Blob content.
export const dynamic = "force-dynamic";

export async function GET() {
  const theme = await getTheme();
  return NextResponse.json(theme);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SiteTheme | null;
  if (!body) {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }
  try {
    await saveTheme(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur inconnue." },
      { status: 500 }
    );
  }
}
