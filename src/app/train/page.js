"use client";

import DocumentUpload from '../../components/DocumentUpload';

export default function TrainPage() {
  const handleUploadComplete = (result) => {
    console.log('Upload completed:', result);
    // You can add more logic here later, like showing a success message
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Train Your AI Chatbot
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your business documents, website content, or knowledge base to create a chatbot that's an expert on your specific business
          </p>
        </div>
        
        <DocumentUpload 
          onUploadComplete={handleUploadComplete}
        />
        
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">PDF Documents</h3>
              <p className="text-gray-600">Upload product catalogs, manuals, and documentation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Website Content</h3>
              <p className="text-gray-600">Import your entire website's content automatically</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Custom Text</h3>
              <p className="text-gray-600">Add FAQs, policies, and specific business information</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}