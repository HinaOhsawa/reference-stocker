import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// Idを使ってpostの詳細を取得
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: id },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post, { status: 200 });
}
