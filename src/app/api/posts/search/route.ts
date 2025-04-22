import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("q");

    if (!keyword) {
      return NextResponse.json(
        { error: "検索キーワードが指定されていません。" },
        { status: 400 }
      );
    }

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const pageSize = Math.max(
      1,
      parseInt(searchParams.get("pageSize") || "10")
    );
    const skip = (page - 1) * pageSize;

    const whereCondition = {
      published: true,
      OR: [
        { title: { contains: keyword, mode: "insensitive" as const } },
        { memo: { contains: keyword, mode: "insensitive" as const } },
        {
          tags: {
            some: {
              name: { contains: keyword, mode: "insensitive" as const },
            },
          },
        },
      ],
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: whereCondition,
        include: { tags: true, user: true },
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count({ where: whereCondition }),
    ]);

    return NextResponse.json({
      posts,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("検索APIでエラー:", error);
    return NextResponse.json(
      { error: "サーバーでエラーが発生しました。" },
      { status: 500 }
    );
  }
}
