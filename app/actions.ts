"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { getCollection } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { CourseFilter, EnrollmentFormData, SortOption } from "@/lib/types";

// Define schema for enrollment data validation
const enrollmentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  courseTitle: z.string().min(1, "Course selection is required"),
  comments: z.string().optional(),
});

export async function enrollStudent(formData: EnrollmentFormData) {
  try {
    // Validate the form data
    const validatedData = enrollmentSchema.parse(formData);

    // Add metadata to the enrollment record
    const enrollmentRecord = {
      ...validatedData,
      status: "pending",
      createdAt: new Date(),
      enrollmentId: generateEnrollmentId(),
    };

    // Get the enrollments collection
    const enrollmentsCollection = await getCollection("free-class");

    // Check if email is already enrolled in this course
    const existingEnrollment = await enrollmentsCollection.findOne({
      email: validatedData.email,
      courseTitle: validatedData.courseTitle,
    });

    if (existingEnrollment) {
      return {
        success: false,
        error: "You are already enrolled in this course",
      };
    }

    // Insert the new enrollment record
    const result = await enrollmentsCollection.insertOne(enrollmentRecord);

    if (result.acknowledged) {
      // Set a cookie for tracking the enrollment session
      const cookieStore = await cookies();
      await cookieStore.set("lastEnrollment", result.insertedId.toString(), {
        maxAge: 3600, // 1 hour
        path: "/",
      });

      // Revalidate the enrollments page if needed
      revalidatePath("/enrollments");

      return {
        success: true,
        enrollmentId: enrollmentRecord.enrollmentId,
      };
    } else {
      return { success: false, error: "Failed to save enrollment" };
    }
  } catch (error) {
    console.error("Enrollment error:", error);

    if (error instanceof z.ZodError) {
      // Return validation errors
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      return { success: false, error: errorMessages };
    }

    return { success: false, error: "An error occurred during enrollment" };
  }
}

// Helper function to generate a unique enrollment ID
function generateEnrollmentId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `ENR-${timestamp}-${randomStr}`.toUpperCase();
}

export async function uploadCourse(formData: FormData) {
  try {
    // Extract form fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const details = formData.get("details") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const thumbnail = formData.get("thumbnail") as File;
    const brochurePdf = formData.get("brochurePdf") as File;

    // Validate required fields
    if (!title || !category || !thumbnail || !brochurePdf) {
      return { success: false, message: "Missing required fields" };
    }

    // Validate price
    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      return { success: false, message: "Invalid price" };
    }

    // Validate thumbnail
    const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validImageTypes.includes(thumbnail.type)) {
      return {
        success: false,
        message: "Thumbnail must be JPEG, PNG, or WebP format",
      };
    }

    if (thumbnail.size > 2 * 1024 * 1024) {
      return {
        success: false,
        message: "Thumbnail size must be less than 2MB",
      };
    }

    // Validate brochure PDF
    if (brochurePdf.type !== "application/pdf") {
      return { success: false, message: "Brochure must be a PDF file" };
    }

    if (brochurePdf.size > 5 * 1024 * 1024) {
      return { success: false, message: "Brochure size must be less than 5MB" };
    }

    // Convert files to base64
    const thumbnailArrayBuffer = await thumbnail.arrayBuffer();
    const thumbnailBuffer = Buffer.from(thumbnailArrayBuffer);
    const thumbnailBase64 = thumbnailBuffer.toString("base64");

    const pdfArrayBuffer = await brochurePdf.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfArrayBuffer);
    const pdfBase64 = pdfBuffer.toString("base64");

    // Get MongoDB collection
    const collection = await getCollection("courses");

    // Insert document
    const result = await collection.insertOne({
      title,
      description,
      details,
      category,
      price: priceNumber,
      thumbnail: {
        type: thumbnail.type,
        size: thumbnail.size,
        data: `data:${thumbnail.type};base64,${thumbnailBase64}`,
      },
      brochure: {
        type: brochurePdf.type,
        size: brochurePdf.size,
        name: brochurePdf.name,
        data: `data:${brochurePdf.type};base64,${pdfBase64}`,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      success: true,
      courseTitle: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error uploading course:", error);
    return {
      success: false,
      message: "Failed to upload course",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function fetchCourseById(courseTitle: string) {
  try {
    // Validate courseTitle
    if (!courseTitle || !ObjectId.isValid(courseTitle)) {
      throw new Error("Invalid course ID");
    }

    // Get MongoDB collection
    const collection = await getCollection("courses");

    // Find the course document
    const course = await collection.findOne({ _id: new ObjectId(courseTitle) });

    if (!course) {
      throw new Error("Course not found");
    }

    // Format the course data for client-side usage
    return {
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      details: course.details,
      category: course.category,
      price: course.price,
      thumbnail: {
        type: course.thumbnail?.type,
        data: course.thumbnail?.data,
      },
      // Return brochure metadata without the actual data to keep response size smaller
      hasBrochure: !!course.brochure,
      brochureFilename: course.brochure?.name,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch course"
    );
  }
}

// You can also create a function to fetch multiple courses (for listings)
export async function fetchCourses({
  limit = 10,
  skip = 0,
  category = null,
  sortBy = "createdAt",
  sortOrder = -1,
}: {
  limit?: number;
  skip?: number;
  category?: string | null;
  sortBy?: string;
  sortOrder?: 1 | -1;
} = {}) {
  try {
    // Get MongoDB collection
    const collection = await getCollection("courses");

    // Build query filters
    const filter: CourseFilter = {};
    if (category) {
      filter.category = category;
    }

    // Get total count for pagination
    const total = await collection.countDocuments(filter);

    // Build sort options
    const sort: SortOption = {};
    sort[sortBy] = sortOrder;

    // Fetch courses
    const courses = await collection
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();

    // Format the courses for client-side usage
    const formattedCourses = courses.map((course) => ({
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price,
      thumbnail: {
        type: course.thumbnail?.type,
        data: course.thumbnail?.data,
      },
      hasBrochure: !!course.brochure,
      createdAt: course.createdAt,
    }));

    return {
      courses: formattedCourses,
      total,
      hasMore: skip + courses.length < total,
    };
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch courses"
    );
  }
}

export async function downloadCoursePDF(courseTitle: string) {
  try {
    if (!courseTitle || !ObjectId.isValid(courseTitle)) {
      return {
        success: false,
        message: "Invalid course ID",
      };
    }

    // Get MongoDB collection
    const collection = await getCollection("courses");

    // Find the course document
    const course = await collection.findOne({ _id: new ObjectId(courseTitle) });

    if (!course) {
      return {
        success: false,
        message: "Course not found",
      };
    }

    // Check if brochure exists
    if (!course.brochure || !course.brochure.data) {
      return {
        success: false,
        message: "Brochure PDF not found for this course",
      };
    }

    // Return the PDF data
    return {
      success: true,
      fileName:
        course.brochure.name ||
        `${course.title.replace(/\s+/g, "_")}_brochure.pdf`,
      contentType: course.brochure.type || "application/pdf",
      data: course.brochure.data,
      course: {
        title: course.title,
        description: course.description,
      },
    };
  } catch (error) {
    console.error("Error downloading course PDF:", error);
    return {
      success: false,
      message: "Failed to download brochure",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
