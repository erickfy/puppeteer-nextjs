"use client";

import { AlertOctagon, CarTaxiFront, Globe2, KeySquare, User, UserSquare, Users, Waypoints } from "lucide-react";
import { usePathname } from "next/navigation";


import { SidebarItem } from "./sidebar-item";
import { SideBarProps } from "./sidebar";

const adminRoutes = [
  {
    icon: CarTaxiFront,
    label: "Vehículos",
    href: "/admin/vehicles",
  },
  {
    icon: UserSquare,
    label: "Conductores",
    href: "/admin/drivers",
  },
  {
    icon: Waypoints,
    label: "Viajes",
    href: "/admin/journeys",
  },
  {
    icon: Users,
    label: "Perfiles y usuarios",
    href: "/admin/users",
  },
]

export const SidebarRoutes = ({ user }: SideBarProps) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/admin");


  const driverRoutes = [
    {
      icon: Globe2,
      label: "Viajes",
      href: "/driver/journeys",
    },
    {
      icon: KeySquare,
      label: "Cambiar contraseña",
      href: "/driver/password",
    },
  ];

  const routes = isTeacherPage ? adminRoutes : driverRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
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