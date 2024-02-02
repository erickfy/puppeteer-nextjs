import { USER_ROLE } from "@prisma/client";
import * as z from "zod";

const msg = {
    empty: "Un campo es obligatorio",
    username: {
        min: "En usuario como minimo son 4 letras",
        max: 'En usuario como maximo permitido son 20 caracteres'
    },
    password: {
        min: "La contrasena como minimo son 4 caracteres",
        max: 'En contrasena como maximo permitido son 20 caracteres'
    },
    search: {
        min: "El campo de busqueda es de minimo 2 letras",
        max: 'El campo de busqueda es de maximo permitido de 20 letras'
    }
}

export const SignInSchema = z.object({
    username: z.string({ required_error: msg.empty })
        .min(4, { message: msg.password.min }).max(20, { message: msg.username.max }),
    password: z.string({ required_error: msg.empty })
        .min(2, { message: msg.password.min }).max(20, { message: msg.password.max }),
})
export type TSignInSchema = z.infer<typeof SignInSchema>



export const SignUpSchema = z.object({
    username: z.string({ required_error: msg.empty })
        .min(4, { message: msg.username.min }).max(20, { message: msg.username.max }),
    password: z.string({ required_error: msg.empty })
        .min(2, { message: msg.password.min }).max(20, { message: msg.password.max }),
    role: z.nativeEnum(USER_ROLE, { required_error: msg.empty }),
})
export type TSignUpSchema = z.infer<typeof SignUpSchema>


export const SearchSchema = z.object({
    search: z.string({ required_error: msg.empty })
        .min(2, { message: msg.search.min }).max(20, { message: msg.search.max }),
})
export type TSearchSchema = z.infer<typeof SearchSchema>