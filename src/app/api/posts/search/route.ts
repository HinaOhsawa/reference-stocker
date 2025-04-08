import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q");

  if (!keyword) {
    return NextResponse.json({ error: "No search keyword" }, { status: 400 });
  }

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: keyword, mode: "insensitive" } },
        { memo: { contains: keyword, mode: "insensitive" } },
        {
          tags: { some: { name: { contains: keyword, mode: "insensitive" } } },
        },
      ],
    },

    include: { tags: true, user: true },
  });
  return NextResponse.json(posts);
}
