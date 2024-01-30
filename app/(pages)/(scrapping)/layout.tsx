import Container from "@/components/container";
import Navbar from "@/components/test.navbar";
import { Skeleton } from "@/components/ui/skeleton";
import getCurrentUser from "@/data/getCurrentUser";
import { OWNER } from "@/lib/constants";
import dynamic from "next/dynamic";


const DynamicNavbar = dynamic(
  () => import('@/components/navbar'),
  {
    loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
    ssr: false
  }
)
const DynamicSideBar = dynamic(
  () => import('@/components/sidebar'),
  {
    loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
    ssr: false
  }
)

export default async function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  const { userPrivileges } = getCurrentUser()
  const user = await userPrivileges()

  console.log("there is user?", user)

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        {/* <DynamicNavbar user={user} /> */}
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        {/* <DynamicSideBar user={user} /> */}
      </div>

      <main className="md:pl-56 pt-[80px] h-full">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
}
