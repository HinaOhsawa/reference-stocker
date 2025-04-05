"use client";

import { useState, useTransition } from "react";
import { toggleBookmark } from "@/app/actions/bookmarkAction";
import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { Button } from "./ui/button";

type Props = { postId: string; initialBookmarked: boolean };

export function BookmarkButton({ postId, initialBookmarked }: Props) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // クリックの伝播を止める
    e.preventDefault(); // リンク遷移も防止（必要なら）
    startTransition(async () => {
      const newState = await toggleBookmark(postId);
      setBookmarked(newState);
    });
  };

  return (
    <Button
      variant="secondary"
      onClick={handleClick}
      disabled={isPending}
      className={`text-xl mb-4 rounded-full ${
        bookmarked ? "bg-blue-500 text-white" : ""
      }`}
    >
      {isPending ? (
        "処理中..."
      ) : bookmarked ? (
        <BookmarkCheck />
      ) : (
        <BookmarkIcon className="w-10 h-10" />
      )}
    </Button>
  );
}
