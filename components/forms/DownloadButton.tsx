'use client'

import { useState } from 'react';
import { downloadCoursePDF } from '@/app/actions';

interface DownloadBrochureButtonProps {
  courseId: string;
  buttonText?: string;
  className?: string;
}

export default function DownloadBrochureButton({
  courseId,
  buttonText = 'Download Brochure',
  className
}: DownloadBrochureButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await downloadCoursePDF(courseId);
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to download brochure');
      }
      
      // Create a link element to download the PDF
      const link = document.createElement('a');
      link.href = result.data;
      link.download = result.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err) {
      console.error('Download error:', err);
      setError(err instanceof Error ? err.message : 'Failed to download brochure');
      
      // Display error for 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? 'Downloading...' : buttonText}
      </button>
      
      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}