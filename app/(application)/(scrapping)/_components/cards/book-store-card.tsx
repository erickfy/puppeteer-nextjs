import * as React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import {
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import ScrappingCarrousel from "../scrapping-carrousel"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import ImageProvider from "@/lib/ImageProvider"
import Link from "next/link"

type Props = {
  data: TBookStore[]
}

function getReviews(reviews: string) {
  const rev = reviews.toLocaleLowerCase()
  if (rev === 'one') return 'No me gustó en absoluto. ⭐';
  else if (rev === 'two') return 'Podría ser mejor. ⭐⭐';
  else if (rev === 'three') return 'Es aceptable. ⭐⭐⭐';
  else if (rev === 'four') return 'Me gusta. ⭐⭐⭐⭐';
  else if (rev === 'five') return '¡Producto increíble! ⭐⭐⭐⭐⭐'
  return 'Sin calificación.';
}

export default function BookStoreCard({ data }: Props) {
  const route = useRouter()

  const body = (<>
    {
      data.map((item, index) => (
        <CarouselItem key={item.title}>
          <Card className="rounded-lg shadow-lg border-0">
            <CardContent className="relative flex aspect-square items-center justify-center  max-w-sm min-w-60 md:min-w-72">
              <div className="w-full h-full">
                <ImageProvider
                  imageUrl={item.src}
                  alt={item.title}
                  className="rounded-t-lg"
                />
              </div>

            </CardContent>
            <CardFooter className="p-6 py-2 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 rounded-b-lg shadow-lg">

              <div className="w-full">
                <div className="flex flex-col gap-1 md:gap-1">
                  <CardTitle className="font-semibold">{item.title}</CardTitle>
                  
                  <CardDescription className="text-black opacity-80 font-bold"><span className="font-medium text-2xl underline">{item.price}</span></CardDescription>
                  
                  <CardDescription className="text-black  opacity-80 font-bold"><span className="font-medium">{
                    getReviews(item.review)
                  }</span></CardDescription>

                  <CardDescription className="text-black  opacity-80 font-bold"><span className="font-bold">{item.stock}</span></CardDescription>

                  <div className="justify-center flex">
                    <Button variant={'link'} className="font-medium">
                      <a target="_blank" href={item.url} rel="noopener noreferrer">
                        <div>
                          Ir al producto 🔗
                        </div>
                      </a>
                    </Button>
                  </div>
                  
                </div>
              </div>
            </CardFooter>
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
