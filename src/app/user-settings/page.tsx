// "use client";
import UpdateUsernameForm from "@/components/UpdateUsernameForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { fetchUser } from "@/lib/user";
import { auth } from "@/lib/auth";
import AvatarForm from "@/components/AvatarForm";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function UserSettingsPage() {
  const session = await auth();
  const userId = await session?.user?.id;

  if (!userId) {
    return <p>ログインしてください</p>;
  }
  const user = await fetchUser(userId);

  if (!user || !userId) {
    return <p>ログインしてください</p>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ユーザー設定</h1>
      <Card className="flex items-center gap-1">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.image} alt="@username" />
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
