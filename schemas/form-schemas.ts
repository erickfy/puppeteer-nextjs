import { USER_ROLE } from "@prisma/client";
import * as z from "zod";

const fieldNeeded = { required_error: "Campo necesario" }

export const SignInSchema = z.object({
    username: z.string(fieldNeeded)
        .min(4, { message: "Minimo 4 letras" }).max(20, { message: 'Maximo permitido de 20 letras' }),
    password: z.string(fieldNeeded)
        .min(2, { message: "Minimo 2 letras" }).max(20, { message: 'Maximo permitido de 20 letras' }),
})
export type TSignInSchema = z.infer<typeof SignInSchema>



export const SignUpSchema = z.object({
    username: z.string(fieldNeeded)
        .min(4, { message: "Minimo 4 letras" }).max(20, { message: 'Maximo permitido de 20 letras' }),
    password: z.string(fieldNeeded)
        .min(2, { message: "Minimo 2 letras" }).max(20, { message: 'Maximo permitido de 20 letras' }),
    role: z.nativeEnum(USER_ROLE, fieldNeeded),
})
export type TSignUpSchema = z.infer<typeof SignUpSchema>



export const SearchSchema = z.object({
    search: z.string(fieldNeeded)
        .min(2, { message: "Minimo 2 letras" }).max(20, { message: 'Maximo permitido de 20 letras' }),
})
export type TSearchSchema = z.infer<typeof SearchSchema>