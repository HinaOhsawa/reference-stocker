import PostList from "@/components/PostList";
import SearchForm from "@/components/SearchForm";
import { searchPosts } from "@/lib/posts";

type SearchParams = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchParams) {
  const keyword = searchParams.q;
  const posts = await searchPosts(keyword || "");
  console.log("posts", posts);

  if (!keyword) {
    return <p className="text-center mt-10">キーワードを入力してください</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">検索結果：「{keyword}」</h1>
        <SearchForm />
        <div className="text-center py-12">
          <p className="text-xl font-medium">検索結果がありません</p>
          <p className="text-muted-foreground mt-2">
            別のキーワードで検索してみてください
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">検索結果：「{keyword}」</h1>
      <SearchForm />
      <p className="text-muted-foreground mb-6">
        {posts.length} 件の記事が見つかりました
      </p>
      <PostList PostAllData={posts} />
    </div>
  );
}
