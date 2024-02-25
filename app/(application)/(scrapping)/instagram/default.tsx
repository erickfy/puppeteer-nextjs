'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import InstagramCard from '../_components/cards/instagram-card';
import { ReloadIcon } from '@radix-ui/react-icons';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  cardScrapping: React.ComponentType<{ data: TInstagram[] }>;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-full h-[60px] rounded-full flex justify-center items-center">
    <ReloadIcon className="h-4 w-4 animate-spin" />
  </Skeleton>,
  ssr: false
});

export default function DefaultInstagramPage() {
  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Instagram",
    description: "Extrae datos de un usuario",
    exampleInput: "iamstipke",
    routeHandler: 'instagram',
    cardScrapping: InstagramCard,
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}
