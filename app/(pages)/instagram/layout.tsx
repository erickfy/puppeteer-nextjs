import { OWNER } from "@/lib/constants";

export const metadata = {
  title: "Instagram Scripping 👥",
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
