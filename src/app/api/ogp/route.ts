import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "URLが必要です" }, { status: 400 });
  }

  if (isYouTubeUrl(url)) {
    const videoId = extractVideoId(url);
    if (!videoId) {
      return createFallbackOGP(url);
    }

    try {
      const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
      const res = await fetch(api);
      if (!res.ok) throw new Error("YouTube API失敗");
      const json = await res.json();

      if (!json.items || json.items.length === 0) {
        return createFallbackOGP(url);
      }

      const snippet = json.items[0].snippet;
      return NextResponse.json({
        title: snippet.title,
        description: snippet.description,
        image: snippet.thumbnails.high.url,
        url,
      });
    } catch {
      return createFallbackOGP(url);
    }
  }

  // 一般サイトのOGP取得
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    const html = await res.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const getMeta = (property: string) =>
      (
        doc.querySelector(
          `meta[property="${property}"]`
        ) as HTMLMetaElement | null
      )?.content ||
      (doc.querySelector(`meta[name="${property}"]`) as HTMLMetaElement | null)
        ?.content ||
      "";

    const title = getMeta("og:title") || doc.title || url;
    const description = getMeta("og:description") || "";
    const image = getMeta("og:image") || "";

    return NextResponse.json({
      title,
      description,
      image,
      url,
    });
  } catch {
    return createFallbackOGP(url);
  }
}

function createFallbackOGP(url: string) {
  return NextResponse.json({
    title: url,
    description: "",
    image: "",
    url,
  });
}

function isYouTubeUrl(url: string) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(url);
}

function extractVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    if (parsed.hostname.includes("youtube.com"))
      return parsed.searchParams.get("v");
    return null;
  } catch {
    return null;
  }
}
