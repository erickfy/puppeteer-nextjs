import * as React from "react"

import ScrappingCarrousel from "../scrapping-carrousel"

type Props = {
  body: React.ReactNode
  lengthData: number
}
export default function CardUI({ body, lengthData }: Props) {

  return (
    <ScrappingCarrousel
      body={body}
      lengthData={lengthData}
    />
  )
}
