"use client"
import { Button } from '@mui/material'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { totalmem } from 'os'
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
  const [client,setclient]=useState(false)
  const [currentpage,setcurrentpage]=useState(1)
  const [itemsperpage,setitemsperpage]=useState(10)
const lastitem=currentpage*itemsperpage;
const firstitems=lastitem-itemsperpage;
const currentitems=data.slice(firstitems,lastitem)
useEffect(() => {
  async function getdata(){
    const response=await axios.get("/api/issues")
    setdata(response.data)
    setclient(true)
  }
getdata()

}, [])
  return (
    <>
    <Link href={"/issues/newissues"}
    ><Button variant="outlined">Create New Issues</Button></Link>

{client ? (<><div className='max-w-[900px] m-auto border '>
  {
  
  currentitems.map((issue) => (
        <div className='border-b p-4' key={issue.title}>
          <h3>{issue.title}</h3>
        </div>
      ))}
      </div>
      <Paginationsection
      totalitems={data.length}
      itemsperpage={itemsperpage}
      currentpage={currentpage}
      setcurrentpage={setcurrentpage}
      
      />
      </>):(<center>Loading</center>)
      }
      
  </>
  )
}

export default page

function Paginationsection({
  totalitems,
  itemsperpage,
  currentpage,
  setcurrentpage
}:{totalitems:any,
  itemsperpage:any,
  currentpage:any,
  setcurrentpage:any

}){
let pagenow=[]
for(let i=1;i<= Math.ceil(totalitems/itemsperpage);i++ ){
  pagenow.push(i)
}

 return( <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious  onClick={()=>{if(currentpage > 1)setcurrentpage(currentpage - 1 )}} />
    </PaginationItem>
    {
      pagenow.map((page,index)=>(
        <PaginationItem key={index} className={currentpage===page ?"bg-neutral-100":""}>
        <PaginationLink onClick={()=>setcurrentpage(page)}>
          {page}
        </PaginationLink>
        </PaginationItem>
      ))
    }
    <PaginationItem>
      <PaginationNext onClick={()=>{if(currentpage < pagenow.length)setcurrentpage(currentpage +1 )}} />
    </PaginationItem>
  </PaginationContent>
</Pagination>)

}