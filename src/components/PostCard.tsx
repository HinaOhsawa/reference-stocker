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

interface DataProps {
  PostData: Post;
}

const PostCard = ({ PostData }: DataProps) => {
  const { id, title, url, createdAt, user, tags } = PostData; // 分割代入
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
          {tags.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
