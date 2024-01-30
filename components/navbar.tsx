import { SideBarProps } from "./sidebar";
import ClientOnly from "./client-only";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";


const Navbar = ({ user }: SideBarProps) => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <ClientOnly>
                <MobileSidebar user={user} />
                <NavbarRoutes user={user} />
            </ClientOnly>
        </div>
    )
}

export default Navbar;