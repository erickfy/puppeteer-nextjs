'use client'

import React, { ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type Props = {
    id: string
    name: string;
    src?: string
}

export default function Uploader({ id = "image-upload", src, name }: Props) {

    const [data, setData] = useState<{
        image: string | null
    }>({
        image: src ? src : null,
    })
    const [file, setFile] = useState<File | null>(null)

    const [dragActive, setDragActive] = useState(false)

    const onChangePicture = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.currentTarget.files && event.currentTarget.files[0]
            if (file) {
                if (file.size / 1024 / 1024 > 50) {
                    toast.error('Archivo muy grande (max 50MB)')
                } else {
                    setFile(file)
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        setData((prev) => ({ ...prev, image: e.target?.result as string }))
                    }
                    reader.readAsDataURL(file)
                }
            }
        },
        [setData]
    )

    return (
        <>
            <div>
                <div className="space-y-1 mb-4">
                    <h2 className="text-xl font-semibold">Subir a Imagen</h2>
                    <p className="text-sm text-gray-500">
                        Formatos aceptados: .png, .jpg, .jpeg, .gif
                    </p>
                </div>
                <label
                    htmlFor={id}
                    className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
                >
                    <div
                        className="absolute z-[5] h-full w-full rounded-md"
                        onDragOver={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDragActive(true)
                        }}
                        onDragEnter={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDragActive(true)
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDragActive(false)
                        }}
                        onDrop={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDragActive(false)

                            const file = e.dataTransfer.files && e.dataTransfer.files[0]
                            if (file) {
                                if (file.size / 1024 / 1024 > 50) {
                                    toast.error('File size too big (max 50MB)')
                                } else {
                                    setFile(file)
                                    const reader = new FileReader()
                                    reader.onload = (e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            image: e.target?.result as string,
                                        }))
                                    }
                                    reader.readAsDataURL(file)
                                }
                            }
                        }}
                    />
                    <div
                        className={cn(`${dragActive ? 'border-2 border-black' : ''
                            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${data.image
                                ? 'bg-white/80 opacity-0  hover:opacity-100 hover:backdrop-blur-md'
                                : 'bg-white opacity-100 hover:bg-gray-50'
                            }`,
                        )
                        }

                    >
                        <svg
                            className={`${dragActive ? 'scale-110' : 'scale-100'
                                } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                            <path d="M12 12v9"></path>
                            <path d="m16 16-4-4-4 4"></path>
                        </svg>
                        <p className="mt-2 text-center text-sm text-gray-500">
                            Arrastra y suelta o click para subir.
                        </p>
                        <p className="mt-2 text-center text-sm text-gray-500">
                            Tamano Maximo: 50MB
                        </p>
                        <span className="sr-only">Photo upload</span>
                    </div>
                    {data.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={data.image}
                            alt="Preview"
                            className="h-full w-full rounded-md object-cover"
                            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                const target = event.target as HTMLImageElement;
                                target.src = '/user-empty.webp';
                            }}
                        />
                    )}
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                        id={id}
                        name={name}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={onChangePicture}
                    />
                </div>
            </div>
        </>
    )
}