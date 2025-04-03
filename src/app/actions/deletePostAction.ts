"use server";

import { prisma } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    console.error("削除エラー:", error);
    throw new Error("記事の削除に失敗しました");
  }
  revalidatePath("/"); // キャッシュを更新
}
