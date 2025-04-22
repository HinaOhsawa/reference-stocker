"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
}: // reset,
{
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold text-gray-400">Error!</h2>
      <p className="my-4 text-gray-700">エラーが発生しました。</p>
      <p className="my-4 text-gray-700">{error.message}</p>
      <Link href="/" className="my-4 text-gray-500 underline">
        トップへ戻る
      </Link>
    </div>
  );
}
