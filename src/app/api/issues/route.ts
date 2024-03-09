import { NextResponse,NextRequest } from "next/server";
import {z} from "zod"
import prisma from "../../../../prisma/prisma";
const issueschema=z.object({
    title:z.string().min(1).max(255),
    description:z.string().min(1)
})
export  async function POST(request:NextRequest) {
    const body=await request.json()
    const validation=issueschema.safeParse(body)
    if(!validation.success){
        return NextResponse.json(validation.error.errors,{status:401})
    }
    const newissue=await prisma.issue.create({
        data:{title:body.title,
        description:body.description}
    })
    return NextResponse.json(newissue,{status:201})
}