'use client'

import React from 'react'

type Props = { url: string }

export default function DeleteButton({ url }: Props) {
    return (
        <button onClick={async () => {
            await fetch(`/api/avatar/file`, {
                method: 'DELETE',
                body: JSON.stringify({
                    url
                })
            })
        }}>DELETE</button>
    )
}