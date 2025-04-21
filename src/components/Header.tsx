import Link from "next/link";
import AuthButton from "./AuthButton";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 container px-4 mx-auto sm:px-6">
        <Link
          href="/"
          className="
        hover:opacity-70 transition"
        >
          <h1 className="font-bold text-xl">Reference Stocker</h1>
        </Link>
        <Nav />
        <AuthButton />
      </div>
    </header>
  );
}
