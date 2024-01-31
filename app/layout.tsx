
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Container from "@/components/container";
import { OWNER } from "@/lib/constants";
import RootProvider from "@/components/providers/root-provider";
import ClientOnly from "@/components/client-only";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login to Scriping 🤖",
  description: `Created by ${OWNER}`,
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen min-w-screen')} >
        <RootProvider />
          <ClientOnly>
            {children}
          </ClientOnly>
      </body>
    </html>
  );
}
