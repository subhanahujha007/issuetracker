import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma";
export async function GET(request:NextRequest,{params}:any) {
    try {
        const issue=await prisma.issue.findUnique({
            where:{
                id:Number(params.id)
            }
        })
        return NextResponse.json(issue, { status: 200 });
    } catch (error) {
        console.error("Error fetching issues:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request:NextRequest,{params}:any){
    try {
        const body=await request.json()
        const {status}=body;
         await prisma.issue.update({
            where: {
                id: Number(params.id)
            },
            data: {
                status:status
            }
        });
        return NextResponse.json({message:"Status updated"},{status:201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({message:"error occured"})
    }
    
}