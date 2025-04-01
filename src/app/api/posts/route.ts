import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// 全ての記事を取得
export async function GET() {
  const allPosts = await prisma.post.findMany({
    where: { published: true },
    include: { tags: true, user: true },
  });
  return NextResponse.json(allPosts);
}
