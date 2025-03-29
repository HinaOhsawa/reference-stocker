import AuthButton from "./AuthButton";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 container px-4 mx-auto sm:px-6">
        <h1 className="font-bold">Reference Stocker</h1>
        <Nav />
        <AuthButton />
      </div>
    </header>
  );
}
