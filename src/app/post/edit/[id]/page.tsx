"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { fetchPostDetail } from "@/lib/posts";
import { updatePost } from "@/app/actions/updatePostAction";
import PostForm from "@/components/PostForm";
import { formSchema } from "@/lib/validations/postSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
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
        setIsPublished(post.published);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id, form]);

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      const { title, url, memo, published } = value;

      await updatePost({ title, url, memo, tags, published }, id);

      toast.success("投稿が更新されました！");
      router.push("/my-page/"); // リダイレクト
    } catch (error) {
      toast.error("投稿の更新に失敗しました。");
      console.error(error);
    }
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
      />
    </>
  );
}
