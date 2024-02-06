import React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import InstagramCard from '../_components/cards/instagram-card';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface DynamicScrappingFormProps {
  title: string;
  description: string;
  exampleInput: string;
  routeHandler: 'instagram' | 'amazon' | 'bot-detect' | 'mercado-libre' | 'book-store';
  cardScrapping: React.ComponentType<{ data: TInstagram[] }>;
  userId: string;
}

const DynamicScrappingForm = dynamic<DynamicScrappingFormProps>(() => import('../_components/scrapping-form'), {
  loading: () => <Skeleton className="w-[100px] h-[60px] rounded-full" />,
  ssr: false
});

export default async function InstagramPage() {
  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }


  const dynamicProps: DynamicScrappingFormProps = {
    title: "Scrapping Instagram",
    description: "Extrae datos de un usuario",
    exampleInput: "iamstipke",
    routeHandler: 'instagram',
    cardScrapping: InstagramCard,
    userId: `${user.id}`
  };

  return <DynamicScrappingForm {...dynamicProps} />;
}
