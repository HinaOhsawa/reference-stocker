# ReferenceStocker

学習に使った参考記事や動画のリンクを保存・共有するためのサイトです。
Next.js + TypeScript + Supabase + Prisma を使用して作成しました。記事の投稿、編集、削除、ブックマークができる掲示板のようなアプリです。NextAuth.js でログイン機能を実装しています。

![サイトトップ](./public/images/og-image.jpg)

## 🚀 デモ

- [https://reference-stocker.onrender.com/](https://reference-stocker.onrender.com/)

## ✔️仕様

- ホームの記事一覧は新しい記事から上位に表示されます。
- トップの検索窓から記事を検索できます。
- 記事をクリックすると記事詳細ページへ飛びます。
- 記事詳細ページではタグに基づいた関連記事が最大 5 件表示されます。

---

- ログインボタンからユーザー登録・ログイン（Google ログイン）ができます。
- ログインすると、記事の作成や、ブックマーク機能を使えます。
- ログインすると、右上のアイコンからメニューを開けます。
- メニューからログアウトすることができます。

---

- 新規作成ボタンから記事を作成できます。
- 記事にはタイトル、リンク、メモ、タグを含めることができます。
- 記事を公開か非公開か設定できます。

---

- マイページから記事の編集、削除ができます。
- マイページでは、自分のユーザー情報、自分の投稿、ブックマークした記事を確認できます。
- ブックマークを解除するにはもう一度ボタンをクリックすると表示が変わります。

---

- ユーザー設定では、ユーザー名とプロフィール画像を変更できます。

## 使用技術

<table border="1">
  <thead>
    <tr>
      <th>項目</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
      <tr>
      <td>Node.js</td>
      <td>JavaScriptの実行環境</td>
    </tr>
    <tr>
      <td>React</td>
      <td>ライブラリ</td>
    </tr>
    <tr>
      <td>Next.js</td>
      <td>Reactベースのフレームワーク</td>
    </tr>
    <tr>
      <td>TypeScript</td>
      <td>JavaScriptの型付け言語</td>
    </tr>
    <tr>
      <td>Tailwind CSS</td>
      <td>CSSフレームワーク</td>
    </tr>
    <tr>
      <td>Prisma</td>
      <td>ORM</td>
    </tr>
    <tr>
      <td>Supabase</td>
      <td>データベース・ストレージサービス</td>
    </tr>
    <tr>
      <td>PostgreSQL</td>
      <td>リレーショナルデータベース</td>
    </tr>
    <tr>
      <td>NextAuth.js</td>
      <td>認証ライブラリ</td>
    </tr>
    <tr>
      <td>shadcn/ui</td>
      <td>UIコンポーネントライブラリ</td>
    </tr>
    <tr>
      <td>zod</td>
      <td>バリデーションライブラリ</td>
    </tr>
    <tr>
      <td>YouTube Data API v3</td>
      <td>YouTubeのOGP情報を取得するAPI</td>
    </tr>
    <tr>
      <td>Render</td>
      <td>ホスティングサービス</td>
    </tr>
    <tr>
      <td>lucide</td>
      <td>アイコンセット</td>
    </tr>
  </tbody>
</table>

## Run Command

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

## Build Command

```bash
npx prisma generate && next build
```

## Start Command

```bash
npm run start
```

## データベース構造

### Post テーブル

<table border="1">
  <thead>
    <tr>
      <th>フィールド名</th>
      <th>型</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>String</td><td>主キー（cuid）</td></tr>
    <tr><td>title</td><td>String</td><td>タイトル</td></tr>
    <tr><td>url</td><td>String</td><td>リンク先URL</td></tr>
    <tr><td>memo</td><td>String?</td><td>任意メモ</td></tr>
    <tr><td>userId</td><td>String</td><td>投稿者のID</td></tr>
    <tr><td>published</td><td>Boolean</td><td>公開フラグ（デフォルト: true）</td></tr>
    <tr><td>createdAt</td><td>DateTime</td><td>作成日時</td></tr>
    <tr><td>updatedAt</td><td>DateTime</td><td>更新日時</td></tr>
    <tr><td>Bookmarks</td><td>Bookmark[]</td><td>ブックマークとのリレーション</td></tr>
    <tr><td>user</td><td>User</td><td>投稿者とのリレーション</td></tr>
    <tr><td>tags</td><td>Tag[]</td><td>タグとの多対多リレーション</td></tr>
  </tbody>
</table>

### User テーブル

<table border="1">
  <thead>
    <tr>
      <th>フィールド名</th>
      <th>型</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>String</td><td>主キー（cuid）</td></tr>
    <tr><td>name</td><td>String?</td><td>ユーザー名（任意）</td></tr>
    <tr><td>email</td><td>String?</td><td>メールアドレス（ユニーク）</td></tr>
    <tr><td>image</td><td>String?</td><td>プロフィール画像URL</td></tr>
    <tr><td>createdAt</td><td>DateTime</td><td>作成日時</td></tr>
    <tr><td>updatedAt</td><td>DateTime</td><td>更新日時</td></tr>
    <tr><td>accounts</td><td>Account[]</td><td>アカウント情報</td></tr>
    <tr><td>Bookmarks</td><td>Bookmark[]</td><td>ブックマーク一覧</td></tr>
    <tr><td>posts</td><td>Post[]</td><td>ユーザーの投稿一覧</td></tr>
  </tbody>
</table>

### Account テーブル

<table border="1">
  <thead>
    <tr>
      <th>フィールド名</th>
      <th>型</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>String</td><td>主キー（cuid）</td></tr>
    <tr><td>userId</td><td>String</td><td>ユーザーID</td></tr>
    <tr><td>provider</td><td>String</td><td>OAuthプロバイダー名（例: github）</td></tr>
    <tr><td>providerAccountId</td><td>String</td><td>プロバイダー側のID</td></tr>
    <tr><td>createdAt</td><td>DateTime</td><td>作成日時</td></tr>
    <tr><td>updatedAt</td><td>DateTime</td><td>更新日時</td></tr>
    <tr><td>user</td><td>User</td><td>リレーション：紐づくユーザー</td></tr>
  </tbody>
</table>

### Tag テーブル

<table border="1">
  <thead>
    <tr>
      <th>フィールド名</th>
      <th>型</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>String</td><td>主キー（cuid）</td></tr>
    <tr><td>name</td><td>String</td><td>タグ名（ユニーク）</td></tr>
    <tr><td>createdAt</td><td>DateTime</td><td>作成日時</td></tr>
    <tr><td>updatedAt</td><td>DateTime</td><td>更新日時</td></tr>
    <tr><td>posts</td><td>Post[]</td><td>リレーション：紐づく投稿一覧</td></tr>
  </tbody>
</table>

### Bookmark テーブル

<table border="1">
  <thead>
    <tr>
      <th>フィールド名</th>
      <th>型</th>
      <th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>id</td><td>String</td><td>主キー（uuid）</td></tr>
    <tr><td>userId</td><td>String</td><td>ユーザーID</td></tr>
    <tr><td>postId</td><td>String</td><td>投稿ID</td></tr>
    <tr><td>createdAt</td><td>DateTime</td><td>作成日時</td></tr>
    <tr><td>post</td><td>Post</td><td>リレーション：投稿</td></tr>
    <tr><td>user</td><td>User</td><td>リレーション：ユーザー</td></tr>
  </tbody>
</table>
