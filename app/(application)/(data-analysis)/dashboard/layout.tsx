import React from 'react'

type Props = {
    children: React.ReactNode;
    char: React.ReactNode;
    dialog: React.ReactNode;
}

export default function Layout({
    children,
    char,
    dialog
}: Props) {
    return (
        <>
            <div className='grid gap-4 grid-cols-1 xl:grid-cols-2'>

                {children}
                {char}
            </div>
            {dialog}
        </>
    )
}