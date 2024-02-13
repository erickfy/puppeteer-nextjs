'use client'

import ImageCard from "@/app/(application)/(scrapping)/_components/cards/image-card"
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

type Props = {
  searchParams: { image: string }
}

export default function DefaultInterceptDialog({ searchParams }: Props) {
  const { getSrcs } = useImages()
  const { images: { botDetect } } = getSrcs()
  if (!botDetect) {
    return <Logo />
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" id='bot-detect-dialog'>Ver imagen de Scrapping</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Imagen de analisis para Robots</DialogTitle>
            <DialogDescription>
              Scrapeado desde la web
            </DialogDescription>
          </DialogHeader>
          <ImageCard src={botDetect} alt='bot-detect'/>
        </DialogContent>
      </Dialog>
    )
  }
}