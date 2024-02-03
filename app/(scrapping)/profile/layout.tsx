import React from 'react'

type Props = {
    children: React.ReactNode;
    dialog: React.ReactNode;
}

export default function Layout({
    children,
    dialog
}: Props) {
    return (
        <>
            {dialog}
            {children}
        </>
    )
}