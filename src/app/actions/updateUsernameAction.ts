"use server";

import { prisma } from "@/lib/prismaClient";
import { z } from "zod";
import { formSchema } from "@/components/UpdateUsernameForm";

export async function UpdateUsername(
  id: string,
  { name }: z.infer<typeof formSchema>
) {
  try {
    await prisma.user.update({
      where: { id: id },
      data: { name: name },
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "更新に失敗しました" };
  }
}
