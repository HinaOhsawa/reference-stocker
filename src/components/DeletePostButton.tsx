"use client";

import { useState, useTransition } from "react";
import { deletePost } from "@/app/actions/deletePostAction";
// import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function DeletePostButton({ postId }: { postId: string }) {
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      setShowModal(false);
      await deletePost(postId);
      // router.push("/"); // 削除後にトップページへリダイレクト
    });
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        disabled={isPending}
        variant="secondary"
        className=""
      >
        <Trash2 />
        {isPending ? "削除中..." : "削除"}
      </Button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="fixed inset-0 flex opacity-25 bg-black"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-lg font-bold mb-4">本当に削除しますか？</h2>
            <div className="flex justify-between space-x-2">
              <Button
                onClick={() => setShowModal(false)}
                variant="secondary"
                className="cursor-pointer"
              >
                キャンセル
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending ? "削除中..." : "削除"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
