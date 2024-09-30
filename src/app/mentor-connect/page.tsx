"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { JitsiMeeting } from "@jitsi/react-sdk";

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
  const [callStatus, setCallStatus] = useState<"initializing" | "connected" | "error">("initializing");

  useEffect(() => {
    const filtered = mentorsData.filter(
      (mentor) =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.qualification.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMentors(filtered);
  }, [searchTerm]);

  const handleStartVideoCall = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsVideoCallActive(true);
    setCallStatus("initializing");
  };

  const handleEndVideoCall = () => {
    if (jitsiApiObject) {
      jitsiApiObject.executeCommand("hangup");
    }
    setIsVideoCallActive(false);
    setSelectedMentor(null);
    setJitsiApiObject(null);
    setCallStatus("initializing");
  };

  const handleJitsiIframeRef = (iframeRef: any) => {
    iframeRef.allow = "camera; microphone; fullscreen; display-capture; autoplay";
    iframeRef.style.height = "600px"; // Set height to 600px
    iframeRef.style.width = "100%"; // Set width to 100% for responsive design
  };

  const handleApiReady = (apiObj: any) => {
    setJitsiApiObject(apiObj);
    apiObj.addEventListener("videoConferenceJoined", () => {
      setCallStatus("connected");
    });
    apiObj.addEventListener("videoConferenceLeft", handleEndVideoCall);
  };

  const handleJitsiError = () => {
    setCallStatus("error");
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
          className="w-full rounded-sm border p-3 dark:bg-[#2C303B] dark:text-white"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-[#2C303B]"
            >
              <img
                src={mentor.image}
                alt={mentor.name}
                className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
              />
              <h2 className="text-xl font-bold dark:text-white">{mentor.name}</h2>
              <p className="mb-3 text-gray-500 dark:text-gray-400">{mentor.qualification}</p>
              <ul className="text-sm text-gray-600 dark:text-gray-300">
                {mentor.subjects.map((subject, index) => (
                  <li key={index}>- {subject}</li>
                ))}
              </ul>
              <button
                onClick={() => handleStartVideoCall(mentor)}
                className="mt-2 rounded-sm bg-primary px-8 py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
              >
                Start Video Call
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No mentors found.</p>
        )}
      </div>

      {isVideoCallActive && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl rounded-lg bg-white p-4">
            <h2 className="mb-4 text-2xl font-bold">Video Call with {selectedMentor.name}</h2>
            {callStatus === "initializing" && (
              <p className="mb-4 text-center">
                Initializing call... Please allow camera and microphone access if prompted.
              </p>
            )}
            {callStatus === "error" && (
              <div className="mb-4 text-center text-red-500">
                <p>Error initializing the call. Please try the following:</p>
                <ul className="list-inside list-disc">
                  <li>Ensure you've granted camera and microphone permissions</li>
                  <li>Check that no other application is using your camera</li>
                  <li>Try using a different browser (Chrome or Firefox recommended)</li>
                  <li>Ensure you're on a secure (HTTPS) connection</li>
                </ul>
              </div>
            )}
            <JitsiMeeting
              domain="meet.jit.si"
              roomName={`YourUniqueRoomName_${new Date().getTime()}`}
              configOverwrite={{
                startWithAudioMuted: true,
                disableModeratorIndicator: true,
                startScreenSharing: true,
                enableEmailInStats: false,
              }}
              interfaceConfigOverwrite={{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
              }}
              userInfo={{
                displayName: "ashmit",
                email:"ashmit.shelke3135@gmail.com"
              }}
              onApiReady={handleApiReady}
              getIFrameRef={handleJitsiIframeRef}
            />
            <button
              onClick={handleEndVideoCall}
              className="mt-4 rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
