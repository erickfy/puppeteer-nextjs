import * as React from "react"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Logo from "@/components/logo"
import Image from "next/image"

export default function ScrappingCard() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Image
                        src={'https://japanoncloudnine.com/wp-content/uploads/2023/08/Pretty-Asian-Girl-at-Makeup-Counter.jpeg'}
                        objectFit="cover"
                        layout="fill"
                        alt="Descripción de la imagen"
                      />

                    </div>
                    <div className="flex flex-col gap-1 md:gap-2">
                      <CardTitle>username</CardTitle>
                      <CardDescription>Descripccion: hole</CardDescription>
                      <CardDescription>Descripccion: hole</CardDescription>
                      <CardDescription>Descripccion: hole</CardDescription>
                      <CardDescription>Descripccion: hole</CardDescription>
                      <CardDescription>Descripccion: hole</CardDescription>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Parte {current} of {count}
      </div>
    </div>
  )
}
