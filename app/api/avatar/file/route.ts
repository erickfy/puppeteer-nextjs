import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid'

export const runtime = 'edge'

export async function DELETE(req: Request) {
    const json = await req.json()
    console.log({ json })
    return Response.json({})
}
const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    7
) // 7-character random string

export async function POST(req: Request): Promise<NextResponse> {
    console.log(nanoid)
    const file = req.body || ''
    console.log(file)
    const contentType = req.headers.get('content-type') || 'text/plain'
    console.log(contentType)
    const filename = `${nanoid()}.${contentType.split('/')[1]}`
    console.log(filename)
    const blob = await put(filename, file, {
        contentType,
        access: 'public',
    })

    console.log(blob)

    return NextResponse.json(blob);
}