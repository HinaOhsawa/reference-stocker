import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// GET /api/posts?page=1&pageSize=10
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const skip = (page - 1) * pageSize;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      include: { tags: true, user: true },
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" }, // 並び順を指定
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  return NextResponse.json({
    posts,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}
