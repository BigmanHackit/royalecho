"use client";

import { useState, useEffect } from "react";
import useTabStore from "@/stores/tabStore";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Tabs from "@/components/Tabs";
import { cn } from "@/lib/utils";

export default function Courses() {
  const { activeTab } = useTabStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]); // Start as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("http://localhost:3000/api/courses");
        const data = await res.json();

        // Log the data to verify the structure
        console.log("API Response:", data);

        // Check if data is an array directly
        if (Array.isArray(data)) {
          setCourses(data);
          setCategories([
            'All',
            ...new Set(data.map((course) => course.category)),
          ]);
        } else {
          console.error("Invalid API response:", data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const filteredCourses =
    activeTab === "All"
      ? courses
      : courses.filter((course) => course.category === activeTab);

  if (loading) {
    return <p className="text-center text-gray-500">Loading courses...</p>;
  }

  return (
    <div className="p-4 mb-32">
      {categories && categories.length > 0 && <Tabs categories={categories} />}{" "}
      {/* Check if categories exists and has items */}
      <h2 className="text-xl font-extrabold my-3 motion-preset-slide-up-lg text-gray-100">
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
            <div key={course.id} className="flex flex-col gap-4 items-center rounded-lg hover:bg-gray-100 transition-all border">
              <Image
                width={100}
                height={100}
                src={course.image}
                alt={course.name}
                className="object-cover w-full h-60"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold">{course.name}</h3>
                <p className="text-gray-500 text-sm mt-3">{course.description}</p>
                <Link href={`/${course.id}`} className={cn(buttonVariants({ variant: 'default' }), 'mt-3 w-full')}>Learn more</Link>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
