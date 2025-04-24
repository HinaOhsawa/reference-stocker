"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignIn({
  provider,
  callbackUrl = "/",
}: {
  provider: string;
  callbackUrl?: string;
}) {
  return (
    <Button onClick={() => signIn(provider, { callbackUrl })}>ログイン</Button>
  );
}
