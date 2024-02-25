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
import { TWITHOUT_INPUT } from '@/lib/constants';
import { watch } from 'fs';
import ButtonUI from '@/components/buttons/button-ui';

/**
 * DOCS:
 * useTransition: https://react.dev/reference/react/useTransition#marking-a-state-update-as-a-non-blocking-transition
 */

type Props<T> = {
    title: string;
    description: string;
    defaultInput?: string;
    exampleInput?: string;
    hiddenInput?: boolean;
    routeHandler:
    'instagram' | 'book-store' | 'amazon' | 'bot-detect' | 'mercado-libre'
    cardScrapping: React.ComponentType<{ data: T[] }>;
}

export default function ScrappingForm<T>({ title, description, exampleInput = '', hiddenInput = false, routeHandler, cardScrapping: CardScrapping, defaultInput = "" }: Props<T>) {
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

    console.log(defaultInput, 'is')
    const form = useForm<TSearchSchema>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            search: defaultInput,
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
            const urlCountWord = `/api/scrapping/count-word`
            const urlHandler = `/api/scrapping/${routeHandler}`

            toast.promise(Promise.all([
                axios.post(urlHandler, { searchInput: dt.search }),
                axios.post(urlCountWord, { searchInput: dt.search, type: routeHandler }),
            ]), {
                loading: "Scrapeando... ⌛",
                success: async (requests) => {
                    const request = requests[0]
                    console.log(request.data)
                    if (request.status === 200 && request.data && !request.data.hasError) {
                        setData(request.data.data);
                        setLoading(false);
                        saveTypeImage(dt.search)

                        if (request.data.data.length === 0) {
                            form.reset()
                            return '🚫 Sin resultados pero puedes mirar su imagen!'
                        } else {
                            return "Busqueda obtenida!"
                        }
                    } else {
                        setLoading(false)
                        form.reset()
                        return '🚫 Sin resultados! (proteccion de captcha)'
                    }
                    setLoading(false)
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
        else if (routeHandler === 'mercado-libre') setMercadoLibreImage(src)
        else if (routeHandler === 'book-store') {
            const src = `/${routeHandler}/${TWITHOUT_INPUT.BOOK_STORE as string}`
            setBookStoreImage(src)
        }
        else if (routeHandler === 'bot-detect') {
            const src = `/${routeHandler}/${TWITHOUT_INPUT.BOT_DETECT as string}`
            setBotDetectImage(src)
        }
    }

    console.log(form.watch('search'))
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

                                        <FormField
                                            control={form.control}
                                            name="search"
                                            render={({ field }) => (
                                                // TO HIDDE INPUT
                                                <FormItem className={hiddenInput ? 'sr-only' : ''}>
                                                    <FormLabel>Busqueda</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder={`Ej: ${exampleInput}`}
                                                            {...field}
                                                            type="text"
                                                            autoComplete="off"
                                                            id={routeHandler}
                                                        // defaultValue={form.watch('search')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage>
                                                        {form.formState.errors.search?.message}
                                                    </FormMessage>
                                                </FormItem>
                                            )}
                                        />

                                        <div className='flex w-full justify-end'>
                                            <ButtonUI title='Scrapear' id={`${routeHandler}-submit`} type='submit' className='bg-primary font-medium transition-colors px-4 py-2 h-9' hasLoading={true} loading={loading} />
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