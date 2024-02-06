import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import InstagramCard from '../_components/cards/instagram-card';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import BookStoreCard from '../_components/cards/book-store-card';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  hiddenInput: boolean;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  cardScrapping: React.ComponentType<{ data: TBookStore[] }>;
  userId: string;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
  ssr: false
});

export default async function BookStorePage() {
  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }

  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping una tienda de libros",
    description: "Extrae datos de la primera pagina",
    exampleInput: "",
    hiddenInput: true,
    routeHandler: 'book-store',
    cardScrapping: BookStoreCard,
    userId: `${user.id}`
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}
