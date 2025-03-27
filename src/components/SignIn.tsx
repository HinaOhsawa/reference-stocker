import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth";

export default function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        // provider が指定されている場合、そのプロバイダーでサインイン
        await signIn(provider);
      }}
    >
      <Button {...props}>ログイン</Button>
    </form>
  );
}
