"use server";

import { prisma } from "@/lib/prismaClient";
import { formSchema } from "@/lib/validations/postSchema";
import { z } from "zod";
import { auth } from "@/lib/auth";

export const createPost = async ({
  title,
  url,
  memo,
  tags,
  published,
}: z.infer<typeof formSchema>) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");

  await prisma.post.create({
    data: {
      url,
      title,
      memo,
      published,
      tags: {
        connectOrCreate: (tags ?? []).map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
      user: {
        connect: { id: userId }, // 既存のユーザーを関連付ける
      },
    },
  });
  return { success: true };
};
