import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import MercadoLibreCard from '../_components/cards/mercado-libre-card';
interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  cardScrapping: React.ComponentType<{ data: TMercadoLibre[] }>;
  userId: string;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
  ssr: false
});

export default async function DefaultMercadoLibrePage() {
  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }

  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Mercado Libre",
    description: "Extrae datos de productos",
    exampleInput: "laptop",
    routeHandler: 'mercado-libre',
    cardScrapping: MercadoLibreCard,
    userId: `${user.id}`
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}
