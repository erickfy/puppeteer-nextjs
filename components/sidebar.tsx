import { USER_ROLE } from "@prisma/client";
import Logo from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import { User } from "lucia";

export type SideBarProps = {
    user: {
        id: string;
        username: string;
        fullNames: string | null;
        role: USER_ROLE;
        image: string | null;
    } & User
}

const Sidebar = ({ user }: SideBarProps) => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-0">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes user={user} />
            </div>
        </div>
    )
}
export default Sidebar