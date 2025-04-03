import { prisma } from "@/lib/prismaClient";
import { Post } from "@/types/types";

export async function getMyPosts(userId: string) {
  const myPosts = await prisma.post.findMany({
    where: { userId: userId },
    include: { tags: true, user: true }, // tagsとuserを含めて取得
  });

  const formattedPosts: Post[] = myPosts.map((post) => ({
    id: post.id,
    title: post.title,
    url: post.url,
    memo: post.memo ?? undefined,
    tags: post.tags.map((tag) => ({ id: tag.id, name: tag.name })),
    user: {
      id: post.user.id,
      name: post.user.name ?? "Unknown",
      image: post.user.image ?? "Unknown",
      email: post.user.email ?? "Unknown",
      createdAt: post.user.createdAt.toISOString(),
      updatedAt: post.user.updatedAt.toISOString(),
    },
    published: post.published,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),

    // ここでtagsとuserを展開して新しいプロパティを追加することも可能;
  }));
  return formattedPosts;
}
