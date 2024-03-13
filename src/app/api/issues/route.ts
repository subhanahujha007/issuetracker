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

export async function GET(request: NextRequest) {
    try {
        const issues = await prisma.issue.findMany(); 
        return new NextResponse(JSON.stringify(issues), { status: 200 });
    } catch (error) {
        console.error("Error fetching issues:", error);
        return new NextResponse(JSON.stringify({ message: "nahi aaya lol" }), { status: 500 });
    }
}

export async function PUT(request:NextRequest){
    try {
        const body=await request.json()
        const {id,status}=body;
         await prisma.issue.update({
            where: {
                id: id
            },
            data: {
                status:status
            }
        });
        return NextResponse.json({message:"Status updated"},{status:201})
    } catch (error) {
        console.error(error)
    }
    
}
