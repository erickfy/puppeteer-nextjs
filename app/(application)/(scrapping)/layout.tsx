import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { validateRequest } from "@/lib/auth";
import { USER_ROLE } from "@prisma/client";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";


const DynamicToolbar = dynamic(
  () => import('@/components/toolbar/toolbar'),
  {
    loading: () => <Skeleton className="w-full h-[60px]" />,
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