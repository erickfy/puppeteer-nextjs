'use client'

import ErrorPage from '@/components/error-page/error-page'
import React from 'react'

type Props = {}
/**
 * DOCS:
 * https://nextjs.org/docs/app/api-reference/file-conventions/error
 */

export default function NotFound({ }: Props) {
    return (
        <ErrorPage
            status='404'
            descriptionOne='encontrar'
            descriptionTwo='la pagina buscada'
            href='/'
            hrefTitle='Regresar al Panel'
        />)
}