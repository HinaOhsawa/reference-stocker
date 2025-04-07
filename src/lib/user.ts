import { Bookmark, Post } from "@/types/types";

export async function getMyPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-posts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  const myPosts = await res.json();
  const posts: Post[] = myPosts.map((post: Post) => post);
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
