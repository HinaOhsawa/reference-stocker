import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { buttonVariants } from "./ui/button";
import { Pen } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/my-page">My Page</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/post/create"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Pen /> New Create
          </Link>
          {/* <NavigationMenuTrigger>Item One</NavigationMenuTrigger> */}
          {/* <NavigationMenuContent>
          <NavigationMenuLink>New Create</NavigationMenuLink>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
