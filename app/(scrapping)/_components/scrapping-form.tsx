'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from '@/components/ui/input';
import { SearchSchema, TSearchSchema } from '@/schemas/form-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect, useMemo, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { useImages } from '@/hooks/useImages';
import { toast } from 'sonner';
import Message from './message';

/**
 * DOCS:
 * useTransition: https://react.dev/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition
 */


type Props<T> = {
    title: string;
    description: string;
    exampleInput: string;
    hiddenInput?: boolean;
    routeHandler:
    'instagram' | 'book-store' | 'amazon' | 'bot-detect' | 'mercado-libre'
    cardScrapping: React.ComponentType<{ data: T[] }>;
    userId: string;
}


export default function ScrappingForm<T>({ title, description, exampleInput, hiddenInput = false, routeHandler, cardScrapping: CardScrapping, userId }: Props<T>) {
    const route = useRouter()
    const { resetInstragramImage,
        setInstagramImage,
        setAmazonImage,
        setBookStoreImage,
        setBotDetectImage,
        setMercadoLibreImage,
    } = useImages()
    const [data, setData] = useState<T[]>([])
    const [loading, setLoading] = useState<boolean>()
    const [isPending, startTransition] = useTransition()


    const form = useForm<TSearchSchema>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            search: "",
        },
    })

    useEffect(() => {
        resetInstragramImage()
    }, [])

    const isMobile = useMemo(() => {
        const size = window.innerWidth
        if (size <= 768) {
            return true
        } else if (size > 768) {
            return false
        }
    }, [])

    async function onSubmit(dt: TSearchSchema) {
        setLoading(true)

        startTransition(() => {

            toast.promise(Promise.all([
                axios.post(`/api/scrapping/${routeHandler}`, { searchInput: dt.search }),
                axios.post(`/api/scrapping/count-word`, { userId, searchInput: dt.search, type: routeHandler }),
            ]), {
                loading: "Scrapeando... ⌛",
                success: async (requests) => {
                    const request = requests[0]
                    if (request.status === 200) {
                        setData(request.data.data);
                        setLoading(false);
                        saveTypeImage(dt.search)
                        console.log(isPending)
                        console.log(request.data)
                        if (request.data.data.length === 0) {
                            form.reset()
                            return '🚫 Sin resultados pero puedes mirar su imagen!'
                        }
                    } else {
                        form.reset()
                    }
                    return "Busqueda obtenida!"
                },
                error: () => {
                    setLoading(false)
                    return "Error de sistema"
                }
            })

        })

    }

    function saveTypeImage(imageName: string) {
        const src = `/${routeHandler}/${imageName}.webp`;

        if (routeHandler === 'instagram') setInstagramImage(src)
        else if (routeHandler === 'amazon') setAmazonImage(src)
        else if (routeHandler === 'book-store') setBookStoreImage(src)
        else if (routeHandler === 'bot-detect') setBotDetectImage(src)
        else if (routeHandler === 'mercado-libre') setMercadoLibreImage(src)
    }

    return (
        <div className="flex h-full items-center justify-center">

            <ResizablePanelGroup
                direction={isMobile ? 'vertical' : 'horizontal'}
                className="flex flex-grow h-full min-h-96 rounded-lg "
            >
                <ResizablePanel defaultSize={50} minSize={20}>
                    <div className="flex h-full items-center justify-center p-6">
                        <Card className="min-w-[300px] bg-gradient-to-b from-blue-50 to-green-50 ">
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        {!hiddenInput &&
                                            <FormField
                                                control={form.control}
                                                name="search"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Busqueda</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder={`Ej: ${exampleInput}`}  {...field} type="text" autoComplete="off" />
                                                        </FormControl>
                                                        <FormMessage>
                                                            {form.formState.errors.search?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />
                                        }
                                        <div className='flex w-full justify-end'>
                                            <Button type="submit">Scrapear</Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>

                        </Card>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={50} minSize={20}>
                    <div className="flex h-full w-full items-center justify-center">

                        {loading === undefined ?

                            <Message msg='Realiza una busqueda' />

                            : isPending || loading ?
                                <Message msg="Cargando.. ⌛" /> :

                                data.length === 0 ?

                                    < Message msg="Upps.. busqueda no encontrada!" /> :
                                    (
                                        CardScrapping &&
                                        < CardScrapping data={data} />
                                    )
                        }
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>

    )
}