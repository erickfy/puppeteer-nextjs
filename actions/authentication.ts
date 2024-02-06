'use server'
import { db } from "@/lib/db";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { lucia, validateRequest } from "@/lib/auth";
import { ActionResult, Form } from "@/lib/form";
import { generateId } from "lucia";
import { SignInSchema, SignUpSchema } from "@/schemas/form-schemas";
import { Prisma } from "@prisma/client";
import { SECRET_HASH_PASS } from "@/lib/hashPassword";

export async function login(_: any, formData: FormData): Promise<ActionResult> {

    const validatedFields = SignInSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        const errorStrings = Object.values(errors).flat()
        console.log(errors)
        return {
            errors: errorStrings
        }
    }
    const { username, password } = validatedFields.data
    try {
        const existingUser = await db.user.findFirst({
            where: {
                username: username,
                active: true
            }
        })

        if (!existingUser) {
            return {
                errors: ["El usuario no existe!"]
            };
        }

        const validPassword = await new Argon2id({ secret: SECRET_HASH_PASS }).verify(existingUser.hashedPassword, password);

        if (!validPassword) {
            return {
                errors: ["Contrasena incorrecta!"]
                // errors: ["Campos ingresados incorrectos"]
            };
        }

        const session = await lucia.createSession(existingUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

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


export async function signup(_: any, formData: FormData): Promise<ActionResult> {
    const validatedFields = SignUpSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        role: formData.get('role'),
    })

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        console.log(errors)
        const errorStrings = Object.values(errors).flat()
        return {
            errors: errorStrings
        }
    }
    // if (validatedFields.data.password !== validatedFields.data.confirmPassword) {
    //     return { errors: ["Las contrasenas no coinciden"] }
    // }

    const { username, password, role } = validatedFields.data

    const hashedPassword = await new Argon2id({ secret: SECRET_HASH_PASS }).hash(password);
    const userId = generateId(15);

    try {

        const newuser = await db.user.create({
            data: {
                id: userId,
                username,
                hashedPassword,
                active: true,
                role
            }
        })
        
        console.log(newuser)

        const session = await lucia.createSession(newuser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    } catch (e) {
        console.log(e)
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