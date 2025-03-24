"use client";

import { enrollStudent } from "@/app/actions";
import { useState } from "react";

export default function FreeClassForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courseTitle: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const result = await enrollStudent(formData);
      if (result.success) {
        setMessage("Enrollment successful! We'll contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          courseTitle: "",
          comments: "",
        });
      } else {
        setError(result.error || "Enrollment failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Class Enrollment</h2>
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`w-full border rounded-lg outline-green-900 py-2 px-3`}
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`w-full border rounded-lg outline-green-900 py-2 px-3`}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full border rounded-lg outline-green-900 py-2 px-3`}
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full border rounded-lg outline-green-900 py-2 px-3`}
          />
        </div>
        
        <div>
          <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
            Course *
          </label>
          <select
            id="courseTitle"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            required
            className={`w-full border rounded-lg outline-green-900 py-2 px-3`}
          >
            <option value="">Select a course</option>
            <option value="Web Development Fundamentals">Web Development Fundamentals</option>
            <option value="Advanced JavaScript">Advanced JavaScript</option>
            <option value="React & Next.js Masterclass">React & Next.js Masterclass</option>
            <option value="Backend Development with Node.js">Backend Development with Node.js</option>
            <option value="Full Stack Development">Full Stack Development</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
            Additional Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows={3}
            className={`w-full border rounded-lg outline-green-900 py-2 px-3`}
          />
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Enroll Now"}
          </button>
        </div>
      </form>
    </div>
  );
}