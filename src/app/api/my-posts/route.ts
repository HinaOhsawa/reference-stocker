import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { auth } from "@/lib/auth";

// Idを使ってpostの詳細を取得
export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  const myPosts = await prisma.post.findMany({
    where: { userId: userId },
    include: {
      user: true,
      tags: true,
    },
  });

  if (!myPosts) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(myPosts, { status: 200 });
}
