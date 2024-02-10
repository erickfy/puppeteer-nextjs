import React from 'react'

type Props = {}

export default async function page({ }: Props) {
    const res = await fetch('http://localhost:3000/api/hello', { method: "GET" })
    const user = await res.json()

    console.log(user)
    return (
        <>
        <div id="message">Hello {user.name}</div>
        <div data-testid="message">Hello</div>
        </>
    )
}