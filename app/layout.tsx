import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { OWNER } from "@/lib/constants";
import RootProvider from "@/components/providers/root-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login to Scriping 🤖",
  description: `Created by ${OWNER}`,
};

export default function RootLayout({ children, login }: Readonly<{
  children: React.ReactNode;
  login: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)} >
        <RootProvider />
        {children}
      </body>
    </html>
  );
}