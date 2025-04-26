import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ bookmarked: false });
  }

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      userId,
      postId: id,
    },
  });

  return NextResponse.json({ bookmarked: !!bookmark });
}
