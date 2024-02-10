'use client'
import React, { useMemo } from 'react'
import LoadingDots from '../loading-dots';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  className?: string | null
  type?: "button" | "submit" | "reset";
  id: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonUI({ title, className, id }: Props) {
  const { pending } = useFormStatus()
  const saveDisabled = useMemo(() => {
    return pending
  }, [pending])


  return (
    <button
      id={id}
      disabled={saveDisabled}
      className={cn(`${saveDisabled
        ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
        : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 px-10 items-center justify-center rounded-md border text-sm transition-all focus:outline-none`
        , className
      )
      }
    >
      {
        saveDisabled ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="text-sm">{title}</ p >
        )}
    </button>
  )
}