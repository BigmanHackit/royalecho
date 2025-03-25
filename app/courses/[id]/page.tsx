"use client";

import { useEffect, useState } from "react";
import { fetchCourseById } from "@/app/actions";
import EnrollmentButton from "@/components/EnrollmentButton";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { BookAudio, CalendarCheck, CircleSlash, Clock10, Video } from "lucide-react";
import Image from "next/image";
import React from "react";
import DownloadBrochureButton from "@/components/forms/DownloadButton";
import { EmblaCarousel } from "@/components/shared/Carousel";

interface Course {
  id: string; // Changed from _id to id
  title: string;
  description: string;
  details: string;
  category: string;
  price: number;
  duration?: string;
  hoursPerWeek?: number;
  thumbnail?: {
    type: string;
    data: string; // Removed size which isn't in the returned data
  };
  hasBrochure?: boolean; // Added this field from the returned data
  brochureFilename?: string; // Added this field from the returned data
  createdAt: string;
  updatedAt: string;
}

export default function CourseDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const courseData = await fetchCourseById(id);
        setCourse(courseData);
      } catch (err) {
        setError("Failed to load course details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading course details...</div>;
  }

  if (error || !course) {
    return (
      <div className="text-center p-8 text-red-600">
        {error || "Course not found"}
      </div>
    );
  }

  // Default course duration based on category
  const isDesignCourse = course.category === "Design";
  const courseDuration = isDesignCourse ? "8 weeks" : "12 weeks";

  return (
    <div className="min-h-screen">
      <MaxWidthWrapper className="mt-8">
        {/* Main course info section */}
        <div className="flex flex-col-reverse lg:flex-row items-start gap-6 lg:justify-between">
          {/* Course details column */}
          <div className="w-full lg:w-[65%] flex flex-col lg:flex-shrink-0">
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-6 text-gray-900 break-words">
              {course.description}
            </p>
            <div className="mt-4">
              <p className="text-gray-700 whitespace-pre-line break-words">
                {course.details}
              </p>
            </div>
            <h2 className="mt-6 text-[#00920a] font-extrabold text-[2.5rem]">
              <span>₦</span> {course.price.toFixed(2)}
            </h2>
            <div className="flex flex-col items-center gap-3 my-6 lg:flex-row">
              <EnrollmentButton className="w-full bg-gradient-to-l from-[#0F2027] via-[#203A43] to-[#2C5364] hover:bg-gradient-to-r hover:from-green-600 hover:via-green-800 hover:to-green-950 rounded-lg text-white" />
              <DownloadBrochureButton
                courseId={id}
                buttonText="Download Brochure"
                className="w-full bg-transparent border-black text-center text-gray-900 hover:bg-black border-2 hover:text-gray-100 px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Thumbnail column */}
          <div className="w-full lg:w-[30%] mb-6 lg:mb-0 lg:flex-shrink-0 sticky lg:top-8">
            {course.thumbnail && course.thumbnail.data ? (
              <Image
                src={course.thumbnail.data}
                alt={course.title}
                width={400}
                height={400}
                className="object-cover w-full h-[400px] rounded-lg bg-gradient-to-tl from-[#0f2027ae] via-[#203a43a8] to-[#2c5364b6] p-6"
                priority
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">No thumbnail available</p>
              </div>
            )}
          </div>
        </div>

        {/* Course details section */}
        <div className="mt-8 lg:w-[65%]">
          <h3 className="text-xl font-semibold mb-4">Course Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3">
              <CalendarCheck className="flex-shrink-0" />
              <p>{courseDuration}</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock10 className="flex-shrink-0" />
              <p>4 hours per week</p>
            </div>
            <div className="flex items-center gap-3">
              <Video className="flex-shrink-0" />
              <p>Live Online</p>
            </div>
            <div className="flex items-center gap-3">
              <BookAudio className="flex-shrink-0" />
              <p>Recording of classes</p>
            </div>
            <div className="flex items-center gap-3">
              <CircleSlash className="flex-shrink-0" />
              <p>Free Video Resources</p>
            </div>
          </div>
        </div>

        {/* Curriculum section */}
        <div className="flex flex-col-reverse md:flex-row justify-between gap-8 w-full lg:w-[90%] bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] mx-auto my-20 rounded-lg shadow text-gray-200 p-8">
          <div className="w-full md:w-[45%]">
            <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
            <p className="mb-4">
              A structured learning path designed to give you the skills you
              need to succeed.
            </p>
            <p>
              Download the brochure for a detailed breakdown of the curriculum
              and learning objectives.
            </p>
            <div className="mt-8">
              <DownloadBrochureButton
                courseId={id}
                buttonText="Download Brochure"
                className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md font-medium"
              />
            </div>
          </div>

          <div className="w-full md:w-[50%]">
            <EmblaCarousel className="h-[300px]">
              <div className="embla__slide flex items-center justify-center rounded-lg bg-gradient-to-br from-[#141E30] to-[#243B55]">
                <h1 className="font-extrabold text-5xl">
                  <span className="text-red-">LEARN</span>
                </h1>
              </div>
              <div className="embla__slide flex items-center justify-center rounded-lg bg-gradient-to-br from-[#000428] to-[#004e92]">
                <h1 className="font-extrabold text-5xl">
                  <span className="text-yellow-">PRACTICE</span>
                </h1>
              </div>
              <div className="embla__slide flex items-center justify-center rounded-lg bg-gradient-to-br from-[#2C3E50] to-[#4CA1AF]">
                <h1 className="font-extrabold text-5xl">
                  <span className="text-green-">EARN</span>
                </h1>
              </div>
              <div className="embla__slide flex items-center justify-center rounded-lg bg-gradient-to-br from-[#cb2d3e] to-[#ef473a]">
                <h1 className="font-extrabold text-5xl">
                  <span className="text-blue-">PERFECT</span>
                </h1>
              </div>
            </EmblaCarousel>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
