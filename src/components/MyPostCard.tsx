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
import LinkCard from "./LinkCard";
import { SquarePen } from "lucide-react";

interface DataProps {
  PostData: Post;
}

const MyPostCard = ({ PostData }: DataProps) => {
  const { id, title, url, createdAt, tags, published } = PostData; // 分割代入
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <Link href={`/post/${id}`} className="hover:opacity-70 transition">
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
        <small>{dayjs(createdAt).format("YYYY/MM/DD HH:mm")}</small>
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
        <Button>
          <SquarePen />
          <Link href={`/post/edit/${id}`}>編集</Link>
        </Button>
        <DeletePostButton postId={id} />
      </CardFooter>
    </Card>
  );
};

export default MyPostCard;
