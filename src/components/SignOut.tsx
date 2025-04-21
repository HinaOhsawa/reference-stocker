import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default function SignOut({
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        // デフォルトでは、サインアウト後に現在のページにリダイレクトされる
        // callbackUrl を設定することも可能
        // await signOut({ callbackUrl: "/" });
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        <LogOut />
        ログアウト
      </Button>
    </form>
  );
}
