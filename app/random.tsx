import ErrorPage from '@/components/error-page/error-page'
import React from 'react'

type Props = {}

export default function NotFound({ }: Props) {
    return (
        <ErrorPage
            status='401'
            descriptionOne='encontrar'
            descriptionTwo='la pagina buscada'
            href='/'
            hrefTitle='Regresar al Panel'
        />)
}