import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';

const UploadResume = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // grab token from storage (or context) before sending request
  const token = localStorage.getItem('token');

  const handleFiles = useCallback((files) => {
    if (files && files[0]) {
      const selected = files[0];
      if (selected.type !== 'application/pdf') {
        toast.error('Only PDF files are supported');
        return;
      }
      setFile(selected);
    }
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const inputRef = React.useRef(null);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const upload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    if (!token) {
      toast.error('You must be logged in to upload');
      return;
    }

    // debug token presence
    // console.log('upload token', token);

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const res = await API.post('/resume/uploadresume', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Resume uploaded successfully');
      setLoading(false);
      // redirect to analysis or whatever the next page is
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      console.error('upload error', err);
      toast.error(err?.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload Resume</h1>
        <p className="text-white/80">
          Upload your resume to get AI-powered analysis and suggestions
        </p>
      </div>
      <div className="bg-white rounded-xl shadow p-6">

      <div
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3 3m3-3l3 3M8 6h8m-8 0a2 2 0 012-2h4a2 2 0 012 2m-8 0h8"
            />
          </svg>
          <p className="text-gray-600">
            Drag & drop your resume here
            <br />
            or{' '}
            <button
              type="button"
              onClick={() => inputRef.current && inputRef.current.click()}
              className="text-blue-600 underline"
            >
              click to browse
            </button>
          </p>
          <button
            type="button"
            onClick={() => inputRef.current && inputRef.current.click()}
            className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            Upload PDF
          </button>
          <p className="text-xs text-gray-400">Supported format: PDF</p>
          {file && <p className="text-sm mt-2">Selected: {file.name}</p>}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        {file && (
          <div className="mb-4 text-sm text-gray-700">
            Selected file: <span className="font-medium">{file.name}</span>
          </div>
        )}
        <button
          onClick={upload}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </div>
      </div>
      </div>
    // </div>
  );
};

export default UploadResume;