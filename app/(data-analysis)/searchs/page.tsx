import { db } from '@/lib/db'
import { USER_ROLE } from '@prisma/client';
import React, { Suspense } from 'react'
import Await from './await';
import UserTable from '../_components/table/user-table';

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

export default async function SearchsPage() {

  const users: Promise<TTableSearchPage[]> = db.user.findMany(
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

  /**
   * DOCS: 
   * https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#example
   */
  return (
    <Suspense fallback={<div>Cargando tabla de usuarios..</div>}>
      <Await promise={users}>
        {(usersResolved) => <UserTable data={usersResolved} />}
      </Await>
    </Suspense>)
}