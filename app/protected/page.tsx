import React from 'react'
import ErrorPage from '@/components/error-page/error-page'
import { validateRequest } from '@/lib/auth'
type Props = {}

export default async function ProtectedPage({ }: Props) {
    const { user, session } = await validateRequest()
    return (
        <ErrorPage
            status='401'
            descriptionOne='dejarte'
            descriptionTwo='entrar'
            href='/'
            hrefTitle='Iniciar Session'
        />
    )
}