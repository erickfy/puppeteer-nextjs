import { OWNER } from "@/lib/constants";

export const metadata = {
  title: "Ingreso | Scrapeador de paginas 📚",
  description: `Scrapeador de paginas \n
  Creado por ${OWNER}`,
}

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="background-auth">
      {children}
    </div>
  );
}