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

type NavbarAvatarProps = {
    open?: boolean
    onOpen?: (value: boolean) => void
    trigger: React.ReactNode,
    menuTitle?: string,
    roleUser: "Administrador" | "Cliente"
}
export function DropdownMenuUI({ trigger, menuTitle, roleUser }: NavbarAvatarProps) {
    const router = useRouter()
    // const { reset: resetInspection } = useDriverInspection()
    // const { reset: resetRegister } = useDriverRegister()
    // const { reset: resetMultiform } = useMultiForm()
    // const { reset: resetJourney } = useJourney()

    function clearStates() {
        // resetInspection()
        // resetJourney()
        // resetMultiform()
        // resetRegister()
        // useDriverInspection.persist.clearStorage()
        // useDriverRegister.persist.clearStorage()
        // useJourney.persist.clearStorage()
        // useMultiForm.persist.clearStorage()
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

                <DropdownMenuItem onClick={() => router.push('/')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi perfil</span>
                    <DropdownMenuShortcut>⇧⌘M</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => {
                    clearStates()
                    toast.promise(signOut({ callbackUrl: '/', redirect: true }), {
                        loading: "Cerrando sesion...",
                        success: (callbackUrl) => {
                            console.log("exit callback", callbackUrl)
                            return "Session finalizada."
                        },
                        error: "Error al cerrar sesion"
                    })
                }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Salir</span>
                    <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
