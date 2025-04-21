import PostList from "@/components/PostList";
import { fetchMyBookmark } from "@/lib/user";

export default async function Bookmark() {
  const BookmarkPosts = await fetchMyBookmark();
  // console.log(BookmarkPosts);
  return (
    <div className="">
      <h2 className="text-xl font-bold ">
        ブックマーク
        <small className="">（{BookmarkPosts.length}件）</small>
      </h2>
      {!BookmarkPosts || BookmarkPosts.length === 0 ? (
        <p className="mt-2">まだブックマークはありません。</p>
      ) : (
        <PostList PostAllData={BookmarkPosts} />
      )}
    </div>
  );
}
