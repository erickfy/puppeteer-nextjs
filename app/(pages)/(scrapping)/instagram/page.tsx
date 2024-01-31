
import React from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {}

const DynamicScrappingForm = dynamic(() => import('../_components/scrapping-form'),
  {
    loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
    ssr: false
  })

export default function InstagramPage({ }: Props) {
  return (
    <DynamicScrappingForm
      title="Scrapping Instagram"
      description="Extrae datos de un usuario"
      exampleInput="iamstipke"
      routeHandler={'instagram'} />
  )
}