import Link from "next/link";
import AuthButton from "./AuthButton";
import AuthNav from "./AuthNav";
import { auth } from "@/lib/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between gap-2 w-full h-16 max-w-5xl px-4 mx-auto sm:px-6">
        <Link
          href="/"
          className="
        hover:opacity-70 transition"
        >
          <h1 className="font-bold text- sm:text-xl">Reference Stocker</h1>
        </Link>
        {session?.user && <AuthNav />}
        <AuthButton />
      </div>
    </header>
  );
}
