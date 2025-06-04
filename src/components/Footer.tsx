import Link from "next/link";

export default async function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className=" px-4 py-10 mx-auto  max-w-5xl">
        {/* 会社情報 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Reference Stocker</h3>
          <p className="text-sm text-muted-foreground">
            学習に使った参考記事や動画のリンクを保存・共有するためのサイト
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* クイックリンク */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  ホーム
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  X
                </Link>
              </li>
              <li></li>
            </ul>
          </div>

          {/* ガイド */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Guides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  使い方ガイド
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground hover:underline"
                >
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 著作権 */}
        <div className="pt-8 mt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2025 Reference Stocker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
