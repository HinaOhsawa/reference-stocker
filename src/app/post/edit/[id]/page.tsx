"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { fetchPostDetail } from "@/lib/posts";
import { updatePost } from "@/app/actions/updatePostAction";
import PostForm from "@/components/PostForm";
import { formSchema } from "@/lib/validations/postSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function EditPostPage() {
  const { status } = useAuthRedirect(); // ログインチェック
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramId = searchParams.get("id");

  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      memo: "",
      tags: [],
      published: false,
    },
  });

  useEffect(() => {
    // const paramId = searchParams.get("id");

    const fetchPost = async () => {
      if (!paramId) return;
      try {
        const post = await fetchPostDetail(paramId);

        if (!post) {
          setNotFound(true);
          return;
        }

        form.reset({
          title: post.title,
          url: post.url,
          memo: post.memo ?? undefined,
          tags: post.tags?.map((tag) => tag.name) ?? [],
          published: post.published,
        });

        setTags(post.tags?.map((tag) => tag.name) ?? []);
        setIsPublished(post.published);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [paramId, form]);

  async function onSubmit(value: z.infer<typeof formSchema>) {
    if (!paramId) {
      toast.error("投稿が見つかりませんでした。");
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);

    // const paramId = searchParams.get("id");

    try {
      const { title, url, memo, published } = value;

      await updatePost({ title, url, memo, tags, published }, paramId);

      toast.success("投稿が更新されました！");
      router.push("/my-page/");
    } catch (error) {
      toast.error("投稿の更新に失敗しました。");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <>
        <LoadingSpinner />
        <p>読み込み中...</p>
      </>
    );
  }

  if (notFound) {
    return <p>投稿が見つかりませんでした。</p>;
  }

  return (
    <>
      <h2 className="text-xl font-bold">記事を編集</h2>
      <PostForm
        form={form}
        onSubmit={onSubmit}
        tags={tags}
        setTags={setTags}
        isPublished={isPublished}
        setIsPublished={setIsPublished}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
