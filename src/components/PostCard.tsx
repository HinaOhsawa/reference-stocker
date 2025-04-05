import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Post } from "@/types/types";
import dayjs from "dayjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BookmarkButton } from "./BookmarkButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismaClient";

interface DataProps {
  PostData: Post;
}

const PostCard = async ({ PostData }: DataProps) => {
  const { id, title, url, createdAt, user, tags } = PostData; // 分割代入

  // 現在のユーザーがこの投稿をブックマークしているかチェック
  const session = await auth();
  const userId = session?.user?.id;
  const existingBookmark = userId
    ? !!(await prisma.bookmark.findFirst({ where: { userId, postId: id } }))
    : false;

  return (
    <Link href={`/post/${id}`} className="text-blue-500">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <small>{dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</small>

          <CardDescription>
            {" "}
            <div className="flex items-center gap-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.image} alt="@username" />
              </Avatar>
              <p>{user.name}</p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>{url}</CardContent>

        <CardFooter className="flex flex-wrap gap-2 mb-2">
          <div className="flex justify-end items-center gap-2">
            {tags?.map((tag) => (
              <span key={tag.id} className="tag">
                {tag.name}
              </span>
            ))}
            <BookmarkButton postId={id} initialBookmarked={existingBookmark} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
