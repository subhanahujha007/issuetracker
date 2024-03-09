"use client"
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Button,TextArea,TextField} from "@radix-ui/themes"
const page = () => {
  return (
   
    <div className='max-w-xl space-y-3 m-6 '>
<TextField.Root>
  <TextField.Input placeholder='title'/>
</TextField.Root>
<SimpleMDE placeholder='description'/>
<Button>Submit issue</Button>
     </div>
  )
}

export default page