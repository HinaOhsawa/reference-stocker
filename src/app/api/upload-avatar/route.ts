// app/api/upload-avatar/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseAdmin";
import { prisma } from "@/lib/prismaClient";
import sharp from "sharp";

const maxFileSize = 2 * 1024 * 1024; // 2MB

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("avatar");
  const userId = formData.get("userId");

  // 安全性チェック
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "画像ファイルが無効です" },
      { status: 400 }
    );
  }
  if (!userId || typeof userId !== "string") {
    return NextResponse.json(
      { error: "ユーザーIDが無効です" },
      { status: 400 }
    );
  }

  if (file.size > maxFileSize) {
    return NextResponse.json(
      { error: "ファイルサイズが大きすぎます（最大2MB）" },
      { status: 400 }
    );
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "対応形式は JPEG, PNG, WEBP のみです。" },
      { status: 400 }
    );
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resizedImageBuffer = await sharp(buffer)
      .resize(300, 300)
      .jpeg({ quality: 80 })
      .toBuffer();

    const filePath = `avatars/${userId}-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, resizedImageBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    const avatarUrl = urlData.publicUrl;

    await prisma.user.update({
      where: { id: userId },
      data: { image: avatarUrl },
    });

    return NextResponse.json({ success: true, avatarUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
