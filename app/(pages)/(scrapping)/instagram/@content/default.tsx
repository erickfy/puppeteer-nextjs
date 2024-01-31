import Link from 'next/link'
import React from 'react'

type Props = {}

const ContentPage = (props: Props) => {
  return (
    <div className="flex gap-2 flex-col">
      <Link href={'/instagram/something here'}>Go something</Link>
    </div>
  )
}

export default ContentPage