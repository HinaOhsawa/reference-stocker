import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function redirectIfUnauth() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login"); // ログインページへリダイレクト
  }

  return session;
}
