import { buttonVariants } from "./ui/button";
import { Pen, SquareUserRound } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AuthNav() {
  return (
    <nav className="flex gap-2 md:gap-4">
      <Link
        href="/post/create"
        className={cn(buttonVariants({ variant: "default" }))}
      >
        <Pen className="w-4 h-4" />

        <span className="">新規作成</span>
      </Link>
      <Link
        href="/my-page"
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "hidden  sm:inline-flex"
        )}
      >
        <SquareUserRound className="w-4 h-4" />
        <span className="">マイページ</span>
      </Link>
    </nav>
  );
}
