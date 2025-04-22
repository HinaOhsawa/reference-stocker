import { Bookmark, Post } from "@/types/types";
import { prisma } from "@/lib/prismaClient";
import { auth } from "@/lib/auth";

// =======================================
// API経由する関数
// =======================================

// ユーザー情報を取得
export async function fetchUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  const user = await res.json();
  return user;
}

// 自分の投稿を取得
export async function fetchMyPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-posts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const myPosts = await res.json();
  const posts: Post[] = myPosts.map((post: Post) => post);
  return posts;
}

// bookmark記事を取得
export async function fetchMyBookmark() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookmark`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  const bookmarks = await res.json();
  const posts: Post[] = bookmarks.map((bookmark: Bookmark) => bookmark.post);
  return posts;
}

// プロフィール画像の更新
export const uploadAvatar = async (avatar: File, userId: string) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("userId", userId);

  const res = await fetch("/api/upload-avatar", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.error || "アップロードに失敗しました。");
  }

  return await res.json(); // 必要であれば返り値として使えるように
};

// =======================================
// Prisma直アクセスする関数
// =======================================

// ユーザー情報を取得
export async function gethUser(userId: string) {
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
}

// bookmark記事を取得
export async function getMyBookmark(page = 1, pageSize = 10) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const skip = (page - 1) * pageSize;

  const [bookmarks, total] = await Promise.all([
    prisma.bookmark.findMany({
      where: {
        userId,
        post: {
          published: true,
        },
      },
      include: {
        post: {
          include: {
            user: true,
            tags: true,
          },
        },
      },
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.bookmark.count({
      where: {
        userId,
        post: {
          published: true,
        },
      },
    }),
  ]);

  const bookmarkPosts = bookmarks.map((b) => b.post);

  return {
    bookmarkPosts,
    totalPages: Math.ceil(total / pageSize),
  };
}

// 自分の投稿を取得
export async function getMyPosts(page = 1, pageSize = 10) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const skip = (page - 1) * pageSize;

  const [myPosts, total] = await Promise.all([
    prisma.post.findMany({
      where: { userId },
      include: {
        user: true,
        tags: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.post.count({
      where: { userId },
    }),
  ]);

  return { myPosts, totalPages: Math.ceil(total / pageSize) };
}
