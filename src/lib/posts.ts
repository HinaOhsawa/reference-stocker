import { Post } from "@/types/types";

// すべてのpostを取得
export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

// Idを使ってpostの詳細を取得
export async function getPostDetail(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
    cache: "no-store",
  });
  const post: Post = await res.json();
  return post;
}

// 記事検索
export async function searchPosts(keyword: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/search?q=${keyword}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return []; // 失敗した場合は空の配列を返す
  }

  const posts: Post[] = await res.json();
  return posts;
}
