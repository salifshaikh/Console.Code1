"use client"
import { useState } from "react";

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
    image: "https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419554.jpg?t=st=1727679710~exp=1727683310~hmac=708f91e38c3a2e7e4947f73671cb03e4f1aaa6a60f4ee459ba186ff9d910edcf&w=360",
    name: "John Doe",
    qualification: "PhD in Computer Science",
    subjects: ["Data Structures", "Algorithms", "Machine Learning"],
  },
  {
    id: 2,
    image: "https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419554.jpg?t=st=1727679710~exp=1727683310~hmac=708f91e38c3a2e7e4947f73671cb03e4f1aaa6a60f4ee459ba186ff9d910edcf&w=360",
    name: "Jane Smith",
    qualification: "M.Sc in Physics",
    subjects: ["Quantum Mechanics", "Thermodynamics", "Optics"],
  },
  {
    id: 3,
    image: "https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419554.jpg?t=st=1727679710~exp=1727683310~hmac=708f91e38c3a2e7e4947f73671cb03e4f1aaa6a60f4ee459ba186ff9d910edcf&w=360",
    name: "Ashmit Shelke",
    qualification: "B.Tech in Computer Science",
    subjects: ["DSA", "React", "OS"],
  },
 
];

export default function MentorConnectPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMentors = mentorsData.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())||
    mentor.qualification.toLowerCase().includes(searchTerm.toLowerCase())
 
  );

  return (
    <div className="w-full p-6">
    

      {/* Search Bar */}
      <div className="mb-6 mt-20">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search mentors..."
          className="w-full p-3 border rounded-sm dark:bg-[#2C303B] dark:text-white"
        />
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="p-6 bg-white dark:bg-[#2C303B] rounded-lg shadow-lg text-center"
              data-aos="fade-in"
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
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No mentors found.
          </p>
        )}
      </div>
    </div>
  );
}
