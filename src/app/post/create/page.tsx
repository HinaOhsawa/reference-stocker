"use client";
import { createPost } from "@/app/actions/createPostAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { formSchema } from "@/lib/validations/postSchema";
import PostForm from "@/components/PostForm";

const CreatePostPage = () => {
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

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { title, url, memo, published } = value;
    // サーバーアクションを使う
    createPost({ title, url, memo, tags, published });
  }

  return (
    <>
      <h2 className="text-xl font-bold">新しい記事を作成</h2>
      <PostForm
        form={form}
        onSubmit={onSubmit}
        tags={tags}
        setTags={setTags}
        isPublished={isPublished}
        setIsPublished={setIsPublished}
      />
      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-3 max-w-4xl mx-auto "
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
                  <TagInput tags={tags} setTags={setTags} {...field} />
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
          <Button className="font-bold mt-4" type="submit">
            確定
          </Button>
        </form>
      </Form> */}
    </>
  );
};

export default CreatePostPage;
