import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkRole } from "~/utils/roles";
import { routerConfig } from "../router-config";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAdmin = await checkRole("admin");
  const { redirectToSignIn, userId } = await auth();

  if (!isAdmin && !userId) {
    redirectToSignIn();
  }

  if (!isAdmin && userId) {
    redirect(routerConfig.root.path);
  }

  return children;
}
