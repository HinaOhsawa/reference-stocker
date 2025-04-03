"use client";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { useEffect, useState } from "react";
import { getPostDetail } from "@/lib/posts";
import { updatePost } from "@/app/actions/updatePostAction";

// タグのスキーマ
const tagSchema = z.object({
  name: z.string().min(1, "タグ名は必須です"), // nameの型を指定
});

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
  tags: z.array(tagSchema).optional(),
  // tags: z.array(z.string()).optional(),
  published: z.boolean(),
});

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false); // 公開状態の初期値
  const form = useForm({
    //zodResolver は Zod を React Hook Form で使うための関数
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      memo: "",
      tags: [],
      published: false,
    },
  });

  // 記事データを取得
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostDetail(id);
        form.reset(post); // フォームにデータをセット

        //post.tags の各タグから name プロパティを取り出し、それを配列として setTags にセット
        setTags(post.tags?.map((tag) => tag.name) ?? []); // タグをセット
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id, form]);

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { title, url, memo, published } = value;
    // サーバーアクションを使う
    updatePost({ title, url, memo, tags, published }, id);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 max-w-4xl mx-auto px-4"
      >
        <FormField // タイトル
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

        <FormField // URL
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

        <FormField // メモ
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

        <FormField // タグ
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">タグ</FormLabel>
              <FormControl>
                <TagInput
                  placeholder="タグを編集"
                  tags={tags}
                  setTags={setTags}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField // 公開設定
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">公開</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-sm text-muted-foreground">
                    {isPublished
                      ? "記事を公開します"
                      : "下書きとして保存します"}
                  </p>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                      setIsPublished(value);
                    }}
                  />
                </div>
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
}
