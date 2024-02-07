"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftRight, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { USER_ROLE } from "@prisma/client";
import { DropdownMenuUI } from "./dropdown-menu-ui";
import SearchInput from "./search-input";
import { SideBarProps } from "./sidebar";
import axios from "axios";

enum USER_MODE {
  ADMIN = "Administrador",
  CLIENT = "Cliente"
}

export const NavbarRoutes = ({ user }: SideBarProps) => {
  const pathname = usePathname();
  const router = useRouter()

  const isAdmin = user.role === USER_ROLE.ADMIN
  const isAdminPage = pathname?.startsWith("/admin");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/teacher";

  let usernameWords = ""

  if (user?.fullNames) {

    usernameWords = user.fullNames.split(' ').length >= 2 ? user.fullNames.split(' ')[0].charAt(0).toUpperCase() + user.fullNames.split(' ')[1].charAt(0).toUpperCase() : user.fullNames.charAt(0).toUpperCase() + user.fullNames.charAt(1).toUpperCase()
  }

  return (
    <>

      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {/* {isAdminPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              exit
            </Button>
          </Link>
        ) : isTeacher(null) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null} */}
        <DropdownMenuUI
          trigger={
            <Avatar className="cursor-pointer" >
              <AvatarImage src={user.image || undefined} alt={user.username} />
              <AvatarFallback>
                {/* {`${user.username.charAt(0)}${user.username.charAt(1)}`} */}
                {usernameWords}
              </AvatarFallback>
            </Avatar>}
          menuTitle={user.username.toLocaleUpperCase()}
          roleUser={isAdmin ? USER_MODE.ADMIN : USER_MODE.CLIENT}
        />
      </div>
    </>
  )
}