import { NextResponse,NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma";
import { issueschema } from "../../issueschema";
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