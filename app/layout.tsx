import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { OWNER } from "@/lib/constants";
import RootProvider from "@/components/providers/root-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scrapeador 🤖",
  description: `Una forma de scrapear sitios web | creado por ${OWNER}`,
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
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