"use client";
import { createPost } from "@/app/actions/postAction";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// バリデーション Zod のスキーマ定義
export const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "タイトルは2文字以上で入力してください。" })
    .max(50, { message: "本文は50文字以内で入力してください。" }),
  url: z
    .string()
    .url({ message: "URLの形式が正しくありません。" })
    .max(100, { message: "URLは100文字以内で入力してください。" }),
  memo: z
    .string()
    .max(200, { message: "本文は200文字以内で入力してください。" })
    .optional(),
});

const CreatePostPage = () => {
  // const router = useRouter();

  const form = useForm({
    //zodResolver は Zod を React Hook Form で使うための関数
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      memo: "",
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { title, url, memo } = value;
    // サーバーアクションを使う
    createPost({ title, url, memo });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 max-w-4xl mx-auto px-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトル" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">URL</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="URL"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">メモ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="メモ"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="font-bold" type="submit">
          確定
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostPage;
