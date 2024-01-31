'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import Navbar from '@/components/toolbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


const FormSchema = z.object({
  search: z.string({ required_error: "Username must be at least 2 characters." })
})

type Props = {}

const AmazonPage = (props: Props) => {
  // console.log(props)
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<string>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  })

  async function onSubmit(dt: z.infer<typeof FormSchema>) {
    const request = await axios.post(`/api/scrapping/amazon`,
      { searchInput: dt.search.toLocaleLowerCase() }
    );
    const { data } = request
    console.log(data)
    if (data.capture) {
      setImage(data.capture)
    }
  }

  return (
    <div className='flex flex-col gap-4 max-w-screen max-h-screen !w-full !h-full justify-center items-center'>

      <div className="max-w-lg max-h-96">


        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: watch"  {...field} type="text" autoComplete="off" />
                  </FormControl>
                  <FormDescription>
                    Scrapping in Amazon
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>


        <div>
          {/* {image &&
            <Image
              src={image}
              width={200}
              height={200}
            />
          } */}
        </div>
      </div>
    </div>

  )
}

export default AmazonPage