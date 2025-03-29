import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// 全ての記事を取得
export async function GET() {
  const allPosts = await prisma.post.findMany({ include: { tags: true } });
  return NextResponse.json(allPosts);
}
