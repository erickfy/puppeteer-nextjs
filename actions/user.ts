'use server'
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { ActionResult } from "@/lib/form";
import { ChangePasswordSchema, EditUserSchema } from "@/schemas/form-schemas";
import { Prisma } from "@prisma/client";
import { sendImage } from "./sendImage";
import { Argon2id } from "oslo/password";
import { SECRET_HASH_PASS } from "@/lib/hashPassword";

export async function changePasswordAction(_: any, formData: FormData): Promise<ActionResult> {

    const validatedFields = ChangePasswordSchema.safeParse({
        id: formData.get('id'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        const errorStrings = Object.values(errors).flat()
        console.log(errors)
        return {
            errors: errorStrings
        }
    }

    const { id, password, confirmPassword } = validatedFields.data

    if (password !== confirmPassword) {
        return {
            errors: ['Las contrasenas no coinciden']
        }
    }

    const hashedPassword = await new Argon2id({ secret: SECRET_HASH_PASS }).hash(password);

    try {
        const newUser = await db.user.update({
            where: { id },
            data: {
                hashedPassword
            }
        })

        if (!newUser) {
            return {
                errors: ["No se pudo actualizar el usuario."]
            };
        }

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("DB", e)
            return {
                errors: [""]
            };
        } else {
            console.error(e)
            return { errors: ["Un desconocido error ocurrio"] };
        }
    }

    return redirect("/instagram");
}


export async function editUser(_: any, formData: FormData): Promise<ActionResult> {

    const validatedFields = EditUserSchema.safeParse({
        id: formData.get('id'),
        fullNames: formData.get('fullNames'),
        image: formData.get('image'),
    })

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        const errorStrings = Object.values(errors).flat()
        console.log(errors)
        return {
            errors: errorStrings
        }
    }

    const { id, fullNames, image } = validatedFields.data

    let urlImage = image ? await sendImage(image, image.type) : null

    try {
        const newUser = await db.user.update({
            where: { id },
            data: {
                fullNames,
                image: urlImage ? urlImage : null
            }
        })

        if (!newUser) {
            return {
                errors: ["No se pudo actualizar el usuario."]
            };
        }

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("DB", e)
            return {
                errors: [""]
            };
        } else {
            console.error(e)
            return { errors: ["Un desconocido error ocurrio"] };
        }
    }

    return redirect("/instagram");
}