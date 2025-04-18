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
  const { id, title, url, createdAt, user, tags } = PostData; // 分割代入

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
    <Card onClick={handleClick}>
      <CardHeader>
        <Link href={`/post/${id}`}>
          <CardTitle>{title}</CardTitle>
        </Link>
        <small>{dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</small>

        <CardDescription>
          {" "}
          <div className="flex items-center gap-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.image ?? undefined} alt="@username" />
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
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 mb-2">
        <div className="flex justify-end items-center gap-2">
          {tags?.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
          <BookmarkButton postId={id} initialBookmarked={bookmarked} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
