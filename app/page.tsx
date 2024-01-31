'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import axios from "axios";
import { USER_ROLE } from "@prisma/client"
import { SignInSchema, TSignInSchema } from "@/schemas/form-schemas"
import Link from "next/link"
import Container from "@/components/container"
// import { signIn } from "@/auth/auth"


export default function SignInPage() {
  const router = useRouter()

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
  })

  async function onSubmit(data: TSignInSchema) {
    // toast.promise(signIn('credentials', {
    //   ...data,
    //   // callbackUrl: "http://localhost:3000/",
    //   redirect: false,
    // }), {
    //   loading: "Verificando...",
    //   success: async (callbackUrl) => {
    //     if (callbackUrl && callbackUrl.status === 200) {
    //       console.log(callbackUrl.status === 200)
    //       const res = await axios.post("/api/auth/check-sign-in")
    //       console.log("res.data", res.data)
    //       if (res.data.role === USER_ROLE.ADMIN) {
    //         router.push('/instagram')
    //       }
    //       if (res.data.role === USER_ROLE.CLIENT) {
    //       }
    //       router.push('/instagram')
    //       return `Bienvenido! ${form.watch('username')}`
    //     }
    //     return "No se pudo ingresar"
    //   },
    //   error: "Error con los datos ingresados"
    // })
    toast.success(`Registro realizado ${data.username}`)
    router.push('/instagram')
  }

  return (
    <Container>
      <Card className="w-[350px]  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
            <CardHeader className="items-center">
              <CardTitle className="font-semibold">Ingresar a la cuenta</CardTitle>
              <CardDescription>Web Scrapping</CardDescription>
              <CardDescription>🛍️📚🤖</CardDescription>
            </CardHeader>
            <CardContent className="grid w-full items-center gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Usuario</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder="Ingresa el nombre de usuario"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Clave</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder="Ingresa la contrasenia"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )}
              />

            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                disabled={!form.formState.isValid}
                className="w-full"
                type="submit">Ingresar</Button>
              <CardDescription className="flex gap-2"><p className="text-black">Aun no tienes cuenta? <Link className="text-blue-500 font-bold" href={'/sign-up'}>Registrarme</Link></p></CardDescription>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </Container>
  )
}
