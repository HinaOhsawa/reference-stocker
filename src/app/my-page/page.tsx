import MyPostCard from "@/components/MyPostCard";
import { auth } from "@/lib/auth";
import { getMyPosts } from "@/lib/user";

export default async function MyPage() {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;
  const myPosts = await getMyPosts(userId);

  if (!myPosts || myPosts.length === 0) {
    return <p>まだ投稿はありません。</p>;
  }
  return (
    <div>
      <h2>マイページ</h2>
      <h3>投稿一覧</h3>
      <ul className="grid px-4 py-4 gap-4">
        {myPosts.map((Post) => (
          <MyPostCard key={Post.id} PostData={Post} />
        ))}
      </ul>
    </div>
  );
}
