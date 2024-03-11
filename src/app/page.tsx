"use client"
import Image from "next/image";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react"
import axios from "axios";

export default function Home() {
  const [value,setvalue]=useState([])
  const [data,setdata]=useState<{ name: string; uv: number }[]>([])
  const [open,setopen]=useState(0)
  const [closed,setclosed]=useState(0)
  const [inprogress,setinprogress]=useState(0)
  const [client,setclient]=useState(false)
 
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_domain}/api/issues`);
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
        setclient(true);

        const newData = [
          { name: 'OPEN', uv: openCount },
          { name: 'CLOSED', uv: closedCount },
          { name: 'IN-PROGRESS', uv: inprogressCount }
        ];
        setdata(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  
 
  return (
   <div className="p-4 flex flow-row gap-[300px]">
    <div className="w-[400px] h-[400px] border">
      {open}
     <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" />
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
   </div>
   <div className="border items-center">
    latest issues
    <div className="border-b p-4 flex flex-row justify-between">

    </div>
   </div>
   </div>
  );
}
