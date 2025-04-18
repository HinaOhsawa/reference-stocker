import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ bookmarked: false });
  }

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      userId,
      postId: params.id,
    },
  });

  return NextResponse.json({ bookmarked: !!bookmark });
}
