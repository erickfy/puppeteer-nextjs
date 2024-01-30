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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { USER_ROLE } from "@prisma/client";

import axios from 'axios'
import { useRouter } from "next/navigation";
import Link from "next/link"
import { toast } from "sonner"
import { SignUpSchema, TSignUpSchema } from "@/schemas/form-schemas"

const fieldNeeded = { required_error: "Campo necesario" }



export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  })


  async function onSubmit(data: TSignUpSchema) {
    setLoading(true)
    toast.promise(axios.post(`/api/auth/register`, data), {
      loading: "Verificando...",
      success: (callbackUrl) => {
        if (callbackUrl.status === 200) {
          router.push(`/instagram`)
          return "Registro exitoso!"
        }
        return ""
      },
      error: "Hubo un error con los datos ingresados"
    })
    setLoading(false)
  }

  return (
    <Card className="w-[350px]  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="items-center">
        <CardTitle className="font-semibold">Registro</CardTitle>
        <CardDescription>Añadir un nuevo usuario</CardDescription>
        <CardDescription>👤</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>

          <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-8">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder="Ingresa el correo electronico"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contrasenia</FormLabel>
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

            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Roles</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      <SelectItem value={USER_ROLE.ADMIN}>Administrador</SelectItem>
                      <SelectItem value={USER_ROLE.CLIENT}>Usuario</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>

              )}
            />
            <CardFooter className="flex flex-col gap-4 p-0">
              <Button
                disabled={!form.formState.isValid || loading}
                type="submit"
                className="w-full">Registrar</Button>
              <CardDescription className="flex gap-2"><p className="text-black">Ya tengo cuenta? <Link className="text-blue-500 font-bold" href={'/'}>Ingresar</Link></p></CardDescription>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 