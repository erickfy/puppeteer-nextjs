'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import MercadoLibreCard from '../_components/cards/mercado-libre-card';
import { ReloadIcon } from '@radix-ui/react-icons';
interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  cardScrapping: React.ComponentType<{ data: TMercadoLibre[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-full h-[60px] rounded-full flex justify-center items-center">
    <ReloadIcon className="h-4 w-4 animate-spin" />
  </Skeleton>,
  ssr: false
});

export default function MercadoLibrePage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Mercado Libre",
    description: "Extrae datos de productos",
    exampleInput: "laptop",
    routeHandler: 'mercado-libre',
    cardScrapping: MercadoLibreCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}