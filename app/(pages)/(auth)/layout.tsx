import Container from "@/components/container";
import Navbar from "@/components/test.navbar";
import { OWNER } from "@/lib/constants";

export const metadata = {
  title: "Register to Scripping 📚",
  description: `Created by ${OWNER}`,
}

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container>
      {children}
    </Container>
  );
}
