"use client"
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useForm,Controller} from "react-hook-form"
import {Button,TextArea,TextField} from "@radix-ui/themes"
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface issuesform{
  title:string,
  description:string
}
const page = () => {
  const {register,control,handleSubmit}=useForm<issuesform>()
  const route=useRouter()
  return (
    <form  className='max-w-xl space-y-3 m-6 ' onSubmit={handleSubmit(async(data)=>{
try {
  await axios.post('/api/issues',data)
  route.push("/issues")
} catch (error) {
  console.error(error)
}

    })}>
<TextField.Root>
  <TextField.Input placeholder='title' {...register('title')} />
</TextField.Root>
<Controller
name='description'
control={control}
render={({field})=><SimpleMDE placeholder='description' {...field} />} />
<Button>Submit issue</Button>
     </form >
  )
}

export default page