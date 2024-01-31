import { USER_ROLE } from "@prisma/client";
import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export type SideBarProps = {
    user: {
        id: string;
        username: string;
        fullNames: string | null;
        role: USER_ROLE;
        image: string | null;
    }
}

const Sidebar = ({ user }: SideBarProps) => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-4">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes user={user} />
            </div>
        </div>
    )
}
export default Sidebar