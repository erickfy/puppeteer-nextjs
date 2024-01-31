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
import React from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type Props = {
    title: string;
    description: string;
    exampleInput: string;
    routeHandler:
    'instagram' | 'book-store' | 'amazon' | 'bot-detect' | 'mercado-libre'
}

export default function ScrappingForm({ title, description, exampleInput, routeHandler }: Props) {
    const route = useRouter()
    const form = useForm<TSearchSchema>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            search: "",
        },
    })

    async function onSubmit(dt: TSearchSchema) {
        route.push(`/${routeHandler}/search/${dt.search}`)
    }

    return (
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
        </Card>
    )
}
