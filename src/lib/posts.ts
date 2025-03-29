import { Post } from "@/types/types";

// すべてのpostを取得
export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}
