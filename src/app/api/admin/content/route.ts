import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/store";
import type { SiteContent } from "@/lib/content-types";

// Route Handlers with no dynamic API usage get statically cached by
// default — this one must always read the live Blob content.
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as SiteContent | null;
  if (!body) {
    return NextResponse.json({ error: "Corps invalide." }, { status: 400 });
  }
  try {
    await saveContent(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur inconnue." },
      { status: 500 }
    );
  }
}
