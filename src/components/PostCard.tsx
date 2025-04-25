"use client";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookmarkButton } from "./BookmarkButton";
import { User } from "lucide-react";
import LinkCard from "./LinkCard";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

interface DataProps {
  PostData: Post;
}

const PostCard = ({ PostData }: DataProps) => {
  const { id, title, url, createdAt, updatedAt, user, tags } = PostData; // 分割代入

  const router = useRouter();

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchBookmark = async () => {
      const res = await fetch(`/api/posts/bookmark/${id}`);
      const data = await res.json();
      setBookmarked(data.bookmarked);
      console.log(data);
    };
    fetchBookmark();
  }, [id]);

  //カードごとリンクにしたい場合クライアントコンポーネントにする
  const handleClick = () => {
    router.push(`/post/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="w-full overflow-hidden cursor-pointer hover:bg-gray-50"
    >
      <CardHeader>
        <Link href={`/post/${id}`} className="hover:opacity-70 transition">
          <CardTitle>{title}</CardTitle>
        </Link>
        <div className="flex gap-4 flex-wrap  text-muted-foreground my-2">
          <small>投稿日 {dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</small>
          <small>更新日 {dayjs(updatedAt).format("YYYY/MM/DD HH:mm")}</small>
        </div>

        <CardDescription>
          <div className="flex items-center gap-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.image ?? undefined} alt="@username" />
              <AvatarFallback className="bg-gray-100 text-gray-400">
                <User size={40} />
              </AvatarFallback>
            </Avatar>
            <p>{user.name}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LinkCard url={url} />
        <div className="mt-4 flex flex-wrap items-center gap-2 mb-2">
          {tags?.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap justify-end gap-2">
        <BookmarkButton postId={id} initialBookmarked={bookmarked} />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
