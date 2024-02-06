import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AmazonCard from '../_components/cards/amazon-card';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre';
  cardScrapping: React.ComponentType<{ data: TAmazon[] }>;
  userId: string;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
  ssr: false
});

export default async function DefaultAmazonPage() {
  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }

  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Amazon",
    description: "Extrae datos de productos",
    exampleInput: "watch",
    routeHandler: 'amazon',
    cardScrapping: AmazonCard,
    userId: `${user.id}`
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}
