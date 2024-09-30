import React, { useState } from 'react';
import { Upload, Download, Search } from 'lucide-react';

const ResourceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resources, setResources] = useState([
    { id: 1, name: 'Math Textbook.pdf', type: 'PDF' },
    { id: 2, name: 'History Notes.docx', type: 'Document' },
    { id: 3, name: 'Science Experiment.mp4', type: 'Video' },
  ]);

  const handleUpload = (e) => {
    // Implement file upload logic here
    console.log('File uploaded:', e.target.files[0]);
  };

  const handleDownload = (resource) => {
    // Implement file download logic here
    console.log('Downloading:', resource.name);
  };

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Resource Management</h3>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 rounded-l border dark:border-gray-600 dark:bg-gray-700"
        />
        <button className="bg-primary text-white p-2 rounded-r">
          <Search size={20} />
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="fileUpload" className="cursor-pointer bg-primary text-white p-2 rounded flex items-center justify-center">
          <Upload size={20} className="mr-2" />
          Upload Resource
        </label>
        <input id="fileUpload" type="file" className="hidden" onChange={handleUpload} />
      </div>
      <ul>
        {filteredResources.map(resource => (
          <li key={resource.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
            <span>{resource.name}</span>
            <button onClick={() => handleDownload(resource)} className="text-primary">
              <Download size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceManagement;