import { getPostWithRelated } from "@/lib/posts";
import PostList from "./PostList";

type Props = {
  postId: string;
};

export default async function RelatedPosts({ postId }: Props) {
  const data = await getPostWithRelated(postId);

  // 関連記事データを整形
  const relatedPosts = (data?.relatedPosts ?? []).map(
    ({ user, tags, ...rest }) => ({
      ...rest,
      user,
      tags,
    })
  );

  return (
    <>
      <h2 className="mt-8 text-2xl font-semibold">関連記事</h2>
      {relatedPosts ? (
        <PostList PostAllData={relatedPosts} />
      ) : (
        <p>関連記事はありません</p>
      )}
    </>
  );
}
