import { prisma } from "@/lib/prismaClient";
import { Post } from "@/types/types";

export async function getMyPosts(userId: string) {
  const myPosts = await prisma.post.findMany({
    where: { userId: userId },
    include: { tags: true, user: true }, // tagsとuserを含めて取得
  });

  const formattedPosts: Post[] = myPosts.map((post: Post) => post);
  return posts;
}

// bookmark記事を取得
export async function getMyBookmark() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookmark`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  const bookmarks = await res.json();
  const posts: Post[] = bookmarks.map((bookmark: Bookmark) => bookmark.post);
  return posts;
}
