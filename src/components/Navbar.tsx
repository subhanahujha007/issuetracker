"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {AiFillBug} from "react-icons/ai"
const Navbar = () => {
    const currentpath=usePathname()
    const link=[{
        href:'/',
        title:'Dashboard'
    }
    ,{
href:'/issues',
title:'issues',
    }]
  return (
    <div className='flex flex-row items-center h-16 w-full gap-8 p-4 border-b  '>
        <Link href="/">
        <AiFillBug/>
        </Link>
       { link.map(links=>
        <Link href={links.href}
        key={links.href}
        className={`${links.href===currentpath ? 'text-zinc-900' : 'text-zinc-500'}hover:text-zinc-800 transition-colors text-lg `}
        >
        {links.title}
        </Link>
        )}
    </div>
  )
}

export default Navbar