// /app/api/ogp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const parsedUrl = new URL(url);

    // YouTubeのURLならサムネイルURLを構築して返す
    if (
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname === "youtu.be"
    ) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        return NextResponse.json({
          title: "YouTube Video",
          description: "YouTube video thumbnail",
          image: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          url,
        });
      }
    }

    // 通常のHTMLからOGPを取得
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
  } catch (err) {
    console.error("OGP fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch OGP data" },
      { status: 500 }
    );
  }
}

// YouTubeのURLからvideo IDを取り出す
function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}
