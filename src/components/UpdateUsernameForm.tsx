"use client";

import { useState, useTransition } from "react";
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

// バリデーション Zod のスキーマ定義
export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "タイトルは2文字以上で入力してください。" })
    .max(20, { message: "本文は20文字以内で入力してください。" }),
});

export default function UpdateUsernameForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { name } = value;
    setShowModal(false);
    startTransition(async () => {
      try {
        await UpdateUsername(userId, { name });
      } catch (err) {
        console.error(err);
      }
    });
    router.push("/user-settings"); // 更新後にトップページへリダイレクト
  }

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        disabled={isPending}
        variant="secondary"
        className=""
      >
        {isPending ? "処理中..." : "変更"}
      </Button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="fixed inset-0 flex opacity-25 bg-black"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2>ユーザー名を変更</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField // タイトル
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">
                        新しいユーザー名
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ユーザー名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between space-x-2">
                  <Button
                    onClick={() => setShowModal(false)}
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    キャンセル
                  </Button>
                  <Button className="font-bold" type="submit">
                    更新
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
