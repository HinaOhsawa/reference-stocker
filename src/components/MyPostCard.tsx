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
import DeletePostButton from "./DeletePostButton";
import LinkCard from "./LinkCard";
import { SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface DataProps {
  PostData: Post;
}

const MyPostCard = ({ PostData }: DataProps) => {
  const { id, title, url, createdAt, updatedAt, tags, published } = PostData; // 分割代入
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <Link
            href={`/post/${id}`}
            className={
              published ? "hover:opacity-70 transition" : "pointer-events-none"
            }
          >
            {title}
          </Link>
          <small className="font-normal">
            {published ? (
              <p className="text-green-500">公開中</p>
            ) : (
              <p className="text-red-500">非公開</p>
            )}
          </small>
        </CardTitle>
        <div className="flex gap-4 flex-wrap  text-muted-foreground my-2">
          <small>投稿日 {dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</small>
          <small>更新日 {dayjs(updatedAt).format("YYYY/MM/DD HH:mm")}</small>
        </div>
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

      <CardFooter className="flex flex-wrap justify-end items-center gap-2 mb-2">
        <Link
          href={`/post/edit/${id}`}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          <SquarePen />
          編集
        </Link>
        <DeletePostButton postId={id} />
      </CardFooter>
    </Card>
  );
};

export default MyPostCard;
