'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import BotDetectCard from '../_components/cards/bot-detect-card';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  hiddenInput: boolean;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  defaultInput: string;
  cardScrapping: React.ComponentType<{ data: TBotDetect[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
  ssr: false
});

export default function BotDetectPage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping de analisis",
    description: "Extrae una imagen de la persona o robot que solicita informacion",
    hiddenInput: true,
    routeHandler: 'bot-detect',
    defaultInput: 'trigger-default',
    cardScrapping: BotDetectCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}