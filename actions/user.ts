'use server'
import { db } from "@/lib/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia, validateRequest } from "@/lib/auth";
import { ActionResult, Form } from "@/lib/form";
import { generateId } from "lucia";
import { EditUserSchema, SignInSchema, SignUpSchema } from "@/schemas/form-schemas";
import { Prisma } from "@prisma/client";
import { SECRET_HASH_PASS } from "@/lib/hashPassword";

export async function editUser(_: any, formData: FormData): Promise<ActionResult> {

    const validatedFields = EditUserSchema.safeParse({
        id: formData.get('id'),
        username: formData.get('username'),
        fullNames: formData.get('fullNames'),
        image: formData.get('image'),
        // role: formData.get('role'),
    })

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        const errorStrings = Object.values(errors).flat()
        console.log(errors)
        return {
            errors: errorStrings
        }
    }

    console.log(validatedFields.data)

    // return {
    //     errors: ['']
    // }

    const { id, username, fullNames, image } = validatedFields.data


    try {
        const newUser = await db.user.update({
            where: { id },
            data: {
                username,
                fullNames,
                image,
                // role
            }
        })

        console.log(newUser)

        if (!newUser) {
            return {
                errors: ["No se pudo actualizar el usuario."]
            };
        }

    } catch (e) {
        console.error(e)
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                errors: ["Username already used"]
            };
        }
        return {
            errors: ["An unknown error occurred"]
        };
    }

    return redirect("/instagram");
}