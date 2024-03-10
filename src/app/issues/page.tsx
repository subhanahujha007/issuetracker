"use client"
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
type issuesform={
  createdAt : Date,
  description:string, 
  id:number, 
  status:string,
  title: string,
  updatedAt:Date,
  
}
const page = () => {
  const [data,setdata]=useState<issuesform[]>([])
  useEffect(() => {
    async function getdata(){
      const response=await axios.get("/api/issues")
      setdata(response.data)
      console.log(response.data)
    }
getdata()
  }, [])
  
  return (
    <>
    <Link href={"/issues/newissues"}
    ><Button variant="outlined">Create New Issues</Button></Link>
<div className='max-w-[900px] m-auto border '>
  {data.map((issue) => (
        <div className='border-b p-4' key={issue.title}>
          <h3>{issue.title}</h3>
        </div>
      ))}
      </div>
  </>
  )
}

export default page