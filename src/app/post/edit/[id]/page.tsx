"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { fetchPostDetail } from "@/lib/posts";
import { updatePost } from "@/app/actions/updatePostAction";
import PostForm from "@/components/PostForm";
import { formSchema } from "@/lib/validations/postSchema";

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
        const post = await fetchPostDetail(id);
        if (!post) return <p>Post not found</p>;
        // フォームにデータをセット
        form.reset({
          title: post.title,
          url: post.url,
          memo: post.memo ?? undefined,
          tags: post.tags?.map((tag) => tag.name) ?? [],
          published: post.published,
        });

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
    </>
  );
}
