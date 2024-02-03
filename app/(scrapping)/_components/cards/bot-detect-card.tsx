import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import ScrappingCarrousel from "../scrapping-carrousel"

type Props = {
  data: TBotDetect[]
}
export default function BotDetectCard({ data }: Props) {

  const body = (<>
    {
      data.map((item) => {
        const src = item.capture.toString('base64')
        return (
          <CarouselItem key={"bot-detect web scrapping"}>
            <Card>
              <CardContent className="relative flex aspect-square items-center justify-center p-0 md:p-6 max-w-sm min-w-60 md:min-w-72">
                <div className="w-full h-full">
                  <Image
                    src={src}
                    objectFit="cover"
                    layout="fill"
                    alt="Descripción de la imagen"
                    className="z-0"
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        )
      })
    }
  </>)

  return (
    <ScrappingCarrousel
      body={body}
      lengthData={data.length}
    />)
}
