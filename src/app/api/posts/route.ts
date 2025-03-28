import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// 全ての記事を取得
export async function GET() {
  const allPosts = await prisma.post.findMany();
  return NextResponse.json(allPosts);
}
