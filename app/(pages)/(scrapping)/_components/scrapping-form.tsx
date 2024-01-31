'use client'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from '@/components/ui/input';
import { SearchSchema, TSearchSchema } from '@/schemas/form-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import ScrappingCard from './cards/card-ui';
import InstagramCard from './cards/instagram-card';

type Props = {
    title: string;
    description: string;
    exampleInput: string;
    routeHandler:
    'instagram' | 'book-store' | 'amazon' | 'bot-detect' | 'mercado-libre'
}


export default function ScrappingForm({ title, description, exampleInput, routeHandler }: Props) {
    const route = useRouter()
    const [data, setData] = useState<TInstagram[]>([])
    const [loading, setLoading] = useState<boolean>()
    const form = useForm<TSearchSchema>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            search: "",
        },
    })

    async function onSubmit(dt: TSearchSchema) {
        setLoading(true)
        const request = await axios.post(`/api/scrapping/instagram`,
            { searchInput: dt.search }
        )

        if (request.status === 200) {
            setData(request.data.data)
            console.log(request.data.data)
        }

        // clean values
        setLoading(false)
    }

    function handlerImage() {
        route.push(`/instagram/image?image=${form.watch('search')}`)
    }


    return (
        <div className="hidden md:flex h-full items-center justify-center p-6 ">

            <ResizablePanelGroup
                direction="horizontal"
                className="flex flex-grow h-full min-h-96 w-screen rounded-lg "
            >
                <ResizablePanel defaultSize={1} minSize={20}>
                    <div className="flex h-full items-center justify-center p-6">
                        <Card className="w-[350px] bg-gradient-to-b from-blue-50 to-green-50 ">
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
                                        <div className='flex w-full justify-end'>
                                            <Button type="submit">Submit</Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>

                            {data?.length !== 0 && loading === false &&
                                <CardFooter>
                                    <Button variant={'link'} onClick={() => handlerImage()}>
                                        Ver documento scrapeado
                                    </Button>
                                </CardFooter>
                            }
                            
                        </Card>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={1} minSize={20}>
                    <div className="flex h-full w-full items-center justify-center">

                        {data?.length === 0 && loading === undefined ?

                            <Message msg='Realiza una busqueda' />

                            : loading ?
                                <Message msg="Cargando.." /> :

                                data?.length === 0 ?

                                    < Message msg="Upps.. busqueda no encontrada!" /> :

                                    (<InstagramCard data={data} />)
                        }
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>

    )
}

function Message({ msg }: { msg: string }) {
    return (<div className='text-black font-bold'>{msg}</div>)
}