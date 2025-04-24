"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function SignOut() {
  const handleSignOut = async () => {
    toast.success("ログアウトしました。");
    await signOut({ callbackUrl: "/" }); // ログアウト後にトップへリダイレクト
  };
  return (
    <Button onClick={handleSignOut} variant="ghost" className="w-full p-0">
      <LogOut />
      ログアウト
    </Button>
  );
}
