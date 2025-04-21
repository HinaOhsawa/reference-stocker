import MyPostCard from "@/components/MyPostCard";
import { fetchMyPosts } from "@/lib/user";

export default async function MyPosts() {
  const myPosts = await fetchMyPosts();
  return (
    <>
      <h2 className="text-lg font-bold mt-6">
        自分の投稿 <small className="">（{myPosts.length}件）</small>
      </h2>
      {!myPosts || myPosts.length === 0 ? (
        <p className="mt-2">まだ投稿はありません。</p>
      ) : (
        <ul className="grid mt-4 gap-4">
          {myPosts.map((Post) => (
            <MyPostCard key={Post.id} PostData={Post} />
          ))}
        </ul>
      )}
    </>
  );
}
