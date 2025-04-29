import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // 本番環境では新しいPrismaClientを作成
  prisma = new PrismaClient();
} else {
  // 開発（localhost）ではglobalにキャッシュする
  const globalForPrisma = global as unknown as { prisma: PrismaClient };

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
