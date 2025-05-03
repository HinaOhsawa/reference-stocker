import UpdateUsernameForm from "@/components/UpdateUsernameForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { gethUser } from "@/lib/user";
import AvatarForm from "@/components/AvatarForm";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { redirectIfUnauth } from "@/lib/redirectIfUnauth";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "lucide-react";

export default async function UserSettingsPage() {
  const session = await redirectIfUnauth(); // ログインしていない場合はリダイレクト
  const userId = session?.user?.id;

  const user = await gethUser(userId ?? "");

  if (!user || !userId) {
    return <p>ログインしてください</p>;
  }
  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">ユーザー設定</h1>
      <Card className="flex items-center gap-1">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user?.image ?? undefined} alt="@username" />
          <AvatarFallback className="w-full bg-gray-100 text-gray-400 flex items-center justify-center">
            <User size={30} />
          </AvatarFallback>
        </Avatar>

        <p className="">{user.name}</p>
        <p className="text-gray-500">{user.email}</p>
      </Card>

      <Accordion className="mt-4" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-base">
            ユーザー名を変更
          </AccordionTrigger>
          <AccordionContent>
            <UpdateUsernameForm userId={user.id} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-base">
            プロフィール画像を変更
          </AccordionTrigger>
          <AccordionContent>
            <AvatarForm userId={user.id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
