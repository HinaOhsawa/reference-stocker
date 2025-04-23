"use server";

import { prisma } from "@/lib/prismaClient";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function deletePost(id: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  try {
    await prisma.post.delete({
      where: { id, userId },
    });
  } catch (error) {
    console.error("削除エラー:", error);
    throw new Error(
      "記事の削除に失敗しました。存在しないか、権限がありません。"
    );
  }
  revalidatePath("/"); // キャッシュを更新
  revalidatePath("/my-page");
  return { success: true };
}
