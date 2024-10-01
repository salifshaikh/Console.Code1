// File: src/components/ResourceManagement.tsx

import React, { useState, useEffect } from 'react';
import { Upload, Download, Search, File, Trash2, Book } from 'lucide-react';
import GoogleBooksViewer from '../GoogleBooksViewer/GoogleBooksViewer';

const ResourceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([
    { id: 1, name: 'Math Textbook.pdf', type: 'PDF', url: 'https://red-lynsey-45.tiiny.site/' },
    { id: 2, name: 'History Notes.docx', type: 'Document', url: 'https://example.com/history-notes.docx' },
    { id: 3, name: 'Science Experiment.mp4', type: 'Video', url: 'https://example.com/science-experiment.mp4' },
  ]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookViewer, setShowBookViewer] = useState(false);

  useEffect(() => {
    // Load Google Books API
    const script = document.createElement('script');
    script.src = 'https://www.google.com/books/jsapi.js';
    script.async = true;
    script.onload = () => {
      if (window.google && window.google.books) {
        window.google.books.load();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading file:', file.name);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newResource = {
        id: resources.length + 1,
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        url: URL.createObjectURL(file)
      };

      setResources([...resources, newResource]);
      console.log('File uploaded successfully:', newResource);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDownload = async (resource) => {
    try {
      console.log('Downloading:', resource.name);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch(resource.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = resource.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        setSelectedBook({
          id: data.items[0].id,
          name: book.title,
          type: 'Book',
          url: book.previewLink
        });
        setShowBookViewer(true);
      } else {
        console.log('No books found');
      }
    } catch (error) {
      console.error('Error searching for books:', error);
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Resource Management</h2>
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search resources or books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 rounded-l-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          <Search size={20} />
        </button>
      </div>
      <div className="mb-6">
        <label htmlFor="fileUpload" className="cursor-pointer bg-green-500 text-white p-3 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
          <Upload size={20} className="mr-2" />
          Upload Resource
        </label>
        <input id="fileUpload" type="file" className="hidden" onChange={handleUpload} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map(resource => (
              <tr key={resource.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-3 flex items-center">
                  {resource.type === 'Book' ? (
                    <Book size={20} className="mr-2 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <File size={20} className="mr-2 text-gray-500 dark:text-gray-400" />
                  )}
                  {resource.name}
                </td>
                <td className="p-3">{resource.type}</td>
                <td className="p-3">
                  {resource.type === 'Book' ? (
                    <button 
                      onClick={() => {
                        setSelectedBook(resource);
                        setShowBookViewer(true);
                      }} 
                      className="text-blue-500 hover:text-blue-600 transition-colors mr-2"
                      title="View Book"
                    >
                      <Book size={20} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleDownload(resource)} 
                      className="text-blue-500 hover:text-blue-600 transition-colors mr-2"
                      title="Download"
                    >
                      <Download size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showBookViewer && selectedBook && (
        <GoogleBooksViewer
          bookId={selectedBook.id}
          onClose={() => setShowBookViewer(false)}
        />
      )}
    </div>
  );
};

export default ResourceManagement;