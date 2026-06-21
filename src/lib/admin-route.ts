import { redirect } from "@tanstack/react-router";
import { getSession } from "@/fns/auth";

export async function requireAdminSession() {
  const session = await getSession();
  if (!session) throw redirect({ to: "/admin/login" });
  return session;
}
