import { validateRequest } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export default async function SearchsPage({ }: Props) {

  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }


  const searchs = await db.user.findFirst({
    where: { id: user.id },
    select: {
      amazonHistory: true,
      bookStoreHistory: true,
      instagramHistory: true,
      mercadoLibreHistory: true,
      _count: true,
    }
  }
  )

  const otherSearchs = await db.user.findMany({
    where: { id: user.id },
    select: {
      amazonHistory: true,
      bookStoreHistory: true,
      instagramHistory: true,
      mercadoLibreHistory: true,
      _count: true,
    }
  }
  )

  return (
    <div className='flex gap-4 flex-col'>
      <div>
        User: {JSON.stringify(searchs)}
      </div>
      <div>
        other Users: {JSON.stringify(otherSearchs)}
      </div>
    </div>
  )
}