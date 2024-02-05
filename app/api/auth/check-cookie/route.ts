import { validateRequest } from "@/lib/auth";

export async function GET() {
    try {

        const { user, session } = await validateRequest()
        console.log('al fin', user)
        console.log('al session', session)
        if (!user || !session) {
            return new Response(null, { status: 401 })
        } else {
            return new Response(null, { status: 200 })
        }
        return new Response(JSON.stringify({ message: 'Operación exitosa' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(null, { status: 401 })
    }
}