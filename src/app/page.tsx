import PostList from "@/components/PostList";
import SearchForm from "@/components/SearchForm";
import Pagination from "@/components/Pagination";
import { getPostsPaginated } from "@/lib/posts";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // ページネーションのためのクエリパラメータを取得
  const page = Number(searchParams.page) || 1;
  const perPage = 10; // 1ページあたりの表示件数

  const { posts, totalPages } = await getPostsPaginated(page, perPage);
  if (page > totalPages) redirect("/");

  return (
    <>
      <SearchForm />
      <PostList PostAllData={posts} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}
