'use client'

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useImages } from "@/hooks/useImages"
import Image from "next/image"

type Props = {
  searchParams: { image: string }
}

export default function DefaultInterceptDialog({ searchParams }: Props) {
  const { getSrcs } = useImages()
  const { images: { instagram } } = getSrcs()

  if (!instagram) {
    return <Logo />
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ver imagen de Scrapping</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Imagen de Instagram</DialogTitle>
            <DialogDescription>
              Scrapeado desde la web
            </DialogDescription>
          </DialogHeader>
          <Card>
            <CardContent className="relative flex aspect-square items-center justify-center p-6 max-w-sm min-w-72">
              <div className="w-full h-full">
                <Image
                  src={instagram}
                  objectFit="cover"
                  layout="fill"
                  alt="Descripción de la imagen"
                  className="z-0"
                />
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    )
  }
}
