import * as React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import {
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import ScrappingCarrousel from "../scrapping-carrousel"
import ImageProvider from "@/lib/ImageProvider"

type Props = {
  data: TInstagram[]
}
export default function InstagramCard({ data }: Props) {

  
  const body = (<>
    {
      data.map((item, index) => {
        return (
        <CarouselItem key={item.username}>
          <Card className="rounded-lg shadow-lg border-0">
            <CardContent className="relative flex aspect-square items-center justify-center p-0 md:p-6 max-w-sm min-w-60 md:min-w-72">
              <div className="w-full h-full">
                <ImageProvider
                  imageUrl={item.src}
                  alt={item.username}
                  className="rounded-t-lg"
                />
              </div>
            </CardContent>

            <CardFooter className="p-6 py-2 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 rounded-b-lg shadow-lg">
              <div className="w-full">
                <div className="flex flex-col gap-1 md:gap-1">
                  <CardTitle className="font-semibold">@{item.username}</CardTitle>

                  <CardDescription className="text-black opacity-80 font-bold">Seguidores: <span className="font-medium">{item.followers}</span></CardDescription>
                  
                  <CardDescription className="text-black opacity-80 font-bold">Siguiendo: <span className="font-medium">{item.following}</span></CardDescription>
                  
                  <CardDescription className="text-black opacity-80 font-bold">Publicaciones: <span className="font-medium">{item.posts}</span></CardDescription>

                </div>
              </div>
            </CardFooter>
          </Card>
        </CarouselItem>
      )})
    }
  </>)

  return (
    <ScrappingCarrousel
      body={body}
      lengthData={data.length}
    />)
}
