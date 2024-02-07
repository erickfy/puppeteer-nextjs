'use server'

import { put } from "@vercel/blob"
import { customAlphabet } from "nanoid"


const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    7
)
export async function sendImage(image: File, contentType: string) {
    const formData = new FormData()
    formData.append('file', image as Blob)

    const filename = `${nanoid()}.${contentType.split('/')[1]}`
    const blob = await put(filename, image, {
        contentType,
        access: 'public',
    })

    return blob.url
}