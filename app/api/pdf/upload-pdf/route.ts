// app/api/upload-pdf/route.ts
import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const body = await request.json();
    const { fileName, description, fileData, fileType, fileSize } = body;
    
    // Basic validation
    if (!fileName || !fileData) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    if (fileType !== 'application/pdf') {
      return NextResponse.json({ message: 'Only PDF files are allowed' }, { status: 400 });
    }
    
    if (fileSize > 5 * 1024 * 1024) {
      return NextResponse.json({ message: 'File size must be less than 5MB' }, { status: 400 });
    }
    
    // Get MongoDB collection
    const collection = await getCollection('pdf_files');
    
    // Insert document
    const result = await collection.insertOne({
      fileName,
      description: description || '',
      fileType,
      fileSize,
      uploadDate: new Date(),
      fileData
    });
    
    return NextResponse.json({
      success: true,
      fileId: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    return NextResponse.json({ 
      message: 'Failed to upload file',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}