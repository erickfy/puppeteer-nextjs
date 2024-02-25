'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import BookStoreCard from '../_components/cards/book-store-card';
import { ReloadIcon } from '@radix-ui/react-icons';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  hiddenInput: boolean;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  defaultInput: string;
  cardScrapping: React.ComponentType<{ data: TBookStore[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-full h-[60px] rounded-full flex justify-center items-center">
    <ReloadIcon className="h-4 w-4 animate-spin" />
  </Skeleton>,
  ssr: false
});

export default function BookStorePage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping una tienda de libros",
    description: "Extrae datos de la primera pagina",
    hiddenInput: true,
    routeHandler: 'book-store',
    defaultInput: 'trigger-default',
    cardScrapping: BookStoreCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}
