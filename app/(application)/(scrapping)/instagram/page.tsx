'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import InstagramCard from '../_components/cards/instagram-card';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  cardScrapping: React.ComponentType<{ data: TInstagram[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
  ssr: false
});

export default function InstagramPage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Instagram",
    description: "Extrae datos de un usuario",
    exampleInput: "iamstipke",
    routeHandler: 'instagram',
    cardScrapping: InstagramCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}
