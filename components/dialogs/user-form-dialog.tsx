import React from 'react'
import { editUser } from '@/actions/user'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Uploader from '@/components/uploader'
import ButtonUI from '@/components/buttons/button-ui'
import { User } from 'lucia'
import DialogUI from './dialog-ui'

type Props = {
    user: User,
}

export default function UserFormDialog({ user }: Props) {

    const content = (<>
        <Input name='id' className='hidden' defaultValue={user.id} />
        <div className="grid w-full max-w-xs items-center gap-2">
            <Label htmlFor="fullNames">Nombres Completos</Label>
            <Input type="text" name="fullNames" id="fullNames" placeholder="Ej: Johan Quinatoa" defaultValue={user.fullNames ? user.fullNames : ''} />
        </div>
        <div className="grid w-full max-w-xs items-center gap-2">
            <Uploader id='image-upload' name='image' src={user.image ? user.image : undefined} />
        </div>

    </>)

    const buttonClose = (<Button type="button" variant="secondary">Cerrar</Button>)
    const buttonSubmit = <ButtonUI title='Actualizar' />

    return (
        <DialogUI
            title='Editar Usuario'
            description={user.username.toLocaleUpperCase()}
            action={editUser}
            buttonClose={buttonClose}
            buttonSubmit={buttonSubmit}
            content={content}
        />
    )
}