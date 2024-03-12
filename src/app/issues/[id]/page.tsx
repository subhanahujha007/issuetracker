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
 

export const Page = ({ params }: any) => {
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
                status:event.target.value,
                id:data?.id
            }
            console.log(api)
            const response=await axios.put(`${process.env.NEXT_PUBLIC_domain}/api/issues`,api)
                if(response.status==201){
                    setupdatedstatus(event.target.value)
                }
        } catch (error) {
            console.error(error)
        }
      }
    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_domain}/api/issues`);
            console.log(response.data[5].id)
            const filteredData = response.data.find((item: IssuesForm) => item.id === Number(params.id));
            console.log(filteredData)
            setData(filteredData); 
        }
        getData();
    }, []);

    return (
        <div>
            {
client ?(
<center>Loading ... </center>
):(<div className='flex flex-row'>
   
<div className='p-4 flex flex-col gap-5 min-w-[700px] max-w-xl'>
<Callout.Root color={`${data?.status==='OPEN'?'green':(data?.status==="CLOSED"?'red':'blue')}`} className='min-w-0 max-w-28'>
        <Callout.Text>{updatedstatus===null?data?.status:updatedstatus}</Callout.Text>
      </Callout.Root>
    <h1 className='border p-2'>{data?.title}</h1>
    <p className='border p-2 min-h-[300px]'>{data?.description}</p>
</div>
<div className='p-4 gap-3 flex flex-col'>
    <select className='border-4 border-black-500 mt-[20px]' value={selectedOption} onChange={handleSelectChange}>
        <option value="option1">assigned</option>
        <option value="option2" selected >unassigned</option>
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
            data?.status==='OPEN'?(<>
      <AlertDialogAction value="CLOSED" onClick={(event)=>handleclick(event)} className=' bg-red-800 '>Closed</AlertDialogAction>
      <AlertDialogAction value="IN_PROGRESS" onClick={(event)=>handleclick(event)} className='bg-blue-800'>In-progress</AlertDialogAction></>)
      :(
        data?.status==='CLOSED'?(<><AlertDialogAction onClick={(event)=>handleclick(event)} value="OPEN" className='bg-green-800'>OPEN</AlertDialogAction>
        <AlertDialogAction value="IN_PROGRESS" onClick={(event)=>handleclick(event)} className='bg-blue-800'>In-progress</AlertDialogAction></>):(
         <>   <AlertDialogAction value="CLOSED" onClick={(event)=>handleclick(event)} className='bg-red-800'>Closed</AlertDialogAction>
      <AlertDialogAction value="OPEN" onClick={(event)=>handleclick(event)} className='bg-green-800'>OPEN</AlertDialogAction></>
        )
      )
      }<AlertDialogAction>Cancel</AlertDialogAction>
     
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

export default Page