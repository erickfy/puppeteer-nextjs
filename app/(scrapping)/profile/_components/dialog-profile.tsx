'use client'

import { login } from "@/actions/authentication"
import FormCard from "@/app/(auth)/_components/form-card"
import ImageCard from "@/app/(scrapping)/_components/cards/image-card"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useImages } from "@/hooks/useImages"

export default function DialogProfile() {
    const { getSrcs } = useImages()
    const { images: { amazon } } = getSrcs()
    if (!amazon) {
        return <Logo />
    } else {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Ver imagen de Scrapping</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Imagen de Amazon</DialogTitle>
                        <DialogDescription>
                            Scrapeado desde la web
                        </DialogDescription>
                    </DialogHeader>
                    <FormCard
                        title="Editar Perfil"
                        content={<div>Content</div>}
                        footer={<button>submit</button>}
                        action={login}
                        descriptionOne="Edita tu perfil"
                        descriptionTwo="2"
                    />


                </DialogContent>
            </Dialog>
        )
    }
}