'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useImages } from '@/hooks/useImages'
import Image from 'next/image'
import React from 'react'

type Props = {}

export default function ImagePage({ }: Props) {
  const { getSrcs } = useImages()
  const { images: { instagram } } = getSrcs()

  if (instagram === '') {
    return <div>no hay image</div>
  }

  return (
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
  )
}