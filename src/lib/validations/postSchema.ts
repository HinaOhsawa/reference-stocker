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
    .max(200, { message: "URLは200文字以内で入力してください。" }),
  memo: z
    .string()
    .max(300, { message: "本文は300文字以内で入力してください。" })
    .optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean(),
});
