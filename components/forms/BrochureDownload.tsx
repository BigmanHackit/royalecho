'use client'

import { useState, useEffect } from 'react';

type PDFDocument = {
  _id: string;
  fileName: string;
  description: string;
  fileSize: number;
  uploadDate: string;
  fileData?: string; // Base64 data
};

export default function PDFDownloader() {
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<PDFDocument | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      
      const response = await fetch('/api/pdf/get-pdf');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch documents');
      }
      
      setDocuments(data.documents || []);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (docId: string) => {
    try {
      setError(null); // Clear previous errors
      
      // Debug log
      console.log('Downloading document with ID:', docId);
      
      const response = await fetch(`/api/pdf/get-pdf/${docId}`);
      
      // Debug logs
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        let errorMessage = 'Failed to fetch document';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If parsing fails, use the raw text
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      // Debug log
      console.log('Response data received, success:', data.success);
      
      if (!data.success) {
        throw new Error(data.message || 'Document retrieval failed');
      }
      
      if (!data.document || !data.document.fileData) {
        throw new Error('Document data not found');
      }
      
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = data.document.fileData; // This should be the base64 data URL
      link.download = `${data.document.fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading document:', err);
      setError(err instanceof Error ? err.message : 'Failed to download document');
    }
  };

  const handlePreview = async (docId: string) => {
    try {
      setError(null); // Clear previous errors
      const response = await fetch(`/api/pdf/get-pdf/${docId}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Failed to fetch document';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If parsing fails, use the raw text
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
      
      setSelectedDoc(data.document);
      setShowPreview(true);
    } catch (err) {
      console.error('Error previewing document:', err);
      setError(err instanceof Error ? err.message : 'Failed to preview document');
    }
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">PDF Documents</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading documents...</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No documents found</p>
          <button 
            onClick={fetchDocuments}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-4 border-b text-left">File Name</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Size</th>
                <th className="py-2 px-4 border-b text-left">Upload Date</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{doc.fileName}</td>
                  <td className="py-2 px-4 border-b">{doc.description}</td>
                  <td className="py-2 px-4 border-b">{formatFileSize(doc.fileSize)}</td>
                  <td className="py-2 px-4 border-b">{formatDate(doc.uploadDate)}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePreview(doc._id)}
                        className="bg-blue-100 text-blue-700 py-1 px-3 rounded-md hover:bg-blue-200 transition-colors text-sm"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => handleDownload(doc._id)}
                        className="bg-green-100 text-green-700 py-1 px-3 rounded-md hover:bg-green-200 transition-colors text-sm"
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* PDF Preview Modal */}
      {showPreview && selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedDoc.fileName}</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <iframe
                src={selectedDoc.fileData}
                className="w-full h-full min-h-[500px] border-0"
                title={selectedDoc.fileName}
              ></iframe>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => handleDownload(selectedDoc._id)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}