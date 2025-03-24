import { courses } from "@/lib/courses";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const reslvedParams = await params
  const courseId = parseInt(reslvedParams.id, 10);

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");

  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    return NextResponse.json({ error: "Course not found", filter }, { status: 404 });
  }

  return NextResponse.json({ ...course, filter });
}
