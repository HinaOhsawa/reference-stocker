import { getPostWithRelated } from "@/lib/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Link from "next/link";
import dayjs from "dayjs";
import { BookmarkButton } from "@/components/BookmarkButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";
import { User } from "lucide-react";
import LinkCard from "@/components/LinkCard";
import RelatedPosts from "@/components/RelatedPosts";
import { Post } from "@/types/types";

// 投稿の詳細内容を表示するページ
export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const session = await auth();

  // 現在のユーザーがこの投稿をブックマークしているかチェック
  const userId = session?.user?.id;
  const existingBookmark = userId
    ? !!(await prisma.bookmark.findFirst({ where: { userId, postId: id } }))
    : false;

  // 投稿の詳細を取得
  const result = await getPostWithRelated(id);
  if (!result) return <p>Post not found</p>;
  const post: Post = result?.post;

  const { title, url, createdAt, user, memo, tags } = post;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card className="p-6 rounded-2xl shadow-md border bg-white">
        <CardHeader className="px-0 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.image ?? undefined} alt="@username" />
              <AvatarFallback className="bg-gray-100 text-gray-400">
                <User size={40} />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <span key={tag.id} className="tag">
                {tag.name}
              </span>
            ))}
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            投稿日 {dayjs(createdAt).format("YYYY/MM/DD HH:mm")}
          </div>
        </CardHeader>
        <CardContent className="px-0 space-y-4">
          <div className="space-y-4">
            <LinkCard url={url} />
            <h3 className="font-semibold mt-6 mb-2">Memo</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{memo}</p>
          </div>
          <div className="flex justify-end items-center gap-2">
            <BookmarkButton postId={id} initialBookmarked={existingBookmark} />
          </div>
        </CardContent>
      </Card>

      <RelatedPosts postId={id} />
    </div>
  );
}
