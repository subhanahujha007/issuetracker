"use client"
import { Button } from '@/components/ui/button'
import { Callout } from '@radix-ui/themes'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
type issuesform={
  createdAt : Date,
  description:string, 
  _id:number, 
  status:string,
  title: string,
  updatedAt:Date,
  
}
const Page = () => {
  const [selectedOption,setSelectedOption]=useState("")
  const [data,setdata]=useState<issuesform[]>([])
  const [client,setclient]=useState(false)
  const [all,setall]=useState<issuesform[]>([])
  const [currentpage,setcurrentpage]=useState(1)
  const [itemsperpage,setitemsperpage]=useState(10)
  const [datachanged,setdatachanged]=useState<issuesform[]>([])
const lastitem=currentpage*itemsperpage;
const firstitems=lastitem-itemsperpage;
const currentitems=data.slice(firstitems,lastitem)

useEffect(() => {
  async function getdata(){
    var response=await axios.get(`${process.env.NEXT_PUBLIC_domain!}/api/issues`)
    setdata(response.data)
    setdatachanged(response.data)
    setall(response.data)
    setclient(true)
    console.log(response.data)
  }
getdata()

}, [])
const handleSelectChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
  const selectedValue = e.target.value;
  setSelectedOption(selectedValue);
  const filteredData = selectedValue === "All" ? all : datachanged.filter(item => item.status === selectedValue);
  setdata(filteredData);
}
  return (
    <>
    <Link href={"/issues/newissues"}
    ><Button >Create New Issues</Button></Link>
 <select className='border border-black-500 mt-[20px] ml-9' value={selectedOption} defaultValue={"All"} onChange={handleSelectChange} >
        <option value="All">All</option>
        <option value="OPEN"  >Open</option>
        <option value="CLOSED">Closed</option>
        <option value="IN_PROGRESS">In-progress</option>
      </select>
{client ? (<><div className='max-w-[900px] m-auto border '>
  <div className='border p-5 justify-between flex flex-row '><p>issues</p><p>status</p><p>createdAt</p></div>
  <br />
  {
  
  currentitems.map((issue) => (
        <div className='border-b p-4 flex flex-row justify-between' key={issue.title}>
          <h3><Link href={`issues/${issue._id}`}>{issue.title}</Link></h3>
          <Callout.Root color={`${issue.status==='OPEN'?'green':(issue.status==="CLOSED"?'red':'blue')}`} className='mb-5'>
        <Callout.Text>{issue.status}</Callout.Text>
      </Callout.Root>
          <h3>{issue.createdAt.toString().split('T')[0]}</h3>
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
      <div className=" p-4 flex justify-between w-full">
      <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Who is the developer ?</AccordionTrigger>
    <AccordionContent>
     Hey its me <Link href="https://github.com/subhanahujha007">Subhanshu jha</Link>
    </AccordionContent>
  </AccordionItem>
</Accordion>

<AlertDialog>
  <AlertDialogTrigger>Click here to know more</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>WHY DID I CREATED THIS PROJECT</AlertDialogTitle>
      <AlertDialogDescription>
        THIS PROJECT IS MADE SO THAT YOU CAN LEARN HOW TO CREATE ISSUE <br/>
        AND TO DISPLAY MY AWESOME CODEING SKILLS 😉
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>oh ok now go</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

</div>

  </>
  )
}

export default Page

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
      <PaginationNext onClick={() => { if (currentpage < pagenow.length) setcurrentpage(currentpage + 1) } }  />
    </PaginationItem>
  </PaginationContent>
</Pagination>)

}