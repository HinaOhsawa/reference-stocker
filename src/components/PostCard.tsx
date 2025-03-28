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
  const { id, title, url, createdAt, user } = PostData; // 分割代入
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <small>{dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</small>
        <CardDescription>{user}</CardDescription>
      </CardHeader>
      <CardContent>{url}</CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/posts/${id}`} className="text-blue-500">
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
