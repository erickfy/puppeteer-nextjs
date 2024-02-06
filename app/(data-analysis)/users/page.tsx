import { validateRequest } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export default async function UsersPage({ }: Props) {

  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }


  const users = await db.user.findMany()
  const count = await db.user.count()

  return (
    <div className='flex gap-4 flex-col'>
      <div>
        Users: {JSON.stringify(users)}
      </div>
      <div>
        Count Users: {JSON.stringify(count)}
      </div>

    </div>)
}