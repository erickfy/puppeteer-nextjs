import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useImages } from "@/hooks/useImages"
import axios from "axios"
import { validateRequest } from "@/lib/auth"
import { routes } from "@/routes"

type NavbarAvatarProps = {
    open?: boolean
    onOpen?: (value: boolean) => void
    trigger: React.ReactNode,
    menuTitle?: string,
    roleUser: "Administrador" | "Cliente"
}
export function DropdownMenuUI({ trigger, menuTitle, roleUser }: NavbarAvatarProps) {
    const router = useRouter()

    const { reset } = useImages()

    async function handleSignOut() {
        // reset states
        toast.promise(axios.post('/api/auth/sign-out', {
            sessionId: ''
        }), {
            loading: "Cerrando sesion...",
            success: (req) => {
                if (req.data.status === 'done') {
                    reset()
                    router.push(routes.login)
                    return "Session finalizada."
                }
            },
            error: "Error al cerrar sesion"
        })

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>Usuario: <span className='text-muted-foreground'>{menuTitle ? menuTitle : "Mi cuenta"}</span></DropdownMenuLabel>
                <div className="px-2 text-sm font-medium flex gap-2 items-center  leading-none">
                    <span className="flex h-2 w-2 rounded-full bg-sky-500" />
                    <span className='text-muted-foreground text-end'>
                        {roleUser}
                    </span>
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Salir</span>
                    <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
