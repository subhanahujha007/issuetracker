"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Callout } from '@radix-ui/themes';
type IssuesForm = {
    createdAt: Date,
    description: string,
    id: number,
    status: string,
    title: string,
    updatedAt: Date,
}
import { useRouter } from 'next/navigation';
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
 

 const Page = ({ params }: any) => {
  const route=useRouter()
    const [updatedstatus,setupdatedstatus]=useState(null)
    const [data, setData] = useState<IssuesForm | null>(null); 
    const [client,setclient]=useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event:any) => {
      setSelectedOption(event.target.value);
    };
    const handleclick=async(event:any)=>{
        try {
            const api={
                status:event.target.value
            }
      
            const response=await axios.put(`${process.env.NEXT_PUBLIC_domain!}/api/issues/${params.id}`,api)
                if(response.status==201){
                    setupdatedstatus(event.target.value)
                }
        } catch (error) {
            console.error(error)
        }
      }
      const handledelete=async()=>{
try { 
    const response=await axios.delete(`${process.env.NEXT_PUBLIC_domain!}/api/issues/${params.id}`)
    if(response.status==201){
      route.push("/issues")
    }
} catch (error) {
  alert("didnt work")
    console.error(error)
}
      }
    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_domain!}/api/issues/${params.id}`);
            setData(response.data); 
        }
        getData();
    }, [params.id]);

    return (
        <div>
            {
client ?(
<center>Loading ... </center>
):(<div className='flex flex-row'>
   
<div className='p-4 flex flex-col gap-5 min-w-[700px] max-w-xl'>
<Callout.Root color={`${updatedstatus===null?(data?.status==='OPEN'?'green':(data?.status==="CLOSED"?'red':'blue')):(updatedstatus==='OPEN'?'green':(updatedstatus==="CLOSED"?'red':'blue'))}`} className='min-w-0 max-w-28'>
        <Callout.Text>{updatedstatus===null?data?.status:updatedstatus}</Callout.Text>
      </Callout.Root>
    <h1 className='border p-2'>{data?.title}</h1>
    <p className='border p-2 min-h-[300px]'>{data?.description}</p>
</div>
<div className='p-4 gap-3 flex flex-col'>
    <select className='border-4 border-black-500 mt-[20px]' value={selectedOption} defaultValue={"option2"} onChange={handleSelectChange}>
        <option value="option1">assigned</option>
        <option value="option2"  >unassigned</option>
      </select>
      <AlertDialog>
  <AlertDialogTrigger>
    <Callout.Root color='purple'>
        <Callout.Text>Edit issue</Callout.Text>
    </Callout.Root>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>What status do you want to change it to</AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter className='flex flex-row justify-between '>
        {
         updatedstatus===null?(data?.status==='OPEN'?(<>
      <AlertDialogAction value="CLOSED" onClick={(event)=>handleclick(event)} className=' bg-red-800 '>Closed</AlertDialogAction>
      <AlertDialogAction value="IN_PROGRESS" onClick={(event)=>handleclick(event)} className='bg-blue-800'>In-progress</AlertDialogAction></>)
      :(
        data?.status==='CLOSED'?(<><AlertDialogAction onClick={(event)=>handleclick(event)} value="OPEN" className='bg-green-800'>OPEN</AlertDialogAction>
        <AlertDialogAction value="IN_PROGRESS" onClick={(event)=>handleclick(event)} className='bg-blue-800'>In-progress</AlertDialogAction></>):(
         <>   <AlertDialogAction value="CLOSED" onClick={(event)=>handleclick(event)} className='bg-red-800'>Closed</AlertDialogAction>
      <AlertDialogAction value="OPEN" onClick={(event)=>handleclick(event)} className='bg-green-800'>OPEN</AlertDialogAction></>
        )
      )):(updatedstatus==='OPEN'?(<>
        <AlertDialogAction value="CLOSED" onClick={(event)=>handleclick(event)} className=' bg-red-800 '>Closed</AlertDialogAction>
        <AlertDialogAction value="IN_PROGRESS" onClick={(event)=>handleclick(event)} className='bg-blue-800'>In-progress</AlertDialogAction></>)
        :(
          updatedstatus==='CLOSED'?(<><AlertDialogAction onClick={(event)=>handleclick(event)} value="OPEN" className='bg-green-800'>OPEN</AlertDialogAction>
          <AlertDialogAction value="IN_PROGRESS" onClick={(event)=>handleclick(event)} className='bg-blue-800'>In-progress</AlertDialogAction></>):(
           <>   <AlertDialogAction value="CLOSED" onClick={(event)=>handleclick(event)} className='bg-red-800'>Closed</AlertDialogAction>
        <AlertDialogAction value="OPEN" onClick={(event)=>handleclick(event)} className='bg-green-800'>OPEN</AlertDialogAction></>
          )
        )
      
      )
      }<AlertDialogAction>Cancel</AlertDialogAction>
     
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
<AlertDialog>
  <AlertDialogTrigger>
    <Callout.Root color='red'>
        <Callout.Text>Delete issues</Callout.Text>
    </Callout.Root>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>DO you want to delete this issue </AlertDialogTitle>
    </AlertDialogHeader>
    <AlertDialogFooter className='flex flex-row justify-between '>
        <AlertDialogAction className='bg-red-800' onClick={handledelete}>Delete it</AlertDialogAction>
      <AlertDialogAction>Cancel</AlertDialogAction>
     
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>


</div>
)
            }
        </div>
    );
};

export default Page;