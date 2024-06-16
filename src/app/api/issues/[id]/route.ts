import { NextRequest, NextResponse } from 'next/server';
import Issue from '../../../../../Databse/Schema'; // Adjust the path as per your project structure
import dbConnect from '../../../../../Databse/Connect';

dbConnect(); // Ensure MongoDB connection is established

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const issue = await Issue.findOne({ _id: params.id });

    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    return NextResponse.json(issue, { status: 200 });
  } catch (error) {
    console.error('Error fetching issue:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status } = body;

    const updatedIssue = await Issue.findByIdAndUpdate(
      params.id,
      { status: status },
      { new: true }
    );

    if (!updatedIssue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Status updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating issue:', error);
    return NextResponse.json({ message: 'Error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(params.id);

    if (!deletedIssue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Issue deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting issue:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
