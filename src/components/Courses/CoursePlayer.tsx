import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  lessons: Lesson[];
}

interface CoursePlayerProps {
  course: Course;
  onClose: () => void;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, onClose }) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(course.lessons[0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
    >
      <div className="w-full max-w-6xl h-[80vh] rounded-lg bg-white p-6 dark:bg-[#2C303B] overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{course.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col lg:flex-row h-full">
          <div className="mb-4 lg:mb-0 lg:w-3/4 lg:pr-4 h-full">
            <div className="relative h-full">
              <iframe
                src={currentLesson.videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-lg"
              ></iframe>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{currentLesson.title}</h3>
          </div>
          <div className="lg:w-1/4 h-full overflow-y-auto">
            <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">Lessons</h4>
            <ul className="max-h-full overflow-y-auto">
              {course.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className={`mb-2 cursor-pointer rounded-lg p-2 ${
                    currentLesson.id === lesson.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setCurrentLesson(lesson)}
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoursePlayer;
