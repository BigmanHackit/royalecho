// app/api/pdf-documents/[id]/route.ts
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Document ID is required' },
        { status: 400 }
      );
    }
    
    console.log(`Fetching document with ID: ${id}`);
    
    // Validate ObjectId format to prevent server errors
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      console.error('Invalid ObjectId format:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid document ID format' },
        { status: 400 }
      );
    }
    
    const collection = await getCollection('pdf_files');
    
    // Fetch the document with its fileData
    const document = await collection.findOne({ _id: objectId });
    
    if (!document) {
      console.log(`Document not found with ID: ${id}`);
      return NextResponse.json(
        { success: false, message: 'Document not found' },
        { status: 404 }
      );
    }
    
    // Ensure the fileData exists and is in the correct format
    if (!document.fileData) {
      console.log(`Document found but fileData is missing for ID: ${id}`);
      return NextResponse.json(
        { success: false, message: 'Document data is missing' },
        { status: 500 }
      );
    }
    
    console.log(`Successfully retrieved document: ${document.fileName}`);
    
    return NextResponse.json({ 
      success: true, 
      document
    });
  } catch (error) {
    console.error('Error fetching PDF document:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch document',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}