import React from 'react'
import { getUser } from '../layout'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { USER_ROLE } from '@prisma/client'
import { EnvelopeOpenIcon } from '@radix-ui/react-icons'
import EditButton from './_components/edit-button'

type Props = {
  dialog: React.ReactNode
}

export default function ProfilePage({ dialog }: Props) {
  const user = getUser()

  return (
      <Card className='w-full xl:w-[625px] relative'>
        <div className="absolute top-3 right-3">
          <EditButton userId={user.id} />
        </div>
        <CardHeader>
          <div className='flex flex-col md:flex-row gap-8 md:gap-8 justify-start items-center'>
            <div className='min-w-[150px] min-h-[150px] relative flex'>

              <Image
                src={user.image}
                objectFit="cover"
                layout="fill"
                alt="Descripción de la imagen"
                // width={100}
                // height={100}
                className="rounded-full"
              />
            </div>

            <div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">{user.username}</h4>
                <p className="text-sm text-muted-foreground">
                  {user.fullNames}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total de busquedas realizadas: 20
                </p>
              </div>
              <Separator className="my-4" />
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>{user.role === USER_ROLE.ADMIN ? "Administrador" : "Usuario"}</div>
                <Separator orientation="vertical" />
                <div>Activo</div>
                <Separator orientation="vertical" />
                <div><Button variant={"link"}>Cambiar mi contrasena</Button></div>
              </div>
            </div>

          </div>

        </CardHeader>

      </Card>
  )
}