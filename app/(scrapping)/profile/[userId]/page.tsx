'use client'

import { login } from '@/actions/authentication'
import FormCard from "@/components/cards/form-card";
import React from 'react'

type Props = {
    params: any
}

export default function ProfilebyId(props: Props) {
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