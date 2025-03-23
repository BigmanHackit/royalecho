import { getCollection } from '@/lib/mongodb'; // Assuming this is how you connect to MongoDB

export async function GET() {
  try {
    const collection = await getCollection('courses');
    const courses = await collection.find({}).toArray();
    
    return new Response(JSON.stringify(courses), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch courses' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}