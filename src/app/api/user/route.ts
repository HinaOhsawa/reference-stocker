import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// ユーザー情報を取得
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return NextResponse.json(user, { status: 200 });
}
