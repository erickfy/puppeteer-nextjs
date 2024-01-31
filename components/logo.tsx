'use client'
import Image from "next/image";

const Logo = () => {
  return (
    <div className="
    h-[80px]
     border-b
      shadow-sm
       flex
       justify-start
       md:justify-center
       pl-4
       md:pl-2
       items-center  gap-2">
      <Image
        height={25}
        width={75}
        alt="Cneyton Vazquez s.a. logo"
        src="/logo.webp"
        objectFit=""
      />
      <p className="font-medium text-md font-sans">Web Scrapping</p>
    </div>
  )
}

export default Logo