import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function GET() {
  try {
    const collection = await getCollection('pdf_files');
    
    // Fetch documents without the fileData field to reduce payload size
    const documents = await collection
      .find({})
      .project({ fileData: 0 }) // Exclude fileData
      .sort({ uploadDate: -1 }) // Most recent first
      .toArray();
    
    return NextResponse.json({ 
      success: true, 
      documents 
    });
  } catch (error) {
    console.error('Error fetching PDF documents:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch documents',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
