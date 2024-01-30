import { getSession } from "@/data/getCurrentUser";

export async function POST(req: Request) {
    try {

        const session = await getSession();

        if (!session) return Response.json({ status: 400, msg: "Not auth available" })

        if (!session.user) return Response.json({ status: 400, msg: "Not auth available to this user" })

        if ('role' in session.user) return Response.json({ status: 200, role: session.user.role, msg: "auth successfully" })

    } catch (error) {
        return Response.error()
    }
}