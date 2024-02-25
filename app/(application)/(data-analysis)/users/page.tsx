import Await from '@/components/await'
import Heading from '@/components/heading'
import { validateRequest } from '@/lib/auth'
import { db } from '@/lib/db'
import { USER_ROLE } from '@prisma/client'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import UserTable from '../_components/user-table'
import { Card, CardContent } from '@/components/ui/card'
import fs from 'fs'
import path from 'path'
import { Skeleton } from '@/components/ui/skeleton'
import { ReloadIcon } from '@radix-ui/react-icons'

type Props = {}

export interface TTableSearchPage {
  id: string;
  username: string;
  fullNames: string | null;
  image: string | null;
  role: USER_ROLE;
  active: boolean;
  instagramHistory: {
    list: string[];
  } | null;
  amazonHistory: {
    list: string[];
  } | null;
  mercadoLibreHistory: {
    list: string[];
  } | null;
  bookStoreHistory: {
    list: string[];
  } | null;
}

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

  const allUsers: Promise<TTableSearchPage[]> = db.user.findMany(
    {

      select: {
        id: true,
        username: true,
        fullNames: true,
        image: true,
        active: true,
        role: true,
        amazonHistory: {
          select: {
            list: true
          }
        },
        instagramHistory: {
          select: {
            list: true
          }
        },
        bookStoreHistory: {
          select: {
            list: true
          }
        },
        mercadoLibreHistory: {
          select: {
            list: true
          }
        }
      }
    }
  )




  return (
    <div className='flex gap-4 flex-col'>

      <Suspense fallback={
        <Card className='w-full min-h-screen flex gap-2 items-center justify-center'>
          <span>Cargando tabla de usuarios..</span>
          <ReloadIcon className='w-4 h-4 animate-spin' />
        </Card>}>
        <Await promise={allUsers}>
          {(usersResolved) =>
            <Card>
              <CardContent>
                <UserTable data={usersResolved} />
              </CardContent>
            </Card>
          }
        </Await>
      </Suspense>

      {/* <Heading
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
      </div> */}
    </div>

  )
}