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
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        const errorStrings = Object.values(errors).flat()
        return {
            errors: errorStrings
        }
    }
    console.log(validatedFields.data)
    return {
        errors: ['']
    }


    const { username, password } = validatedFields.data
    // if (
    //     typeof username !== "string" ||
    //     username.length < 3 ||
    //     username.length > 31 ||
    //     !/^[a-z0-9_-]+$/.test(username)
    // ) {
    //     return {
    //         errors: ["Invalid username"]
    //     };
    // }
    // const password = formData.get("password");
    // if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    //     return {
    //         errors: ["Invalid password"]
    //     };
    // }

    const existingUser = await db.testUser.findFirst({
        where: {
            username: username
        }
    })

    console.log(existingUser)

    if (!existingUser) {
        return {
            errors: ["Incorrect username or password"]
        };
    }

    const validPassword = await new Argon2id().verify(existingUser.password, password);
    if (!validPassword) {
        return {
            // error: "Incorrect username or password"
            errors: ["Password does not match"]
        };
    }

    const session = await lucia.createSession(existingUser.id, {

    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/instagram");
}


export async function signup(_: any, formData: FormData): Promise<ActionResult> {
    const validatedFields = SignUpSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
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
    console.log(validatedFields.data)
    return {
        errors: ['']
    }


    const { username, password, role } = validatedFields.data
    const hashedPassword = await new Argon2id({ secret: SECRET_HASH_PASS }).hash(password);
    const userId = generateId(15);

    try {

        const newuser = await db.testUser.create({
            data: {
                id: userId,
                username,
                password: hashedPassword,
                // role
            }
        })
        console.log(newuser)

        const session = await lucia.createSession(newuser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                errors: ["Username already used"]
            };
        }
        return {
            errors: ["An unknown error occurred"]
        };
        console.log(e)
    }
    return redirect("/lucia/login");
}
