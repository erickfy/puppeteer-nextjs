'use client';

import React, { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

interface ClientOnlyProps {
    children: React.ReactNode;
    fallback?: React.ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
    children,
    fallback = <Skeleton className='w-full h-full ' />
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, [])

    if (!hasMounted) return fallback;

    return (
        <>
            {children}
        </>
    );
};

export default ClientOnly;
