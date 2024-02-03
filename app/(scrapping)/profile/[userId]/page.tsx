'use client'

import { login } from '@/actions/authentication'
import FormCard from '@/app/(auth)/_components/form-card'
import React from 'react'

import { useRouter } from 'next/router'
type Props = {
    params: any
}

export default function ProfilebyId(props: Props) {
    console.log(props.params)
    return (
        <FormCard
            title="Editar Perfil"
            content={<div>Content</div>}
            footer={<button>submit</button>}
            action={login}
            descriptionOne="Edita tu perfil"
            descriptionTwo="2"
        />)
}