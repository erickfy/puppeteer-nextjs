import React from 'react'
import { list } from '@vercel/blob'
import Link from 'next/link';
type Props = {}

export default async function AllFilesPage({ }: Props) {
    const { blobs } = await list();
    return (
        <div>

            {blobs.map(b => (
                <div key={b.url}>
                    {b.pathname} - <button>Delete url</button>
                </div>))}

            <Link href={'/test'}>
                return
            </Link>
        </div>
    )
}