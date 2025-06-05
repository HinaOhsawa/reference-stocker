# Reference 　 Stocker

学習に使った参考記事や動画のリンクを保存・共有するためのサイトです。
Next.js + TypeScript + Supabase + Prisma を使用して作成しました。記事の投稿、編集、削除、ブックマークができる掲示板のようなアプリです。NextAuth.js でログイン機能を実装しています。

## 🚀 デモ

- [https://reference-stocker.onrender.com/](https://reference-stocker.onrender.com/)

## 仕様

- ホームの記事一覧は新しい記事から上位に表示されます。
- トップの検索窓から記事を検索できます。
- 記事をクリックすると記事詳細ページへ飛びます。
- 記事詳細ページではタグに基づいた関連記事が最大 5 件表示されます。

- ログインボタンからユーザー登録・ログイン（Google ログイン）ができます。
- ログインすると、記事の作成や、ブックマーク機能を使えます。
- ログインすると、右上のアイコンからメニューを開けます。
- メニューからログアウトすることができます。

- 新規作成ボタンから記事を作成できます。
- 記事にはタイトル、リンク、メモ、タグを含めることができます。
- 記事を公開か非公開か設定できます。

- マイページから記事の編集、削除ができます。
- マイページでは、自分のユーザー情報、自分の投稿、ブックマークした記事を確認できます。
- ブックマークを解除するにはもう一度ボタンをクリックすると表示が変わります。

- ユーザー設定では、ユーザー名とプロフィール画像を変更できます。

## 使用技術

- React
- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- Supabase
- NextAuth.js
- shad/ui
- zod
- YouTube Data API v3
- Render

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
