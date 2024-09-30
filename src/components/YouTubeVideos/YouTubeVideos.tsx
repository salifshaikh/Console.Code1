import React from 'react';

const YouTubeVideos = () => {
  const videos = [
    { id: 'i2m7dY47EB8', title: 'Educational Video 1' },
    { id: 'QMnEP2DYfmI', title: 'Educational Video 2' },
    { id: 'z97_vajw-Do', title: 'Educational Video 3' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Featured Videos</h2>
      <div className="space-y-6">
        {videos.map((video) => (
          <div key={video.id} className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideos;