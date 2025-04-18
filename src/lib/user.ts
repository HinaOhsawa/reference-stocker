import { Bookmark, Post } from "@/types/types";

// =======================================
// API経由する関数
// =======================================

// ユーザー情報を取得
export async function fetchUser(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/?id=${userId}`,
    {
      cache: "no-store",
    }
  );
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
