import { validateRequest } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import Recharts from '../_components/recharts'
type Props = {}

enum TYPE_RADAR {
  INSTAGRAM = 'Instagram',
  MERCADO_LIBRE = 'Mercado Libre',
  AMAZON = 'Amazon',
  BOOK_STORE = 'Tienda de Libros',
}
enum MAP_TYPE {
  INSTAGRAM = "instagram",
  AMAZON = "amazon",
  BOOK_STORE = "bookStore",
  MERCADO_LIBRE = "mercadoLibre",
  TOTAL_LENGTH = "total",
}

interface MapTypeIndex {
  [key: string]: MAP_TYPE;
}

const mapTypeIndex: MapTypeIndex = {
  INSTAGRAM: MAP_TYPE.INSTAGRAM,
  AMAZON: MAP_TYPE.AMAZON,
  BOOK_STORE: MAP_TYPE.BOOK_STORE,
  MERCADO_LIBRE: MAP_TYPE.MERCADO_LIBRE,
};
export default async function SearchsPage({ }: Props) {

  const { user, session } = await validateRequest()
  if (!session && !user) {
    return redirect('/protected')
  }

  // ALL SEARCH USERNAMES ONLY ADMIN USERS
  const manyUsers = await db.user.findMany({
    select: {
      amazonHistory: {
        select: {
          list: true
        }
      },
      bookStoreHistory: {
        select: {
          list: true
        }
      },
      instagramHistory: {
        select: {
          list: true
        }
      },
      mercadoLibreHistory: {
        select: {
          list: true
        }
      },
      _count: true,
      username: true
    }
  })


  const allUsernamesValues = manyUsers.reduce((acc, curr) => {
    const { username } = curr;

    const userInstagramLength = curr?.instagramHistory?.list.length ?? 0;
    const userAmazonLength = curr?.amazonHistory?.list.length ?? 0;
    const userBookStoreLength = curr?.bookStoreHistory?.list.length ?? 0;
    const userMercadoLibreLength = curr?.mercadoLibreHistory?.list.length ?? 0;
    const userMaxLength = Math.max(userInstagramLength, userAmazonLength, userBookStoreLength, userMercadoLibreLength);

    // INSTAGRAM VALUES
    if (!acc.has(MAP_TYPE.INSTAGRAM)) {
      acc.set(MAP_TYPE.INSTAGRAM, {
        [username]: userInstagramLength,
        fullMark: userInstagramLength,
        subject: MAP_TYPE.INSTAGRAM,
      });
    } else {
      const instagramValue = acc.get(MAP_TYPE.INSTAGRAM)
      instagramValue[username] = userInstagramLength;
      instagramValue.fullMark = Math.max(userInstagramLength, instagramValue.fullMark);
    }

    // MERCADO LIBRE VALUES
    if (!acc.has(MAP_TYPE.MERCADO_LIBRE)) {
      acc.set(MAP_TYPE.MERCADO_LIBRE, {
        [username]: userMercadoLibreLength,
        fullMark: userMercadoLibreLength,
        subject: MAP_TYPE.MERCADO_LIBRE,
      });
    } else {
      const mercadoLibreValue = acc.get(MAP_TYPE.MERCADO_LIBRE)
      mercadoLibreValue[username] = userMercadoLibreLength;
      mercadoLibreValue.fullMark = Math.max(userMercadoLibreLength, mercadoLibreValue.fullMark);
    }

    // BOOKSTORE VALUES
    if (!acc.has(MAP_TYPE.BOOK_STORE)) {
      acc.set(MAP_TYPE.BOOK_STORE, {
        [username]: userBookStoreLength,
        fullMark: userBookStoreLength,
        subject: MAP_TYPE.BOOK_STORE,
      });
    } else {
      const bookStoreValue = acc.get(MAP_TYPE.BOOK_STORE)
      bookStoreValue[username] = userBookStoreLength;
      bookStoreValue.fullMark = Math.max(userBookStoreLength, bookStoreValue.fullMark);
    }

    // AMAZON VALUES
    if (!acc.has(MAP_TYPE.AMAZON)) {
      acc.set(MAP_TYPE.AMAZON, {
        [username]: userAmazonLength,
        fullMark: userAmazonLength,
        subject: MAP_TYPE.AMAZON,
      });
    } else {
      const amazonValue = acc.get(MAP_TYPE.AMAZON);
      amazonValue[username] = userAmazonLength;
      amazonValue.fullMark = Math.max(userAmazonLength, amazonValue.fullMark);
    }

    // TOTAL VALUE
    if (!acc.has(MAP_TYPE.TOTAL_LENGTH)) {
      acc.set(MAP_TYPE.TOTAL_LENGTH, userMaxLength);
    } else {
      acc.set(MAP_TYPE.TOTAL_LENGTH, Math.max(userMaxLength, acc.get(MAP_TYPE.TOTAL_LENGTH)));
    }


    return acc;
  }, new Map());


  const cleanDataAllUsernames = Object.values(MAP_TYPE).map(type => {
    if (type === MAP_TYPE.INSTAGRAM) {
      const keys = allUsernamesValues.get(MAP_TYPE.INSTAGRAM)
      return {
        ...keys
      }

    }

    if (type === MAP_TYPE.AMAZON) {
      const keys = allUsernamesValues.get(MAP_TYPE.AMAZON)
      return {
        ...keys
      }

    }

    if (type === MAP_TYPE.MERCADO_LIBRE) {
      const keys = allUsernamesValues.get(MAP_TYPE.MERCADO_LIBRE)
      return {
        ...keys
      }

    }

    if (type === MAP_TYPE.BOOK_STORE) {
      const keys = allUsernamesValues.get(MAP_TYPE.BOOK_STORE)
      return {
        ...keys
      }

    }
  })


  const cleanDataAllUsernamesLength: number = allUsernamesValues.get(MAP_TYPE.TOTAL_LENGTH)
  const allUsers = manyUsers.map(user => ({ username: user.username }))



  return (
    <Recharts users={allUsers} data={cleanDataAllUsernames} max={cleanDataAllUsernamesLength} />
  )
}