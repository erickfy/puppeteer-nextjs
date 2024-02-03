import * as React from "react"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import {
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import ScrappingCarrousel from "../scrapping-carrousel"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Props = {
  data: TBookStore[]
}
export default function BookStoreCard({ data }: Props) {
const route = useRouter()

  const body = (<>
    {
      data.map((item, index) => (
        <CarouselItem key={item.title}>
          <Card>
            <CardContent className="relative flex aspect-square items-center justify-center p-0 md:p-6 max-w-sm min-w-60 md:min-w-72">
              <div className="w-full h-full">
                <Image
                  src={item.src}
                  objectFit="cover"
                  layout="fill"
                  alt="Descripción de la imagen"
                  className="z-0"
                />
              </div>
              <div className="absolute w-full bottom-0 left-0 px-4 pb-4 z-10">
                <div className="flex flex-col gap-1 md:gap-1">
                  <CardTitle className=" font-bold">{item.title}</CardTitle>
                  <CardDescription className="text-black font-bold">Precio: <span className="font-medium">{item.price}</span></CardDescription>
                  <CardDescription className="text-black font-bold">Resenas: <span className="font-medium">{item.review}</span></CardDescription>
                  <CardDescription className="text-black font-bold">Stock: <span className="font-medium">{item.stock}</span></CardDescription>
                  <CardDescription className="text-black font-bold">Enlace:
                    <Button
                      variant={'link'}
                      className="font-medium"
                      onClick={() => route.push(item.url)}
                    >
                      Enlace de Producto
                    </Button>
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      ))
    }
  </>)

  return (
    <ScrappingCarrousel
      body={body}
      lengthData={data.length}
    />)
}
