// File: src/components/GoogleBooksViewer.tsx

import React, { useEffect, useRef } from 'react';

interface GoogleBooksViewerProps {
  bookId: string;
  onClose: () => void;
}

const GoogleBooksViewer: React.FC<GoogleBooksViewerProps> = ({ bookId, onClose }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.books && viewerRef.current) {
      const viewer = new window.google.books.DefaultViewer(viewerRef.current);
      viewer.load(bookId);
    }
  }, [bookId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-4/5 h-4/5 flex flex-col">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold">Book Viewer</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div ref={viewerRef} className="flex-grow"></div>
      </div>
    </div>
  );
};

export default GoogleBooksViewer;