import { db } from "@/lib/db"

export async function POST(req: Request) {
    try {

        const { userId, active } = await req.json()

        if (!userId) {
            // NO CONTENT
            return new Response(null, { status: 204 })
        }

        const isActive = Boolean(active)
        console.log(isActive, userId)
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                active: !isActive
            }

        })

        return new Response(null, { status: 200 })
    } catch (error) {

    }

}