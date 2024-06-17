import { NextResponse, NextRequest } from "next/server";
import Issue from "../../../../Databse/Schema";
import { dbConnect } from "../../../../Databse/Connect";
import { issueschema } from "../../issueschema";
 dbConnect();
export async function POST(request: NextRequest) {
  
  
  const body = await request.json();
  const validation = issueschema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 401 });
  }
  
  try {
    const newIssue = await Issue.create({
      title: body.title,
      description: body.description,
      status: 'OPEN', // default status
    });
    
    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating issue", error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
 
  
  try {
    const issues = await Issue.find();
    return new NextResponse(JSON.stringify(issues), { status: 200 });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return new NextResponse(JSON.stringify({ message: "Error fetching issues" }), { status: 500 });
  }
}

export async function PUT(request: NextRequest) {

  
  try {
    const body = await request.json();
    const { id, status } = body;
    
    await Issue.findByIdAndUpdate(id, { status: status }, { new: true });
    return NextResponse.json({ message: "Status updated" }, { status: 201 });
  } catch (error) {
    console.error("Error updating issue:", error);
    return new NextResponse(JSON.stringify({ message: "Error updating issue" }), { status: 500 });
  }
}
