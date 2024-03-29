import { Lucia, TimeSpan } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";
import { Prisma, Session as SessionDB, User as UserDB } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { APP_ENV } from "./constants";
import { db } from "./db";

const adapter = new PrismaAdapter(db.session, db.user);
/**
 * DOCS:
 * https://oslo.js.org/reference/main/TimeSpanUnit
 * https://github.com/lucia-auth/examples/blob/main/nextjs-app/username-and-password/lib/auth.ts
 */

export const lucia = new Lucia(adapter, {
    sessionCookie: {

        attributes: {
            secure: APP_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            username: attributes.username,
            fullNames: attributes.fullNames,
            role: attributes.role,
            image: attributes.image,
        };
    },
    sessionExpiresIn: new TimeSpan(1, "w")
});


const nullResponse = {
    user: null,
    session: null
};

export const validateRequest = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

        if (!sessionId) return nullResponse

        const result = await lucia.validateSession(sessionId);

        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch (e) {
            console.error(e)
            if (e instanceof Prisma.PrismaClientKnownRequestError) return nullResponse
        }
        return result;
    }
);

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: Omit<UserDB,
            "hashedPassword" | 'createdAt' | 'updatedAt'
        >;
        // DatabaseSessionAttributes: Omit<SessionDB, ''>;
    }
} 