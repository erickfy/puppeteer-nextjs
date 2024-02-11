import ErrorPage from '@/components/error-page/error-page'
import React from 'react'

/**
 * DOCS:
 * https://nextjs.org/docs/app/api-reference/file-conventions/error#not-foundjs
 */

export default function NotFound() {
    return (
        <ErrorPage
            status='401'
            descriptionOne='encontrar'
            descriptionTwo='la pagina buscada'
            href='/'
            hrefTitle='Regresar al Panel'
        />)
}