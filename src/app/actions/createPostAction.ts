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
          published,
          tags: {
            connectOrCreate: (tags ?? []).map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
          user: {
            connect: { id: dbUser.id }, // 既存のユーザーを関連付ける
          },
        },
      });
    } else {
      throw new Error("User not found in the database.");
    }
  }
};
