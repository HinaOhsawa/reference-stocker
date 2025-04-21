import { buttonVariants } from "./ui/button";
import { Pen, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <nav className="flex gap-4">
      <Link
        href="/post/create"
        className={cn(buttonVariants({ variant: "default" }))}
      >
        <Pen />
        新規作成
      </Link>
      <Link
        href="/my-page"
        className={cn(buttonVariants({ variant: "secondary" }))}
      >
        <User />
        マイページ
      </Link>
    </nav>
  );
}
