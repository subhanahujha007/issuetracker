"use client"
import Image from "next/image";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: ' OPEN',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'CLOSED',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'IN-PROGRESS',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },]
export default function Home() {
  return (
   <div className="p-4">
    <div className="w-[400px] h-[400px] border">
   <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" />
          <YAxis/>
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
   </div>
   
   </div>
  );
}
