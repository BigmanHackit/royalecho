import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { BookAudio, CalendarCheck, Clock10, Video } from "lucide-react";
import Image from "next/image";
import React from "react";

// interface PageProps {
//   params: { id: string };
// }

async function getCourseById(courseId: string) {
  const res = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
}

export default async function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  try {
    const course = await getCourseById(params.id);

    if (!course) {
      return (
        <div>
          <h1>Agent Not Found</h1>
          <p>The requested course does not exist.</p>
        </div>
      );
    }

    return (
      <div className="">
        <MaxWidthWrapper className="mt-8">
          <div className="flex items-center gap-6">
            <div className="flex flex-col lg:w-[65%]">
              <h1 className="text-3xl font-bold">{course.name}</h1>
              <p className="mt-6 text-gray-900">{course.details}</p>
              <h2 className="mt-6 text-[#00920a] font-extrabold text-[2.5rem]">
                <span>₦</span> {course.price}
              </h2>
              <div className="flex flex-col items-center gap-3 my-6 lg:flex-row">
                <Button className="w-full bg-gradient-to-l from-[#0F2027] via-[#203A43] to-[#2C5364] hover:bg-[#2C5364]">
                  Enroll Now
                </Button>
                <Button className="w-full bg-transparent border border-black text-gray-900 hover:text-gray-100">
                  Download Brochure
                </Button>
              </div>
            </div>

            <div className="h-full w-[30%] hidden lg:block">
              <Image
                src={course.image}
                alt={course.name}
                width={100}
                height={100}
                className="object-cover w-full h-[400px] rounded-lg"
              />
            </div>
          </div>
          <div>
            {course.category === "Design" ? (
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <CalendarCheck />
                  <p>8 weeks</p>
                </div>
                <div className="flex gap-3">
                  <Clock10 />
                  <p>4 hours per weeks</p>
                </div>
                <div className="flex gap-3">
                  <Video />
                  <p>Live Online</p>
                </div>
                <div className="flex gap-3">
                  <BookAudio />
                  <p>Recording of classes</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <CalendarCheck />
                    <p>12 weeks</p>
                  </div>
                  <div className="flex gap-3">
                    <Clock10 />
                    <p>4 hours per weeks</p>
                  </div>
                  <div className="flex gap-3">
                    <Video />
                    <p>Live Online</p>
                  </div>
                  <div className="flex gap-3">
                    <BookAudio />
                    <p>Recording of classes</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="w-[90%] h-[400px] bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] mx-auto my-20 rounded-lg shadow text-gray-200 space-y-4">

          </div>
        </MaxWidthWrapper>
      </div>
    );
  } catch (error) {
    console.error("Error fetching course:", error);
    return <div>Error fetching course</div>;
  }
};