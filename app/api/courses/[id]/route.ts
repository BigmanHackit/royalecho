import { courses } from "@/lib/courses";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const courseId = parseInt(params.id, 10);
  const course = courses.find((course) => course.id === courseId);

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}
