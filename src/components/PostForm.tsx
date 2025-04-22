"use client";

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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/TagInput";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/validations/postSchema";
import { LoadingSpinner } from "./LoadingSpinner";

type Props = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  isPublished: boolean;
  setIsPublished: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
};

export default function PostForm({
  form,
  onSubmit,
  tags,
  setTags,
  isPublished,
  setIsPublished,
  isSubmitting,
}: Props) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 space-y-3 max-w-5xl mx-auto "
      >
        <FormField // タイトル
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
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
            <FormItem className="mb-4">
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
            <FormItem className="mb-4">
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
            <FormItem className="mb-4">
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
            <FormItem className="mb-4">
              <FormLabel className="font-bold">公開</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 justify-between sm:justify-start">
                  <p className="text-sm text-muted-foreground justify-between w-50">
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
        <div className="flex justify-center mt-6">
          <Button className="font-bold" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner />
                送信中...
              </span>
            ) : (
              "確定"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
