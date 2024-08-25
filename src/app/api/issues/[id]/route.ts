import { NextRequest, NextResponse } from 'next/server';
import Issue from '../../../../../Databse/Schema';
import { dbConnect } from '../../../../../Databse/Connect';
import { redis } from '../../../../../Redis/redis';

dbConnect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const cacheKey = `issue:${params.id}`;
  
  try {
    const cachedIssue = await redis.get(cacheKey);
    
    if (typeof cachedIssue === 'string') {
      try {
        const parsedIssue = JSON.parse(cachedIssue);
        return NextResponse.json(parsedIssue, { status: 200 });
      } catch (parseError) {
        console.error('Error parsing cached issue:', parseError);
      }
    }

    const issue = await Issue.findOne({ _id: params.id });
    if (!issue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    await redis.set(cacheKey, JSON.stringify(issue));
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
    if (!updatedIssue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    await redis.del(`issue:${params.id}`);
    return NextResponse.json({ message: 'Status updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating issue:', error);
    return NextResponse.json({ message: 'Error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(params.id);
    if (!deletedIssue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    await redis.del(`issue:${params.id}`);
    return NextResponse.json({ message: 'Issue deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting issue:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
