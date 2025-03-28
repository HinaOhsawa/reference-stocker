import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";

export default function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button>
            <Pen /> New Create
          </Button>
          {/* <NavigationMenuTrigger>Item One</NavigationMenuTrigger> */}
          {/* <NavigationMenuContent>
          <NavigationMenuLink>New Create</NavigationMenuLink>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
