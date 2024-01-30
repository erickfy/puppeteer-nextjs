'use client'

import Image from "next/image";

const Logo = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <Image
          height={70}
          width={200}
          alt="Cneyton Vazquez s.a. logo"
          src="/logo.webp"
          objectFit=""
        />
      </div>
    </>
  )
}

export default Logo