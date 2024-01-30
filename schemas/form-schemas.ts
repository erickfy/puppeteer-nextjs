import { USER_ROLE } from "@prisma/client";
import * as z from "zod";

const fieldNeeded = { required_error: "Campo necesario" }

export const SignInSchema = z.object({
    username: z.string(fieldNeeded),
    password: z.string(fieldNeeded)
})
export type TSignInSchema = z.infer<typeof SignInSchema>


export const SignUpSchema = z.object({
    username: z.string(fieldNeeded).min(4).max(150),
    password: z.string(fieldNeeded).min(2).max(150),
    role: z.nativeEnum(USER_ROLE, fieldNeeded),
})
export type TSignUpSchema = z.infer<typeof SignUpSchema>
