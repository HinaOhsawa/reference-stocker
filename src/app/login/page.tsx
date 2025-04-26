"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SignIn from "@/components/SignIn";

function SignInInner() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <p className="mb-4">ログインして、投稿してみましょう！</p>
      <SignIn provider="google" callbackUrl={callbackUrl} />
    </div>
  );
}

// Suspenseの中でしかフックが使えないため分離
export default function SignInPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <SignInInner />
    </Suspense>
  );
}
