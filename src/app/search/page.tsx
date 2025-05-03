import PostList from "@/components/PostList";
import SearchForm from "@/components/SearchForm";
import { searchPosts } from "@/lib/posts";
import Pagination from "@/components/Pagination";

type SearchParams = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchParams) {
  const keyword = (await searchParams).q;

  // ページネーションのためのクエリパラメータを取得
  const page = Number((await searchParams)?.page) || 1;
  const perPage = 10; // 1ページあたりの表示件数

  const { posts, totalPages } = await searchPosts(keyword || "", page, perPage);

  if (!keyword || posts.length === 0) {
    return (
      <>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          検索結果：「{keyword}」
        </h2>
        <SearchForm />
        <div className="text-center py-12">
          <p className="text-xl font-medium">検索結果がありません。</p>
          <p className="text-muted-foreground mt-2">
            別のキーワードで検索してみてください。
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold mb-4">
        検索結果：「{keyword}」
      </h2>
      <SearchForm />
      <p className="text-muted-foreground mb-6">
        {posts.length} 件の記事が見つかりました。
      </p>
      <PostList PostAllData={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
