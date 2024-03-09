"use client"
import Errorsmessage from "@/Componenets/Errors"
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm,Controller} from "react-hook-form"
import {Button,Callout,Text,TextField} from "@radix-ui/themes"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { issueschema } from '@/app/issueschema';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod"
type issuesform=z.infer<typeof issueschema>

const page = () => {
  const {register,control,handleSubmit,formState:{errors}}=useForm<issuesform>({
    resolver:zodResolver(issueschema)
  })
 const [error,seterror]=useState("") 
  const route=useRouter()
  return (<div className='max-w-xl space-y-3 m-6 flex flex-col ' >
    {
      error &&
      <Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
    }
    <form  onSubmit={handleSubmit(async(data)=>{
try {
  await axios.post('/api/issues',data)
  route.push("/issues")
} catch (error) {
  seterror("An unexpected error occurred")
  console.error(error)
}

    })}>
<TextField.Root className='mb-2'>
  <TextField.Input  placeholder='title' {...register('title')} />
</TextField.Root>
<Errorsmessage>
  {errors.title?.message}
</Errorsmessage>
<Controller
name='description'
control={control}
render={({field})=><SimpleMDE placeholder='description' {...field} />} />
<Errorsmessage>
  {errors.description?.message}
</Errorsmessage>
<Button>Submit issue</Button>
     </form >
     </div>
  )
}

export default page