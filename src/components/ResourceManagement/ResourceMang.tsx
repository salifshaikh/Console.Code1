import React, { useState } from 'react';
import { Upload, Download, Search, File } from 'lucide-react';

const ResourceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([
    { id: 1, name: 'Math Textbook.pdf', type: 'PDF', url: 'https://red-lynsey-45.tiiny.site/' },
    { id: 2, name: 'History Notes.docx', type: 'Document', url: 'https://example.com/history-notes.docx' },
    { id: 3, name: 'Science Experiment.mp4', type: 'Video', url: 'https://example.com/science-experiment.mp4' },
  ]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a new FormData object
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulating an API call
      // In a real scenario, you would send this formData to your backend
      console.log('Uploading file:', file.name);
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add the new resource to the list
      const newResource = {
        id: resources.length + 1,
        name: file.name,
        type: file.type.split('/')[1].toUpperCase(),
        url: URL.createObjectURL(file) // This creates a temporary URL for the file
      };

      setResources([...resources, newResource]);
      console.log('File uploaded successfully:', newResource);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDownload = async (resource) => {
    try {
      // In a real scenario, you would make an API call to get the file
      console.log('Downloading:', resource.name);

      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demonstration, we'll use the URL we created or the example URL
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

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-3xl mx-auto mt-10">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Resource Management</h3>
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 rounded-l-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors">
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
      <ul className="space-y-4">
        {filteredResources.map(resource => (
          <li key={resource.id} className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <File size={24} className="mr-3 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-800 dark:text-white">{resource.name}</span>
            </div>
            <button 
              onClick={() => handleDownload(resource)} 
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Download size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceManagement;