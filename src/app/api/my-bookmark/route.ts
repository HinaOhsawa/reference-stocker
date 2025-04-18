import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { auth } from "@/lib/auth";

// bookmarkしている記事を取得
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: userId },
    include: {
      post: {
        include: {
          user: true,
          tags: true,
        },
      },
    },
  });

  if (!bookmarks) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(bookmarks, { status: 200 });
}
