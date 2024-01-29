import { OWNER } from "@/lib/constants";
import { cookies, headers } from "next/headers";

export const metadata = {
  title: "Amazon Scripping 🛍️",
  description: `Created by ${OWNER}`,
}

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
