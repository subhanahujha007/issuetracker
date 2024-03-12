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

export const Page = ({ params }: any) => {
    const [data, setData] = useState<IssuesForm | null>(null); 
    const [client,setclient]=useState<boolean>(false)
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event:any) => {
      setSelectedOption(event.target.value);
    };
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
<Callout.Root color={`${data?.status==='OPEN'?'green':(data?.status==="CLOSED"?'red':'blue')}`} className='mb-5 max-w-[70px] max-h-[50px] p-1 mt-3'>
        <Callout.Text>{data?.status}</Callout.Text>
      </Callout.Root>
    <h1 className='border p-2'>{data?.title}</h1>
    <p className='border p-2 min-h-[300px]'>{data?.description}</p>
</div>
<div className='p-4 '>
    <select className='border-4 border-black-500 mt-[20px]' value={selectedOption} onChange={handleSelectChange}>
        <option value="option1">assigned</option>
        <option value="option2" selected >unassigned</option>
      </select>
    </div>


</div>
)
            }
        </div>
    );
};

export default Page