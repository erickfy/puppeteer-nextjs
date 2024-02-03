import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from '@/lib/form'
import { editUser } from '@/actions/user'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import FormCard from '@/app/(auth)/_components/form-card'
import { Button } from '@/components/ui/button'
import { CopyIcon } from 'lucide-react'

type Props = {
    user: {
        id: string;
        username: string;
        fullNames: string;
        image: string;
        role: "ADMIN";
        active: boolean;
    }
}

export default function UserFormDialog({ user }: Props) {
    console.log("this")
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Editar Usuario</DialogTitle>
                    <DialogDescription>
                        {user.fullNames}
                    </DialogDescription>
                </DialogHeader>
                <div className='w-full'>

                    <Form action={editUser} className=" mx-auto">
                        <>
                            <Input name='id' className='hidden' defaultValue={user.id} />
                            <div className="grid w-full max-w-xs items-center gap-2">
                                <Label htmlFor="username">Usuario</Label>
                                <Input type="text" id="username" name="username" placeholder="Ej: dejanstipke" />
                            </div>
                            <div className="grid w-full max-w-xs items-center gap-2">
                                <Label htmlFor="fullNames">Nombres Completos</Label>
                                <Input type="text" name="fullNames" id="fullNames" placeholder="Ej: Johan Quinatoa" defaultValue={user.fullNames} />
                            </div>
                            <div className="grid w-full max-w-xs items-center gap-2">
                                <Label htmlFor="image">Imagen</Label>
                                <Input type="text" id="image" name="image" defaultValue={user.image} />
                            </div>
                        </>
                        {/* flex-col sm:flex-row */}
                        <DialogFooter className=" sm:!justify-between gap-4">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cerrar
                                </Button>
                            </DialogClose>
                            <Button type="submit">
                                Actualizar
                            </Button>
                        </DialogFooter>
                    </Form>
                </div>

            </DialogContent>
        </Dialog>

    )
}