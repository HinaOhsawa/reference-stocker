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
          <CardDescription>{user}</CardDescription>
        </CardHeader>
        <CardContent>{url}</CardContent>

        <CardFooter className="flex justify-between">
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
