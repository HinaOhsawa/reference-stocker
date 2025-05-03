import Pagination from "@/components/Pagination";
import PostList from "@/components/PostList";
import { redirectIfUnauth } from "@/lib/redirectIfUnauth";
import { getMyBookmark } from "@/lib/user";

export default async function Bookmark({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await redirectIfUnauth(); // ログインしていない場合はリダイレクト

  // ページネーションのためのクエリパラメータを取得
  const page = Number((await searchParams).page) || 1;
  const perPage = 10; // 1ページあたりの表示件数

  const { bookmarkPosts, totalPages } = await getMyBookmark(page, perPage);
  // if (page > totalPages) redirect("/");
  // console.log(bookmarkPosts);
  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold ">
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
    </>
  );
}
