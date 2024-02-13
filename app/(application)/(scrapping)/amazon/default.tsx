'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import AmazonCard from '../_components/cards/amazon-card';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre';
  cardScrapping: React.ComponentType<{ data: TAmazon[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
  ssr: false
});

export default function DefaultAmazonPage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Amazon",
    description: "Extrae datos de productos",
    exampleInput: "watch",
    routeHandler: 'amazon',
    cardScrapping: AmazonCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}