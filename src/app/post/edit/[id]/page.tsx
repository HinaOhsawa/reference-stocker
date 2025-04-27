import { getPostWithRelated } from "@/lib/posts"; // Prisma直の関数を想定
import EditPostForm from "@/components/EditPostForm"; // クライアントコンポーネント
import { Post } from "@/types/types";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPostWithRelated(id);
  const post: Post | undefined = data?.post;

  if (!post) {
    return <p>投稿が見つかりませんでした。</p>;
  }

  // memoがnullの場合はundefinedに変換して
  if (post.memo === null) {
    post.memo = undefined;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">記事を編集</h2>
      <EditPostForm post={post} />
    </div>
  );
}
