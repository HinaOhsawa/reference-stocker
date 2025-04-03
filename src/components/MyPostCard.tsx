import React from "react";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Post } from "@/types/types";
import dayjs from "dayjs";
import { Button } from "./ui/button";
import DeletePostButton from "./DeletePostButton";

interface DataProps {
  PostData: Post;
}

const MyPostCard = ({ PostData }: DataProps) => {
  const { id, title, url, createdAt, tags, published } = PostData; // 分割代入
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {" "}
          <Link href={`/post/${id}`} className=" underline underline-offset-">
            {title}
          </Link>
        </CardTitle>
        <small>{dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</small>
        {published ? (
          <p className="text-green-500">公開中</p>
        ) : (
          <p className="text-red-500">非公開</p>
        )}
      </CardHeader>
      <CardContent>{url}</CardContent>

      <CardFooter className="flex flex-wrap gap-2 mb-2">
        {tags?.map((tag) => (
          <span key={tag.id} className="tag">
            {tag.name}
          </span>
        ))}

        <Button>
          <Link href={`/post/edit/${id}`}>編集</Link>
        </Button>
        <DeletePostButton postId={id} />
      </CardFooter>
    </Card>
  );
};

export default MyPostCard;
