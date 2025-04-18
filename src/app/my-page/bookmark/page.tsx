import PostList from "@/components/PostList";
import { fetchMyBookmark } from "@/lib/user";

export default async function Bookmark() {
  const BookmarkPosts = await fetchMyBookmark();
  // console.log(BookmarkPosts);
  return (
    <div className="">
      <h2 className="text-xl font-bold ">ブックマーク一覧</h2>
      <PostList PostAllData={BookmarkPosts} />
    </div>
  );
}
