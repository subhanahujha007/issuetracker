"use client"
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const page = ({params}:any) => {
    const [data,setdata]=useState()
    useEffect(() => {
        async function getdata(){
          const response=await axios.get(`${process.env.NEXT_PUBLIC_domain}/api/issues?${params.id}=1`)
          setdata(response.data)
            console.log(response.data)
        }
      getdata()
      
      }, [])
    return (
    <div>{params.id}</div>
  )
}

export default page