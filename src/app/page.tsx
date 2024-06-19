"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Callout } from "@radix-ui/themes";
import Demo from "../Componenets/heatmap";

type issuesform = {
  createdAt: string,
  description: string,
  _id: number,
  status: string,
  title: string,
  updatedAt: string,
}

type HeatmapData = {
  date: string,
  count: number,
};

// Function to convert date to YYYY/MM/DD format
function convertDateFormat(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

// Function to group counts by date
function groupByDate(data: HeatmapData[]): HeatmapData[] {
  const groupedData: { [key: string]: number } = {};

  data.forEach(item => {
    if (groupedData[item.date]) {
      groupedData[item.date] += item.count;
    } else {
      groupedData[item.date] = item.count;
    }
  });

  return Object.keys(groupedData).map(date => ({
    date,
    count: groupedData[date]
  }));
}

export default function Home() {
  const [value, setvalue] = useState([]);
  const [data, setdata] = useState<{ name: string; Total: number }[]>([]);
  const [open, setopen] = useState(0);
  const [closed, setclosed] = useState(0);
  const [heatmap, setheatmap] = useState<HeatmapData[]>([]);
  const [inprogress, setinprogress] = useState(0);
  const [client, setclient] = useState(false);
  const [issue, setissue] = useState<issuesform[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_domain!}/api/issues`);
        setvalue(response.data);

        const heatmapData: HeatmapData[] = response.data.map((issue: issuesform) => ({
          date: convertDateFormat(issue.createdAt),
          count: 1
        }));

        // Group heatmap data by date
        const groupedHeatmapData = groupByDate(heatmapData);
        setheatmap(groupedHeatmapData);
        console.log(groupedHeatmapData)
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

        let latestissues = response.data.slice(response.data.length - 5);
        setissue(latestissues);
        setclient(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  return (
    <>
      {!client ? (
        <center>Loading</center>
      ) : (
        <div className="p-4 flex flow-row gap-[300px] flex-wrap">
          <div className="w-[400px] h-[400px] border">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={150} height={40} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="border items-center min-h-[100px]">
            <p className="text-center border-b p-2">Latest Issues</p>
            <div className="border-b p-4 flex flex-col justify-between">
              {issue.map((issues: issuesform) => (
                <div key={issues._id} className="flex flex-row gap-5 justify-between">
                  <h1><Link href={`issues/${issues._id}`}>{issues.title}</Link></h1>
                  <Callout.Root color={`${issues.status === 'OPEN' ? 'green' : (issues.status === "CLOSED" ? 'red' : 'blue')}`} className='mb-5'>
                    <Callout.Text>{issues.status}</Callout.Text>
                  </Callout.Root>
                  <h2>{convertDateFormat(issues.createdAt)}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <center style={{ marginTop: "30px", marginBottom: "30px" }}><Demo data={heatmap} /></center>
    </>
  );
}
