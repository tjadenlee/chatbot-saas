"use client";

import React, { useState } from 'react';
import { Upload, FileText, Globe, Type, CheckCircle, AlertCircle } from 'lucide-react';

export default function DocumentUpload({ onUploadComplete }) {
  const [activeTab, setActiveTab] = useState('file');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [textContent, setTextContent] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadResult({
          success: true,
          message: result.message,
          wordCount: result.wordCount,
          preview: result.preview
        });
        onUploadComplete?.(result);
      } else {
        setUploadResult({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: 'Upload failed. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleWebsiteUpload = async () => {
    if (!websiteUrl) return;

    setIsUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('websiteUrl', websiteUrl);

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadResult({
          success: true,
          message: result.message,
          wordCount: result.wordCount,
          preview: result.preview
        });
        onUploadComplete?.(result);
      } else {
        setUploadResult({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: 'Failed to process website. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleTextUpload = async () => {
    if (!textContent.trim()) return;

    setIsUploading(true);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('textContent', textContent);

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadResult({
          success: true,
          message: result.message,
          wordCount: result.wordCount,
          preview: result.preview
        });
        onUploadComplete?.(result);
      } else {
        setUploadResult({
          success: false,
          message: result.error
        });
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: 'Failed to process text. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-2">Train Your AI Chatbot</h2>
        <p className="text-purple-100">Upload documents, websites, or text to make your chatbot an expert on your business</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('file')}
          className={`flex-1 py-4 px-6 text-center font-medium ${
            activeTab === 'file' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FileText size={20} className="inline mr-2" />
          Upload File
        </button>
        <button
          onClick={() => setActiveTab('website')}
          className={`flex-1 py-4 px-6 text-center font-medium ${
            activeTab === 'website' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Globe size={20} className="inline mr-2" />
          Website URL
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-4 px-6 text-center font-medium ${
            activeTab === 'text' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Type size={20} className="inline mr-2" />
          Direct Text
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'file' && (
          <div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
              <p className="text-gray-500 mb-4">PDF files and text documents supported</p>
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploading ? 'Processing...' : 'Choose File'}
              </label>
            </div>
          </div>
        )}

        {activeTab === 'website' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Import from Website</h3>
            <div className="space-y-4">
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleWebsiteUpload}
                disabled={isUploading || !websiteUrl}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? 'Processing Website...' : 'Import Content'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'text' && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Paste Text Content</h3>
            <div className="space-y-4">
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste your business information, FAQ, product details, etc..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={handleTextUpload}
                disabled={isUploading || !textContent.trim()}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? 'Processing Text...' : 'Train Chatbot'}
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {uploadResult && (
          <div className={`mt-6 p-4 rounded-lg ${
            uploadResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start">
              {uploadResult.success ? (
                <CheckCircle size={20} className="text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              ) : (
                <AlertCircle size={20} className="text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              )}
              <div>
                <p className={`font-medium ${uploadResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {uploadResult.message}
                </p>
                {uploadResult.success && (
                  <>
                    <p className="text-green-700 text-sm mt-1">
                      Processed {uploadResult.wordCount} words
                    </p>
                    <p className="text-green-600 text-sm mt-2 font-mono bg-green-100 p-2 rounded">
                      {uploadResult.preview}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}