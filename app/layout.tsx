import { cookies, headers } from "next/headers";

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import Container from "@/components/container";
import { OWNER } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });


type Props = {
  params: { id: string }
}

export const metadata = {
  title: "Scriping",
  description: `Created by ${OWNER}`,
};

export default function RootLayout({ children, params }: Readonly<{
  children: React.ReactNode;
  params: string
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "w-full h-full")}>
        <Navbar />
        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}
