import Heading from '@/components/heading'
import { validateRequest } from '@/lib/auth'
import { db } from '@/lib/db'
import { USER_ROLE } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export default async function UsersPage({ }: Props) {

  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }


  const users = await db.user.findMany({
    select: {
      id: true,
      active: true,
      username: true,
      fullNames: true,
      role: true,
      image: true,
    }
  })

  const count = await db.user.count()

  return (
    <div className='flex gap-4 flex-col'>

      <Heading
        title='Usuarios'
        subtitle={`Total: ${count}`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {users.map((user) => (
          <div className="bg-white border rounded p-4 hover:scale-105 transition-all " key={user.id}>
            <img
              src={user.image ?? '/user-empty.webp'}
              alt="User"
              className="w-24 h-24 rounded-full mx-auto my-2"
            />
            <p className="font-bold text-lg mb-2">@{user.username}</p>
            <p className="mb-2"><span className='font-bold'>Nombres:</span> {user.fullNames}</p>
            <p className="mb-2"><span className='font-bold'>Rol:</span> {user.role === USER_ROLE.ADMIN ?
              "Administrador" : "Usuario"
            }</p>
            <p className="mb-2"><span className='font-bold'>Activo:</span> {user.active ? 'Si' : 'No'}</p>
          </div>))}
      </div>
    </div>

  )
}