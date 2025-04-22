"use client";

import { useTransition } from "react";
import { UpdateUsername } from "@/app/actions/updateUsernameAction";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoadingSpinner } from "./LoadingSpinner";

// バリデーション Zod のスキーマ定義
export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "1文字以上で入力してください。" })
    .max(20, { message: "20文字以内で入力してください。" }),
});

export default function UpdateUsernameForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { name } = value;

    startTransition(async () => {
      try {
        await UpdateUsername(userId, { name });
        form.reset();
        router.push("/user-settings");
        router.refresh();
        toast.success("ユーザー名が更新されました！");
      } catch (err) {
        toast.error("ユーザー名の更新に失敗しました。");
        console.error(err);
      }
    });
  }

  return (
    <div className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField // タイトル
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">新しいユーザー名</FormLabel>
                <FormControl>
                  <Input placeholder="ユーザー名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2 flex flex-wrap justify-end">
            <Button className="mt-2" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <LoadingSpinner />
                  処理中...
                </>
              ) : (
                "更新"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
