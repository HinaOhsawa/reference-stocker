"use server";

import { prisma } from "@/lib/prismaClient";
import { auth } from "@/lib/auth";

export async function toggleBookmark(postId: string) {
  const session = await auth();
  if (!session?.user || !session.user?.id) throw new Error("Unauthorized");

  const userId = session.user.id;

  // 既にブックマークしているかチェック
  const existing = await prisma.bookmark.findFirst({
    where: { userId, postId },
  });

  if (existing) {
    // 既にブックマークしていたら削除
    await prisma.bookmark.delete({ where: { id: existing.id } });
    return false; // 削除したのでfalseを返す
  } else {
    // ブックマーク追加
    await prisma.bookmark.create({ data: { userId, postId } });
    return true; // 追加したのでtrueを返す
  }
}
