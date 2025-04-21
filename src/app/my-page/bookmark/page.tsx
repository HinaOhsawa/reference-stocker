import Pagination from "@/components/Pagination";
import PostList from "@/components/PostList";
import { getMyBookmark } from "@/lib/user";

export default async function Bookmark({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // ページネーションのためのクエリパラメータを取得
  const page = Number(searchParams.page) || 1;
  const perPage = 10; // 1ページあたりの表示件数

  const { bookmarkPosts, totalPages } = await getMyBookmark(page, perPage);
  // if (page > totalPages) redirect("/");
  // console.log(bookmarkPosts);
  return (
    <div className="">
      <h2 className="text-xl font-bold ">
        ブックマーク
        <small className="">（{bookmarkPosts.length}件）</small>
      </h2>
      {!bookmarkPosts || bookmarkPosts.length === 0 ? (
        <p className="mt-2">まだブックマークはありません。</p>
      ) : (
        <>
          <PostList PostAllData={bookmarkPosts} />
          <Pagination currentPage={page} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
