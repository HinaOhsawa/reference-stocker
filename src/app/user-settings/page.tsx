// "use client";
import UpdateUsernameForm from "@/components/UpdateUsernameForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/lib/user";
import { auth } from "@/lib/auth";

export default async function UserSettingsPage() {
  const session = await auth();
  const userId = await session?.user?.id;

  if (!userId) {
    return <p>ログインしてください</p>;
  }
  const user = await getUser(userId);

  if (!user || !userId) {
    return <p>ログインしてください</p>;
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">ユーザー設定</h1>
      <Avatar className="w-8 h-8">
        <AvatarImage src={user.image} alt="@username" />
      </Avatar>
      <div className="flex gap-4">
        <p className="mb-4">ユーザー名: {user.name}</p>
        <UpdateUsernameForm userId={user.id} />
      </div>
      <p className="mb-4">email: {user.email}</p>
    </>
  );
}
