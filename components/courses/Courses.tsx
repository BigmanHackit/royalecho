"use client";

import { useState, useEffect } from "react";
import useTabStore from "@/stores/tabStore";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Tabs from "@/components/Tabs";

interface Course {
  _id: string;
  title: string;
  description: string;
  details: string;
  category: string;
  price: number;
  thumbnail: {
    type: string;
    size: number;
    data: string;
  };
  brochure: {
    type: string;
    size: number;
    name: string;
    data: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Courses() {
  const { activeTab } = useTabStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
  
        // Type guard function to check if an object matches the Course interface
        const isCourse = (obj: unknown): obj is Course => {
          return (
            obj !== null &&
            typeof obj === "object" &&
            obj.hasOwnProperty("category") &&
            typeof (obj as Record<string, unknown>).category === "string" &&
            obj.hasOwnProperty("_id") &&
            typeof (obj as Record<string, unknown>)._id === "string"
          );
        };
  
        // Handle different response formats
        if (Array.isArray(data) && data.every(isCourse)) {
          setCourses(data);
          // Explicitly cast the return value to string[] to solve the type issue
          const courseCategories: string[] = data.map((course: Course) => course.category);
          setCategories(["All", ...new Set(courseCategories)]);
        } else if (
          data !== null &&
          typeof data === "object" &&
          "courses" in data &&
          Array.isArray(data.courses) &&
          data.courses.every(isCourse)
        ) {
          setCourses(data.courses);
          // Explicitly cast the return value to string[] to solve the type issue
          const courseCategories: string[] = data.courses.map((course: Course) => course.category);
          setCategories(["All", ...new Set(courseCategories)]);
        } else {
          console.error("Invalid API response:", data);
        }
      } catch (error) {
        console.log("Error fetching courses", error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, []);

  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  // Helper function to handle thumbnail display
  const getThumbnailSrc = (thumbnail: Course["thumbnail"] | undefined) => {
    if (!thumbnail?.data) return "/img-placeholder.png";

    // Check if data is already a URL
    if (thumbnail.data.startsWith("http") || thumbnail.data.startsWith("/")) {
      return thumbnail.data;
    }

    // If it's likely a Base64 string, ensure it has the proper prefix
    if (!thumbnail.data.startsWith("data:")) {
      return `data:${thumbnail.type || "image/jpeg"};base64,${thumbnail.data}`;
    }

    return thumbnail.data;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="p-4 mb-32">
      <hr className="mb-3 border-[#2C5364]" />
      {categories && categories.length > 0 && <Tabs categories={categories} />}
      <hr className="mb-3 border-[#2C5364]" />
      <h2 className="text-xl font-extrabold my-3 motion-preset-slide-up-lg">
        {activeTab === "All" ? "All Courses" : `${activeTab} Courses`}
      </h2>

      {filteredCourses.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500">No courses found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative aspect-video w-full">
                <Image
                  fill
                  src={getThumbnailSrc(course.thumbnail)}
                  alt={course.title}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 flex-1">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-medium text-gray-900">
                    {course.price > 0 ? `₦${course.price.toFixed(2)}` : "Free"}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {course.category}
                  </span>
                </div>

                <Link href={`/courses/${course._id}`} className="w-full mt-4">
                  <Button variant="default" className="w-full">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
