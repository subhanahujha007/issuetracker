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

type IssuesForm = {
  createdAt: Date,
  description: string, 
  _id: number, 
  status: string,
  title: string,
  updatedAt: Date,
}

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [data, setData] = useState<IssuesForm[]>([]);
  const [client, setClient] = useState(false);
  const [all, setAll] = useState<IssuesForm[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataChanged, setDataChanged] = useState<IssuesForm[]>([]);

  const lastItem = currentPage * itemsPerPage;
  const firstItems = lastItem - itemsPerPage;
  const currentItems = data.slice(firstItems, lastItem);

  useEffect(() => {
    async function getData() {
      var response = await axios.get(`${process.env.NEXT_PUBLIC_domain!}/api/issues`)
      setData(response.data);
      setDataChanged(response.data);
      setAll(response.data);
      setClient(true);
      console.log(response.data);
    }
    getData();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    filterData(selectedValue, sortOrder);
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = e.target.value;
    setSortOrder(sortOrder);
    sortData(dataChanged, selectedOption, sortOrder);
  }

  const filterData = (status: string, sortOrder: string) => {
    const filteredData = status === "All" ? all : dataChanged.filter(item => item.status === status);
    sortData(filteredData, status, sortOrder);
  }

  const sortData = (data: IssuesForm[], status: string, sortOrder: string) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "latest") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
    });
    setData(sortedData);
  }

  return (
    <>
      <Link href={"/issues/newissues"}>
        <Button>Create New Issues</Button>
      </Link>
      <div className='flex mt-[20px] ml-9'>
        <select className='border border-black-500' value={selectedOption} onChange={handleSelectChange}>
          <option value="All">All</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
          <option value="IN_PROGRESS">In-progress</option>
        </select>
        <select className='border border-black-500 ml-4' value={sortOrder} onChange={handleSortChange}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {client ? (
        <>
          <div className='max-w-[900px] m-auto border '>
            <div className='border p-5 justify-between flex flex-row '><p>Issues</p><p>Status</p><p>Created At</p></div>
            <br />
            {currentItems.map((issue) => (
              <div className='border-b p-4 flex flex-row justify-between' key={issue.title}>
                <h3><Link href={`issues/${issue._id}`}>{issue.title}</Link></h3>
                <Callout.Root color={`${issue.status === 'OPEN' ? 'green' : (issue.status === "CLOSED" ? 'red' : 'blue')}`} className='mb-5'>
                  <Callout.Text>{issue.status}</Callout.Text>
                </Callout.Root>
                <h3>{issue.createdAt.toString().split('T')[0]}</h3>
              </div>
            ))}
          </div>
          <PaginationSection
            totalItems={data.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <center>Loading</center>
      )}
      <div className="p-4 flex justify-between w-full">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Who is the developer?</AccordionTrigger>
            <AccordionContent>
              Hey its me <Link href="https://github.com/subhanahujha007">Subhanshu Jha</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <AlertDialog>
          <AlertDialogTrigger>Click here to know more</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Why Did I Create This Project</AlertDialogTitle>
              <AlertDialogDescription>
                This project is made so that you can learn how to create issues and to display my awesome coding skills 😉
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Oh ok, now go</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default Page

function PaginationSection({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage
}: {
  totalItems: any,
  itemsPerPage: any,
  currentPage: any,
  setCurrentPage: any
}) {
  let pageNow = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNow.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1) }} />
        </PaginationItem>
        {
          pageNow.map((page, index) => (
            <PaginationItem key={index} className={currentPage === page ? "bg-neutral-100" : ""}>
              <PaginationLink onClick={() => setCurrentPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        <PaginationItem>
          <PaginationNext onClick={() => { if (currentPage < pageNow.length) setCurrentPage(currentPage + 1) }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
