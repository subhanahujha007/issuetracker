"use client"
import Image from "next/image";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react"
import axios from "axios";
import Link  from "next/link";
import { Callout } from "@radix-ui/themes";
type issuesform={
  createdAt : Date,
  description:string, 
  id:number, 
  status:string,
  title: string,
  updatedAt:Date,
  
}
export default function Home() {
  const [value,setvalue]=useState([])
  const [data,setdata]=useState<{ name: string; Total: number }[]>([])
  const [open,setopen]=useState(0)
  const [closed,setclosed]=useState(0)
  const [inprogress,setinprogress]=useState(0)
  const [client,setclient]=useState(false)
  const [issue,setissue]=useState<issuesform[]>([])
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_domain!}/api/issues`);
        setvalue(response.data);

        let openCount = 0, closedCount = 0, inprogressCount = 0;
        for (let i = 0; i < response.data.length; i++) {
          const status = response.data[i].status;
          if (status === 'OPEN') {
            openCount++;
          } else if (status === 'CLOSED') {
            closedCount++;
          } else {
            inprogressCount++;
          }
        }

        setopen(openCount);
        setclosed(closedCount);
        setinprogress(inprogressCount);

        const newData = [
          { name: 'OPEN', Total: openCount },
          { name: 'CLOSED', Total: closedCount },
          { name: 'IN-PROGRESS', Total: inprogressCount }
        ];
        setdata(newData);
        let latestissues=response.data.slice(response.data.length - 5)
        setissue(latestissues)
        setclient(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  
 
  return (<>{!client ? (<center>Loading</center>) : (
   <div className="p-4 flex flow-row gap-[300px] flex-wrap">
    <div className="w-[400px] h-[400px] border">
     <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="Total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
   </div>
   <div className="border items-center min-h-[100px]">
    <p className="text-center border-b p-2">Latest Issues</p>
    <div className="border-b p-4 flex flex-col justify-between">
{
  issue.map((issues):any=>{
    return(
      <><div key={issues.id} className="flex flex-row gap-5 justify-between">
      <h1><Link href={`issues/${issues.id}`}>{issues.title}</Link></h1>
      <Callout.Root color={`${issues.status==='OPEN'?'green':(issues.status==="CLOSED"?'red':'blue')}`} className='mb-5'>
        <Callout.Text>{issues.status}</Callout.Text>
      </Callout.Root>
      <h2>{issues.createdAt.toString().split('T')[0]}</h2>
      </div>
      </>
    )
  })
}
    </div>
   </div>
   </div>)}</>
  );
}
