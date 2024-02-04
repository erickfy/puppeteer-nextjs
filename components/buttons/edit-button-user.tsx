'use client'
import React, { useMemo } from 'react'
import LoadingDots from '../loading-dots';
import { useFormStatus } from 'react-dom';

type Props = {
  title: string
}

export default function EditButtonUser({  title }: Props) {
  const { pending } = useFormStatus()
  const saveDisabled = useMemo(() => {
    return pending
  }, [pending])


  return (
    <button
      disabled={saveDisabled}
      className={`${saveDisabled
        ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
        : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 px-10 items-center justify-center rounded-md border text-sm transition-all focus:outline-none`
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