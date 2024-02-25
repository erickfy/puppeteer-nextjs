'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import AmazonCard from '../_components/cards/amazon-card';
import { ReloadIcon } from '@radix-ui/react-icons';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre';
  cardScrapping: React.ComponentType<{ data: TAmazon[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-full h-[60px] rounded-full flex justify-center items-center">
    <ReloadIcon className="h-4 w-4 animate-spin" />
  </Skeleton>,
  ssr: false
});

export default function AmazonPage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Amazon",
    description: "Extrae datos de productos",
    exampleInput: "watch",
    routeHandler: 'amazon',
    cardScrapping: AmazonCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}