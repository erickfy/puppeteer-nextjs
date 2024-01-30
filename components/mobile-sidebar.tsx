import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar, { SideBarProps } from "./sidebar";

export const MobileSidebar = ({ user }: SideBarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar user={user} />
      </SheetContent>
    </Sheet>
  )
}