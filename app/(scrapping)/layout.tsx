import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { validateRequest } from "@/lib/auth";
import { USER_ROLE } from "@prisma/client";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

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
const DynamicToolbar = dynamic(
  () => import('@/components/toolbar/toolbar'),
  {
    loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
    ssr: false
  }
)

export default async function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {


  const { user,session } = await validateRequest()
  console.log(session)
  if (!session && !user) {
    return redirect('/protected')
  }

  return (
    <>
      <div className="w-full ">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <DynamicNavbar user={user} />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <DynamicSideBar user={user} />
        </div>

        <main className="md:pl-56 pt-[80px] h-full w-full ">
          <DynamicToolbar />
          <Container>
            {children}
          </Container>

        </main>
      </div>
    </>
  );
}