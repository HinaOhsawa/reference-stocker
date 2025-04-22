import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { auth } from "@/lib/auth";

// ユーザー情報を取得
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return NextResponse.json(user);
}
