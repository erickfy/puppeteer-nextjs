import * as React from "react"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
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
      data.map((item, index) => (
        <CarouselItem key={item.username}>
          <Card>
            <CardContent className="relative flex aspect-square items-center justify-center p-0 md:p-6 max-w-sm min-w-60 md:min-w-72">
              <div className="w-full h-full">
                <ImageProvider imageUrl={item.src} alt={item.username} />
              </div>
              <div className="absolute w-full bottom-0 left-0 px-4 pb-4 z-10">
                <div className="flex flex-col gap-1 md:gap-1">
                  <CardTitle className=" font-bold">@{item.username}</CardTitle>
                  <CardDescription className="text-black font-bold">Seguidores: <span className="font-medium">{item.followers}</span></CardDescription>
                  <CardDescription className="text-black font-bold">Siguiendo: <span className="font-medium">{item.following}</span></CardDescription>
                  <CardDescription className="text-black font-bold">Publicaciones: <span className="font-medium">{item.posts}</span></CardDescription>
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
