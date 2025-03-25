'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { uploadCourse } from '@/app/actions';
import Image from 'next/image';

// Define course categories
const COURSE_CATEGORIES = [
  'Programming',
  'Design',
  'Web Development',
  'Finance',
  'Marketing',
  'Data Science',
];

export default function CourseUploadForm() {
  // Course basic details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  
  // Files
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [brochurePdf, setBrochurePdf] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle thumbnail selection
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validImageTypes.includes(selectedFile.type)) {
        setError('Thumbnail must be JPEG, PNG, or WebP format');
        return;
      }
      
      // Validate file size (2MB max)
      if (selectedFile.size > 2 * 1024 * 1024) {
        setError('Thumbnail size must be less than 2MB');
        return;
      }
      
      setThumbnail(selectedFile);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Handle PDF brochure selection
  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (selectedFile.type !== 'application/pdf') {
        setError('Brochure must be a PDF file');
        return;
      }
      
      // Validate file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Brochure size must be less than 5MB');
        return;
      }
      
      setBrochurePdf(selectedFile);
      setError(null);
    }
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title.trim()) {
      setError('Please enter a course title');
      return;
    }
    
    if (!category) {
      setError('Please select a category');
      return;
    }
    
    if (!price.trim() || isNaN(Number(price)) || Number(price) < 0) {
      setError('Please enter a valid price');
      return;
    }
    
    if (!thumbnail) {
      setError('Please upload a course thumbnail');
      return;
    }
    
    if (!brochurePdf) {
      setError('Please upload a course brochure PDF');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('details', details);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('thumbnail', thumbnail);
      formData.append('brochurePdf', brochurePdf);
      
      const result = await uploadCourse(formData);
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to upload course');
      }
      
      // Reset form on success
      setTitle('');
      setDescription('');
      setDetails('');
      setCategory('');
      setPrice('');
      setThumbnail(null);
      setBrochurePdf(null);
      setThumbnailPreview('');
      setSuccess(true);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload course');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Upload New Course</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          Course uploaded successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Course Title <span className='text-red-500'>*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter a descriptive title for your course"
            required
          />
        </div>
        
        {/* Course Thumbnail */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium mb-1">
            Course Thumbnail <span className='text-red-500'>*</span>
          </label>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <input
                type="file"
                id="thumbnail"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleThumbnailChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Recommended size: 1280x720px. Max 2MB. JPG, PNG or WebP.
              </p>
            </div>
            {thumbnailPreview && (
              <div className="flex-shrink-0">
                <Image 
                  src={thumbnailPreview} 
                  alt="Thumbnail preview" 
                  width={50}
                  height={50}
                  className="h-24 w-auto object-cover rounded border border-gray-300" 
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Short Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Short Description <span className='text-red-500'>*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={2}
            placeholder="A brief summary of your course (1-2 sentences)"
            required
          />
        </div>
        
        {/* Detailed Description */}
        <div>
          <label htmlFor="details" className="block text-sm font-medium mb-1">
            Course Details <span className='text-red-500'>*</span>
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={5}
            placeholder="Detailed information about what students will learn, course structure, prerequisites, etc."
            required
          />
        </div>
        
        {/* Course Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category <span className='text-red-500'>*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a category</option>
            {COURSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price (NGN) <span className='text-red-500'>*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₦</span>
            </div>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full pl-7 p-3 border border-gray-300 rounded-md"
              placeholder="e.g. 150000"
              min="0"
              step="0.01"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Enter 0 for free courses
          </p>
        </div>
        
        {/* PDF Brochure */}
        <div>
          <label htmlFor="brochurePdf" className="block text-sm font-medium mb-1">
            Brochure PDF <span className='text-red-500'>*</span>
          </label>
          <input
            type="file"
            id="brochurePdf"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          {brochurePdf && (
            <p className="mt-1 text-xs text-gray-500">
              {brochurePdf.name} ({(brochurePdf.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Upload a detailed brochure (syllabus, instructor info, etc.). Max 5MB.
          </p>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 font-medium"
        >
          {isSubmitting ? 'Uploading...' : 'Upload Course'}
        </button>
      </form>
    </div>
  );
}