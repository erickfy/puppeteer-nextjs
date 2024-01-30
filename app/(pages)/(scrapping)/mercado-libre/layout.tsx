import { OWNER } from "@/lib/constants";

export const metadata = {
  title: "Mercado Libre Scripping 🛒",
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
