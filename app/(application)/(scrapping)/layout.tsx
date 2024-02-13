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


  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }

  return (
    <div className="md:pl-56 pt-[80px] h-full w-full background-scrappings">
      <DynamicToolbar />
      {children}
    </div>
  );
}