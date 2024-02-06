'use client'

import { Layers, Search, Users } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { SideBarProps } from "./sidebar";
import { routes } from "@/routes";
import { USER_ROLE } from "@prisma/client";

export const SidebarRoutes = ({ user }: SideBarProps) => {
  const isAdmin = user.role && user.role === USER_ROLE.ADMIN ? true : false

  // both routes 
  const adminRoutes = [
    {
      icon: Users,
      label: "Usuarios",
      href: "/users",
    },
    {
      icon: Search,
      label: "Busquedas",
      href: "/searchs",
    },
    {
      icon: Layers,
      label: "Scrapear",
      href: "/instagram",
    },
  ]
  const clientRoutes = [
    {
      icon: Search,
      label: "Busquedas",
      href: "/searchs",
    },
    {
      icon: Layers,
      label: "Scrapear",
      href: "/instagram",
    },
  ];

  const sideBarRoutes = isAdmin ? adminRoutes : clientRoutes;

  return (
    <div className="flex flex-col w-full">
      {sideBarRoutes.length !== 0 && sideBarRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}