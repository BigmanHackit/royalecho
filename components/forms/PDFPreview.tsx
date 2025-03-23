'use client'

import { useState } from 'react';
import PDFDownloadButton from './PDFDownloadButton';

interface PDFPreviewProps {
  documentId: string;
  initialFileName?: string;
  showPreviewButton?: boolean;
  previewButtonText?: string;
  previewButtonClass?: string;
}

type PDFDocument = {
  _id: string;
  fileName: string;
  description?: string;
  fileData: string;
};

export default function PDFPreview({
  documentId,
  initialFileName = '',
  showPreviewButton = true,
  previewButtonText = 'Preview',
  previewButtonClass = "bg-blue-100 text-blue-700 py-1 px-3 rounded-md hover:bg-blue-200 transition-colors text-sm"
}: PDFPreviewProps) {
  const [document, setDocument] = useState<PDFDocument | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePreview = async () => {
    if (showPreview && document) {
      // If preview is already showing, just close it
      setShowPreview(false);
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/pdf-documents/${documentId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch document';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Document retrieval failed');
      }
      
      if (!data.document || !data.document.fileData) {
        throw new Error('Document data not found');
      }
      
      setDocument(data.document);
      setShowPreview(true);
    } catch (err) {
      console.error('Error previewing document:', err);
      setError(err instanceof Error ? err.message : 'Failed to preview document');
      alert(`Preview failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine the file name to use (from state or props)
  const fileName = document?.fileName || initialFileName;

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {showPreviewButton && (
        <button
          onClick={handlePreview}
          disabled={isLoading}
          className={previewButtonClass}
        >
          {isLoading ? "Loading..." : showPreview ? "Close Preview" : previewButtonText}
        </button>
      )}
      
      {/* PDF Preview Modal */}
      {showPreview && document && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{document.fileName}</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <iframe
                src={document.fileData}
                className="w-full h-full min-h-[500px] border-0"
                title={document.fileName}
              ></iframe>
            </div>
            <div className="p-4 border-t flex justify-end">
              <PDFDownloadButton
                documentId={documentId}
                fileName={document.fileName}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}