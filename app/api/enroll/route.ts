import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { EnrollFormSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate the data with Zod
    const validatedData = EnrollFormSchema.parse(body);
    
    // Get the enrollments collection
    const enrollmentsCollection = await getCollection('enrollments');
    
    if (!enrollmentsCollection) {
      return NextResponse.json(
        { message: 'Database connection failed' },
        { status: 500 }
      );
    }
    
    // Insert the enrollment data
    const enrollment = {
      ...validatedData,
      createdAt: new Date(),
      status: 'pending' // You can add additional fields as needed
    };
    
    const result = await enrollmentsCollection.insertOne(enrollment);
    
    if (!result.acknowledged) {
      throw new Error('Failed to insert enrollment');
    }
    
    return NextResponse.json(
      { 
        message: 'Enrollment successful',
        enrollmentId: result.insertedId 
      },
      { status: 201 }
    );
    
  } catch (error: any) {
    // Handle validation errors
    if (error.errors) {
      return NextResponse.json(
        { message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}