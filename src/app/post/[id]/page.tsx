import { getPostDetail } from "@/lib/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

// 投稿の詳細内容を表示するページ
export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const post = await getPostDetail(id);

  if (!post) return <p>Post not found</p>;

  const { title, url, createdAt, user, memo, tags } = post;
  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card className="border-none shadow-none block">
        <CardHeader className="px-0 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src="/placeholder.svg?height=50&width=50"
                alt="@username"
              />
              <AvatarFallback>{user}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">User{user}</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
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
            <Card className="overflow-hidden">
              <Link href={url} className="flex flex-col sm:flex-row">
                <div className="p-4 sm:w-2/3">
                  <div className="text-xs text-muted-foreground mt-2">
                    {url}
                  </div>
                </div>
              </Link>
            </Card>
            <h3 className="font-semibold mb-2">Memo</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{memo}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground ml-auto"
            >
              <BookmarkIcon className="w-4 h-4 mr-2" />
              保存
            </Button>
          </div>
        </CardContent>

        <Link
          href={"/"}
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-fit"
        >
          戻る
        </Link>
      </Card>
    </div>
  );
}
