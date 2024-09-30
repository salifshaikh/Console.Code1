"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the Jitsi component with SSR disabled
const Jitsi = dynamic(() => import('react-jitsi'), { 
  ssr: false,
  loading: () => <p>Loading meeting...</p>,
});

interface Mentor {
  id: number;
  image: string;
  name: string;
  qualification: string;
  subjects: string[];
}

const mentorsData: Mentor[] = [
  {
    id: 1,
    image: "/api/placeholder/100/100",
    name: "John Doe",
    qualification: "PhD in Computer Science",
    subjects: ["Data Structures", "Algorithms", "Machine Learning"],
  },
  {
    id: 2,
    image: "/api/placeholder/100/100",
    name: "Jane Smith",
    qualification: "M.Sc in Physics",
    subjects: ["Quantum Mechanics", "Thermodynamics", "Optics"],
  },
  {
    id: 3,
    image: "/api/placeholder/100/100",
    name: "Ashmit Shelke",
    qualification: "B.Tech in Computer Science",
    subjects: ["DSA", "React", "OS"],
  },
];

export default function MentorConnectPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(mentorsData);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [jitsiApiObject, setJitsiApiObject] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<'initializing' | 'connected' | 'error'>('initializing');

  useEffect(() => {
    const filtered = mentorsData.filter((mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.qualification.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMentors(filtered);
  }, [searchTerm]);

  const handleStartVideoCall = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsVideoCallActive(true);
    setCallStatus('initializing');
  };

  const handleEndVideoCall = () => {
    if (jitsiApiObject) {
      jitsiApiObject.executeCommand('hangup');
    }
    setIsVideoCallActive(false);
    setSelectedMentor(null);
    setJitsiApiObject(null);
    setCallStatus('initializing');
  };

  const handleJitsiIframeRef = (iframeRef: any) => {
    iframeRef.allow = "camera; microphone; fullscreen; display-capture; autoplay";
  };

  const handleApiReady = (apiObj: any) => {
    setJitsiApiObject(apiObj);
    apiObj.addEventListener('videoConferenceJoined', () => {
      setCallStatus('connected');
    });
    apiObj.addEventListener('videoConferenceLeft', handleEndVideoCall);
  };

  const handleJitsiError = () => {
    setCallStatus('error');
  };

  return (
    <div className="w-full p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 mt-20"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search mentors..."
          className="w-full p-3 border rounded-sm dark:bg-[#2C303B] dark:text-white"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white dark:bg-[#2C303B] rounded-lg shadow-lg text-center"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-bold dark:text-white">{mentor.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-3">
                {mentor.qualification}
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-300">
                {mentor.subjects.map((subject, index) => (
                  <li key={index}>- {subject}</li>
                ))}
              </ul>
              <button
                onClick={() => handleStartVideoCall(mentor)}
                className="rounded-sm bg-primary mt-2 px-8 py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
              >
                Start Video Call
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No mentors found.
          </p>
        )}
      </div>

      {isVideoCallActive && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Video Call with {selectedMentor.name}</h2>
            {callStatus === 'initializing' && (
              <p className="text-center mb-4">Initializing call... Please allow camera and microphone access if prompted.</p>
            )}
            {callStatus === 'error' && (
              <div className="text-center mb-4 text-red-500">
                <p>Error initializing the call. Please try the following:</p>
                <ul className="list-disc list-inside">
                  <li>Ensure you've granted camera and microphone permissions</li>
                  <li>Check that no other application is using your camera</li>
                  <li>Try using a different browser (Chrome or Firefox recommended)</li>
                  <li>Ensure you're on a secure (HTTPS) connection</li>
                </ul>
              </div>
            )}
            <Jitsi
              roomName={`mentor-connect-${selectedMentor.id}-${Date.now()}`}
              displayName="Student"
              containerStyle={{ width: '100%', height: '600px' }}
              config={{
                startWithAudioMuted: false,
                startWithVideoMuted: false,
                prejoinPageEnabled: false,
              }}
              interfaceConfig={{
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                MOBILE_APP_PROMO: false,
              }}
              onApiReady={handleApiReady}
              onIframeRef={handleJitsiIframeRef}
              getIFrameRef={handleJitsiIframeRef}
              onError={handleJitsiError}
            />
            <button
              onClick={handleEndVideoCall}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}