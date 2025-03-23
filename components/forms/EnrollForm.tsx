'use client'

import { EnrollFormSchema } from '@/lib/validation';
import React, { useState } from 'react';

interface EnrollmentFormData {
  fullName: string;
  country: string;
  state: string;
  mobile: string;
  email: string;
  course: string;
}

interface FormErrors {
  [key: string]: string;
}

const EnrollmentForm: React.FC = () => {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    fullName: '',
    country: '',
    state: '',
    mobile: '',
    email: '',
    course: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Handle input changes for both input and select elements
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    try {
      EnrollFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formattedErrors: FormErrors = {};
      error.errors.forEach((err: any) => {
        if (err.path && err.path.length > 0) {
          formattedErrors[err.path[0]] = err.message;
        }
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');
    
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit enrollment');
      }
      
      // Success! Clear the form
      setFormData({
        fullName: '',
        country: '',
        state: '',
        mobile: '',
        email: '',
        course: ''
      });
      
      setSubmitStatus('success');
      setStatusMessage('Enrollment successful! We will contact you shortly.');
    } catch (error: any) {
      setSubmitStatus('error');
      setStatusMessage(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          {statusMessage}
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
          {statusMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label htmlFor="fullName" className="block mb-1 font-medium">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full border rounded-lg outline-green-900 py-2 px-3 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.fullName && <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded-lg outline-green-900 py-2 px-3 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className='w-full'>
          <label htmlFor="country" className="block mb-1 font-medium">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full border rounded-lg outline-green-900 py-2 px-3 ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.country && <p className="mt-1 text-red-500 text-sm">{errors.country}</p>}
          </div>
        
          <div className='w-full'>
          <label htmlFor="state" className="block mb-1 font-medium">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`w-full border rounded-lg outline-green-900 py-2 px-3 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.state && <p className="mt-1 text-red-500 text-sm">{errors.state}</p>}
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="mobile" className="block mb-1 font-medium">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`w-full border rounded-lg outline-green-900 py-2 px-3 ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.mobile && <p className="mt-1 text-red-500 text-sm">{errors.mobile}</p>}
        </div>
        
        
        <div className="mb-4">
          <label htmlFor="course" className="block mb-1 font-medium">Course:</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className={`w-full border rounded-lg outline-green-900 py-2 px-3 ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select a course</option>
            <option value="course1">Course 1</option>
            <option value="course2">Course 2</option>
            <option value="course3">Course 3</option>
          </select>
          {errors.course && <p className="mt-1 text-red-500 text-sm">{errors.course}</p>}
        </div>
        
        <button 
          type="submit" 
          className="w-full border rounded-lg bg-[#2C5364] text-white hover:bg-[#020202] py-2 px-3 transition-colors duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Enroll'}
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;