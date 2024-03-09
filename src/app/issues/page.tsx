"use client"
import { Button } from '@mui/material'
import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    
    <Link href={"/issues/newissues"}
    ><Button variant="outlined">Create New Issues</Button></Link>
  
  
  )
}

export default page