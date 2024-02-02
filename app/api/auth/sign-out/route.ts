/**
 * @param {
 *  sessionId: String
 * }
 * @returns {
 *  status: 'done' 
 *  error?: string 
 * }
 */

import { lucia, validateRequest } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    try {

        const { user } = await validateRequest();

        // when session has been expired by default
        if (!user?.id) {
            return Response.json({ status: 'done' })
        }

        await lucia.invalidateSession(user.id);

        return Response.json({ status: 'done' })

    } catch (error) {
        console.error(error)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return Response.json({ error: 'Error DB, see logs' })
        } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return Response.json({ error: 'Unknown error, see logs' })
        }
    }
}