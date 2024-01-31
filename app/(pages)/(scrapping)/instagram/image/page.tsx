import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

type Props = {
  searchParams: { image: string }
}

export default function ImagePage({ searchParams }: Props) {
  const { image } = searchParams
  const src = `/public/instagram/${image}.webp`
  return (
    <Card>
      <CardContent className="relative flex aspect-square items-center justify-center p-6 max-w-sm min-w-72">
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
  )
}