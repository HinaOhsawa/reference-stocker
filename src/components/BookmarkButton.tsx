"use client";

import { useEffect, useState, useTransition } from "react";
import { toggleBookmark } from "@/app/actions/bookmarkAction";
import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { LoadingSpinner } from "./LoadingSpinner";

type Props = { postId: string; initialBookmarked: boolean };

export function BookmarkButton({ postId, initialBookmarked }: Props) {
  const { data: session } = useSession();
  // 親から受け取った initialBookmarked を反映する
  const [bookmarked, setBookmarked] = useState(Boolean(initialBookmarked));
  useEffect(() => {
    setBookmarked(Boolean(initialBookmarked));
  }, [initialBookmarked]);

  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // クリックの伝播を止める
    e.preventDefault(); // リンク遷移も防止（必要なら）

    if (!session) {
      toast.warning("ログインが必要です");
      return;
    }
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
      className={`w-10 h-10 text-xl mb-4 rounded-full cursor-pointer border bg-white hover:bg-gray-200 transition ${
        bookmarked ? "bg-blue-500 text-white" : ""
      }`}
    >
      {isPending ? (
        <LoadingSpinner />
      ) : bookmarked ? (
        <BookmarkCheck />
      ) : (
        <BookmarkIcon className="" />
      )}
    </Button>
  );
}
