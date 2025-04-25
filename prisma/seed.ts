import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
// __dirname の代わりに import.meta.url を使用
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// seedData.json を読み込む
const seedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "seedData.json"), "utf-8")
);

async function main() {
  for (const userData of seedData.users) {
    // ユーザーを作成
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        name: userData.name,
        email: userData.email,
        image: userData.image,
      },
    });

    // ユーザーごとの投稿処理
    for (const postData of userData.posts) {
      // 投稿を作成
      await prisma.post.create({
        data: {
          title: postData.title,
          url: postData.url,
          memo: postData.memo,
          userId: user.id,
          tags: {
            connectOrCreate: postData.tags.map(
              (
                tag: string
              ): { where: { name: string }; create: { name: string } } => ({
                where: { name: tag },
                create: { name: tag },
              })
            ),
          },
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
