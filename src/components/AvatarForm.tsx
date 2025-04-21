"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const formSchema = z.object({
  avatar: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "画像サイズは2MB以下にしてください。",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "対応形式は JPEG, PNG, WEBP のみです。",
      }
    ),
});

export default function AvatarForm({ userId }: { userId: string }) {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("Selected file:", file);
    form.setValue("avatar", file);
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(undefined);
  };

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setUploading(true);
    if (!value.avatar) return;

    const formData = new FormData();
    formData.append("avatar", value.avatar);
    formData.append("userId", userId); // propsなどから渡されたID

    const res = await fetch("/api/upload-avatar", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (!res.ok) {
      setUploading(false);
      alert(`アップロードに失敗しました: ${result.error}`);
      return;
    }

    setPreview(undefined);
    setUploading(false);
    // アップロード成功のトーストを実装

    router.push("/user-settings"); // 更新後にトップページへリダイレクト
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Label htmlFor="avatar" className="">
            新しいプロフィール画像
          </Label>

          <div className="relative group">
            <Avatar className="w-16 h-16">
              <AvatarImage src={preview} alt="ユーザーアバター" />
              <AvatarFallback className="bg-gray-100 text-gray-400">
                <User size={30} />
              </AvatarFallback>
            </Avatar>

            {preview && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                onClick={handleRemove}
              >
                ×
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center">
            <FormField // タイトル
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem>
                  <FormLabel
                    className="flex items-center justify-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors"
                    htmlFor="avatar-upload"
                  >
                    <Upload size={18} />
                    画像を選択
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/jpeg, image/png, image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-xs text-center text-gray-500">
            JPG、PNG、GIF形式の画像をアップロードできます（最大2MB）
          </p>
        </div>

        <div className="mt-2 flex flex-wrap justify-end">
          <Button type="submit" className="" disabled={!preview || uploading}>
            {uploading ? "アップロード中..." : "更新"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
