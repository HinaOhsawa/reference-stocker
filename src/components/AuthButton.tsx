import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/lib/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Link from "next/link";
import { gethUser } from "@/lib/user";
import { Settings, SquareUserRound, User as UserIcon } from "lucide-react";

export default async function AuthButton() {
  const session = await auth();
  if (!session?.user) return <SignIn provider="" />;

  const user = await gethUser(session?.user?.id ?? "");
  if (!user) {
    return <SignIn provider="" />;
  }

  return (
    <div className="flex gap-2 items-center">
      <span className="hidden text-sm sm:inline-flex"></span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative w-8 h-8 rounded-full">
            <Avatar className="w-8 h-8 border-0">
              {user.image && (
                <AvatarImage src={user.image} alt={user.name ?? ""} />
              )}
              <AvatarFallback className="bg-gray-100 text-gray-400">
                <UserIcon size={30} />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <hr className="mb-1" />
          <DropdownMenuItem>
            <Link
              className="w-full flex gap-2 justify-center p-2"
              href="/my-page"
            >
              <SquareUserRound />
              マイページ
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              className="w-full flex gap-2 justify-center p-2"
              href="/user-settings"
            >
              <Settings />
              ユーザー設定
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
