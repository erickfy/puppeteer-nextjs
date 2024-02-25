import Container from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { validateRequest } from "@/lib/auth";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const DynamicNavbar = dynamic(
    () => import('@/components/navbar'),
    {
        loading: () => <Skeleton className="w-full h-[60px]" />,
        ssr: false
    }
)
const DynamicSideBar = dynamic(
    () => import('@/components/sidebar'),
    {
        loading: () => <Skeleton className="w-full h-full" />,
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
        <>
            <div className="w-full ">
                <header>
                    <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                        <DynamicNavbar user={user} />
                    </div>
                    <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                        <DynamicSideBar user={user} />
                    </div>
                </header>

                <main>
                    {children}
                </main>

            </div>
        </>
    );
}