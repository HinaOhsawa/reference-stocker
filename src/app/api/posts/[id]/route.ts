import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// Idを使ってpostの詳細を取得
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // params から id を取得
  const post = await prisma.post.findUnique({
    where: { id: id },
    include: { tags: true, user: true }, // tags と user を含めて取得
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post, { status: 200 });
}
