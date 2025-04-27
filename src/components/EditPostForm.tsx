// components/EditPostForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/validations/postSchema";
import { z } from "zod";
import { updatePost } from "@/app/actions/updatePostAction";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import PostForm from "@/components/PostForm";

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    url: string;
    memo?: string | null;
    tags?: { name: string }[];
    published: boolean;
  };
};

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>(
    post.tags?.map((tag) => tag.name) ?? []
  );
  const [isPublished, setIsPublished] = useState(post.published);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      url: post.url,
      memo: post.memo ?? "",
      tags: tags,
      published: isPublished,
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { title, url, memo, published } = value;

      await updatePost({ title, url, memo, tags, published }, post.id);

      toast.success("投稿が更新されました！");
      router.push("/my-page/");
    } catch (error) {
      console.error(error);
      toast.error("投稿の更新に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PostForm
      form={form}
      onSubmit={onSubmit}
      tags={tags}
      setTags={setTags}
      isPublished={isPublished}
      setIsPublished={setIsPublished}
      isSubmitting={isSubmitting}
    />
  );
}
