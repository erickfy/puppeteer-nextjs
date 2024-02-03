'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import MercadoLibreCard from '../_components/cards/mercado-libre-card';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  cardScrapping: React.ComponentType<{ data: TMercadoLibre[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
  ssr: false
});

export default function DefaultMercadoLibrePage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Mercado Libre",
    description: "Extrae datos de productos",
    exampleInput: "laptop",
    routeHandler: 'mercado-libre',
    cardScrapping: MercadoLibreCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}
