"use client";
import { createPost } from "@/app/actions/createPostAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { formSchema } from "@/lib/validations/postSchema";
import PostForm from "@/components/PostForm";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // または react-hot-toast を使ってもOK

const CreatePostPage = () => {
  const router = useRouter();
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
    try {
      const { title, url, memo, published } = value;

      await createPost({ title, url, memo, tags, published });

      toast.success("投稿が作成されました！");
      router.push("/my-page/"); // リダイレクト
    } catch (error) {
      toast.error("投稿の作成に失敗しました。");
      console.error(error);
    }
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
};

export default CreatePostPage;
