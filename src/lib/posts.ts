import { Post } from "@/types/types";
import { prisma } from "@/lib/prismaClient";
// =======================================
// API経由する関数
// =======================================

// すべてのpostを取得
// export async function getAllPosts() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
//   if (!res.ok) throw new Error("Failed to fetch posts");
//   return res.json();
// }

export async function fetchPostsPaginated(page: number, perPage: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/?page=${page}&pageSize=${perPage}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

// Idを使ってpostの詳細を取得
export async function fetchPostDetail(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
    cache: "no-store",
  });
  const post: Post = await res.json();
  return post;
}

// 記事検索
export async function searchPosts(
  keyword: string,
  page: number,
  perPage: number
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/search?q=${keyword}&page=${page}&pageSize=${perPage}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return []; // 失敗した場合は空の配列を返す
  }

  return res.json();
}

// =======================================
// Prisma直アクセスする関数
// =======================================

// 関連記事取得関数
export async function getRelatedPosts(postId: string, tagIds: string[]) {
  const relatedPosts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          id: { in: tagIds },
        },
      },
      id: {
        not: postId, // 自分自身は除外
      },
    },
    take: 5, // 最大5件
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      user: true,
    },
  });

  return relatedPosts;
}

// 記事詳細と関連する記事を取得
export async function getPostWithRelated(postId: string) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { tags: true, user: true },
  });

  if (!post) return null;

  const tagIds = post.tags.map((tag) => tag.id);

  const relatedPosts = await getRelatedPosts(post.id, tagIds);

  if (!relatedPosts) {
    return { post, relatedPosts: [] }; // 失敗した場合は空の配列を返す
  }

  return { post, relatedPosts };
}
