import { NextAuthConfig } from "next-auth";
// import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prismaClient";

export const authConfig = {
  session: { strategy: "jwt" },
  // secret: process.env.AUTH_SECRET,
  // theme: {
  //   logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  // },
  debug: true,
  // 認証プロバイダーの設定
  providers: [
    // Github({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // 認証のカスタマイズ処理（ページ制限 & JWT のカスタマイズ）
  callbacks: {
    // authorized({ request, auth }) {
    //   try {
    //     const { pathname } = request.nextUrl;
    //     if (pathname === "/bbs-posts/create") return !!auth;
    //     return true;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async jwt({ token, trigger, session }) {
    //   if (trigger === "update") token.name = session.user.name;
    //   return token;
    // },

    async signIn({ account, user }) {
      if (!account || !user) return false;

      let existingUser = null;

      // Email がある場合は email でユーザーを検索
      if (user.email) {
        existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true }, // 既存のアカウント情報も取得
        });
        // 既存の user があり、同じ provider の account がなければ作成
        if (
          existingUser &&
          !existingUser.accounts.some(
            (acc) => acc.provider === account.provider
          )
        ) {
          await prisma.account.create({
            data: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              user: { connect: { id: existingUser.id } },
            },
          });
        }
      } else {
        // Email がない場合は既存のユーザーを探す
        existingUser = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          include: { user: true },
        });
      }

      if (!existingUser) {
        // 新規ユーザーなら作成
        await prisma.user.create({
          data: {
            name: user.name || "",
            email: user.email ?? "",
            image: user.image ? String(user.image) : "",
            accounts: {
              create: {
                provider: String(account.provider),
                providerAccountId: String(account.providerAccountId),
              },
            },
          },
        });
      }

      return true;
    },
    async session({ session }) {
      // Prisma でユーザー情報を取得し、ID を追加
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (dbUser) {
        session.user.id = dbUser.id; // ユーザーIDを追加
      }

      return session;
    },
  },
} satisfies NextAuthConfig; // 型チェックのみ行い、型の推論を保持
