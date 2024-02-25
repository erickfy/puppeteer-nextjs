'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import BotDetectCard from '../_components/cards/bot-detect-card';
import { ReloadIcon } from '@radix-ui/react-icons';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  hiddenInput: boolean;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  cardScrapping: React.ComponentType<{ data: TBotDetect[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-full h-[60px] rounded-full flex justify-center items-center">
    <ReloadIcon className="h-4 w-4 animate-spin" />
  </Skeleton>,
  ssr: false
});

export default function DefaultBotDetectPage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping de analisis",
    description: "Extrae una imagen de la persona o robot que solicita informacion",
    exampleInput: "iamstipke",
    hiddenInput: true,
    routeHandler: 'bot-detect',
    cardScrapping: BotDetectCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}