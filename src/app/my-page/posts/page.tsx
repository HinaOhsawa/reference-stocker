import MyPostCard from "@/components/MyPostCard";
import { getMyPosts } from "@/lib/user";
import Pagination from "@/components/Pagination";

export default async function MyPosts({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // ページネーションのためのクエリパラメータを取得
  const page = Number(searchParams.page) || 1;
  const perPage = 10; // 1ページあたりの表示件数

  const { myPosts, totalPages } = await getMyPosts(page, perPage);
  return (
    <>
      <h2 className="text-lg font-bold mt-6">
        自分の投稿 <small className="">（{myPosts.length}件）</small>
      </h2>
      {!myPosts || myPosts.length === 0 ? (
        <p className="mt-2">まだ投稿はありません。</p>
      ) : (
        <>
          <ul className="grid mt-4 gap-4">
            {myPosts.map((Post) => (
              <MyPostCard key={Post.id} PostData={Post} />
            ))}
          </ul>
          <Pagination currentPage={page} totalPages={totalPages} />
        </>
      )}
    </>
  );
}
