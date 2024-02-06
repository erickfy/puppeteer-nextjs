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
const MAX_FILE_SIZE_MB = 50;

export const SignInSchema = z.object({
    username: z.string({ required_error: msg.empty })
        .min(4, { message: msg.password.min })
        .max(20, { message: msg.username.max }),
    password: z.string({ required_error: msg.empty })
        .min(2, { message: msg.password.min })
        .max(20, { message: msg.password.max }),
})
export type TSignInSchema = z.infer<typeof SignInSchema>



export const SignUpSchema = z.object({
    username: z.string({ required_error: msg.empty })
        .min(4, { message: msg.username.min })
        .max(20, { message: msg.username.max }),
    password: z.string({ required_error: msg.empty })
        .min(2, { message: msg.password.min })
        .max(20, { message: msg.password.max }),
    role: z.nativeEnum(USER_ROLE, { required_error: msg.empty }),
})
export type TSignUpSchema = z.infer<typeof SignUpSchema>


export const SearchSchema = z.object({
    search: z.string({ required_error: msg.empty })
        .min(2, { message: msg.search.min })
        .max(20, { message: msg.search.max }),
})
export type TSearchSchema = z.infer<typeof SearchSchema>


export const EditUserSchema = z.object({
    id: z.string({ required_error: msg.empty }),
    // username: z.string({ required_error: msg.empty })
    //     .min(4, { message: msg.username.min })
    //     .max(20, { message: msg.username.max }),
    fullNames: z.string()
        .min(4, { message: msg.username.min })
        .max(20, { message: msg.username.max })
        .optional(),
    image: z.instanceof(File).refine(value => {
        if (!(value instanceof File)) {
            return false;
        }

        // Check type image
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedImageTypes.includes(value.type)) {
            return false;
        }

        // Check size image
        const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
        if (value.size > maxSizeBytes) {
            return false;
        }

        return true;
    }, { message: 'Archivo de imagen invalido' }).optional(),
})
export type TEditUserSchema = z.infer<typeof EditUserSchema>



export const ChangePasswordSchema = z.object({
    id: z.string({ required_error: msg.empty }),
    password: z.string({ required_error: msg.empty })
        .min(2, { message: msg.password.min })
        .max(20, { message: msg.password.max }),
    confirmPassword: z.string({ required_error: msg.empty })
        .min(2, { message: msg.password.min })
        .max(20, { message: msg.password.max }),

})
export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>


