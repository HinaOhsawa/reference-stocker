// /app/api/ogp/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const meta = dom.window.document;

    const getMeta = (property: string) =>
      meta
        .querySelector(`meta[property='${property}']`)
        ?.getAttribute("content") ||
      meta.querySelector(`meta[name='${property}']`)?.getAttribute("content") ||
      "";

    const data = {
      title: getMeta("og:title") || meta.title,
      description: getMeta("og:description"),
      image: getMeta("og:image"),
      url,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch OGP data" },
      { status: 500 }
    );
  }
}
