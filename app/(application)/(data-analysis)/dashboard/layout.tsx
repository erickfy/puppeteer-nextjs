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
            <div className='flex flex-wrap gap-4 '>
                {char}
                {children}
            </div>
            {dialog}
        </>
    )
}