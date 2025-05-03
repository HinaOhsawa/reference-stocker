import MyPostCard from "@/components/MyPostCard";
import { Card } from "@/components/ui/card";
import { getMyBookmark, getMyPosts, gethUser } from "@/lib/user";
import Link from "next/link";
import { ChevronRight, Pen, Settings, User } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookmarkCheck, FileText } from "lucide-react";
import PostCard from "@/components/PostCard";
import { redirectIfUnauth } from "@/lib/redirectIfUnauth";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default async function MyPage() {
  const session = await redirectIfUnauth(); // ログインしていない場合はリダイレクト
  const userId = session?.user?.id;

  const { myPosts } = await getMyPosts();
  const { bookmarkPosts } = await getMyBookmark();

  const user = await gethUser(userId ?? "");

  if (!user || !userId) {
    return <p>ログインしてください。</p>;
  }

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold">マイページ</h2>
      <h3 className="text-lg font-bold mt-6">ユーザー情報</h3>
      <Card className="mt-2 flex items-center gap-1">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user?.image ?? undefined} alt="@username" />
          <AvatarFallback className="w-full bg-gray-100 text-gray-400 flex items-center justify-center">
            <User size={30} />
          </AvatarFallback>
        </Avatar>
        <p className="">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
        <Link
          href="/user-settings"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            " mt-2"
          )}
        >
          <Settings />
          ユーザー設定
        </Link>
      </Card>

      <div className="mt-4 flex items-center flex-wrap gap-2">
        <Link
          href="/my-page/posts"
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
        >
          <FileText />
          自分の投稿
        </Link>
        <Link
          href="/my-page/bookmark"
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
        >
          <BookmarkCheck />
          ブックマーク
        </Link>
        <Link
          href="/post/create"
          className={cn(buttonVariants({ variant: "default", size: "sm" }))}
        >
          <Pen />
          新規作成
        </Link>
      </div>

      <h3 className="text-lg font-bold mt-8">自分の投稿</h3>
      {!myPosts || myPosts.length === 0 ? (
        <p className="mt-2">まだ投稿はありません。</p>
      ) : (
        <>
          <ul className="grid mt-2 gap-4">
            {myPosts.slice(0, 5).map((Post) => (
              <MyPostCard key={Post.id} PostData={Post} />
            ))}
          </ul>
          <div className="m-6 flex justify-center items-center">
            <Link
              className="flex items-center text-gray-500 opacity-100 hover:opacity-70 transition"
              href="/my-page/posts"
            >
              すべての投稿（{myPosts.length}件）
              <ChevronRight />
            </Link>
          </div>
        </>
      )}

      <h3 className="text-lg font-bold mt-8">ブックマーク</h3>
      {!bookmarkPosts || bookmarkPosts.length === 0 ? (
        <p className="mt-2">まだブックマークはありません。</p>
      ) : (
        <>
          <ul className="grid mt-2 gap-4">
            {bookmarkPosts.slice(0, 5).map((Post) => (
              <PostCard key={Post.id} PostData={Post} />
            ))}
          </ul>
          <div className="m-6 flex justify-center items-center">
            <Link
              className="flex items-center text-gray-500 opacity-100 hover:opacity-70 transition"
              href="/my-page/bookmark"
            >
              すべてのブックマーク（{bookmarkPosts.length}件）
              <ChevronRight />
            </Link>
          </div>
        </>
      )}
    </>
  );
}
