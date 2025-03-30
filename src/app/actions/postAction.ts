"use server";

import { prisma } from "@/lib/prismaClient";
import { formSchema } from "@/app/post/create/page";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const createPost = async ({
  title,
  url,
  memo,
}: z.infer<typeof formSchema>) => {
  const session = await auth();

  if (session?.user?.email !== null && session?.user !== undefined) {
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (dbUser) {
      await prisma.post.create({
        data: {
          url,
          title,
          memo,
          user: {
            connect: { id: dbUser.id }, // 既存のユーザーを関連付ける
          },
        },
      });
    } else {
      throw new Error("User not found in the database.");
    }
  }

  revalidatePath("/"); // キャッシュを更新
  redirect("/"); // リダイレクト
};
