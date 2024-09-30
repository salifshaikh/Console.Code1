"use client";
import React, { useState } from 'react';
import { useTheme } from "next-themes";
import { Sun, Moon, Book, Star, FileText, Coins, Users, Calendar, CheckSquare } from 'lucide-react';

const Dashboard = () => {
  const [role, setRole] = useState('student');
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const StudentProfile = () => (
    <ProfileCard
      name="John Doe"
      college="XYZ University"
      email="john.doe@example.com"
      imageUrl="/path/to/student.jpg" // Replace with the actual image path
    />
  );

  const TeacherProfile = () => (
    <ProfileCard
      name="Jane Smith"
      college="XYZ University"
      email="jane.smith@example.com"
      imageUrl="/path/to/teacher.jpg" // Replace with the actual image path
    />
  );

  const ParentProfile = () => (
    <ProfileCard
      name="Michael Johnson"
      college="Parent"
      email="michael.johnson@example.com"
      imageUrl="/images/brands/bjp.jpg" // Replace with the actual image path
    />
  );

  const ProfileCard = ({ name, college, email, imageUrl }) => (
    <div className="flex items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <img src={imageUrl} alt={`${name}'s profile`} className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{college}</p>
        <p className="text-gray-600 dark:text-gray-300">{email}</p>
      </div>
    </div>
  );

  const StudentDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Progress Tracker" icon={<CheckSquare />}>
        <p>You've completed 75% of your courses</p>
      </Card>
      <Card title="Saved Resources" icon={<FileText />}>
        <p>5 PDFs saved from community</p>
      </Card>
      <Card title="Coins Earned" icon={<Coins />}>
        <p>You have 1250 coins</p>
      </Card>
      <Card title="Starred Teachers" icon={<Star />}>
        <p>You've starred 3 teachers</p>
      </Card>
      <Card title="Upcoming Lessons" icon={<Calendar />}>
        <p>2 lessons scheduled this week</p>
      </Card>
      <Card title="Community Activity" icon={<Users />}>
        <p>Join 3 active discussions</p>
      </Card>
    </div>
  );

  const TeacherDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Students" icon={<Users />}>
        <p>You have 45 active students</p>
      </Card>
      <Card title="Courses" icon={<Book />}>
        <p>You're teaching 3 courses</p>
      </Card>
      <Card title="Ratings" icon={<Star />}>
        <p>Your average rating: 4.8/5</p>
      </Card>
      <Card title="Resources" icon={<FileText />}>
        <p>15 resources uploaded</p>
      </Card>
      <Card title="Schedule" icon={<Calendar />}>
        <p>5 classes scheduled this week</p>
      </Card>
      <Card title="Community Engagement" icon={<Users />}>
        <p>10 recent forum responses</p>
      </Card>
    </div>
  );

  const ParentDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Child's Progress" icon={<CheckSquare />}>
        <p>Your child has completed 75% of courses</p>
      </Card>
      <Card title="Recent Activities" icon={<Book />}>
        <p>3 lessons completed this week</p>
      </Card>
      <Card title="Teacher Feedback" icon={<Star />}>
        <p>2 new comments from teachers</p>
      </Card>
      <Card title="Resources Used" icon={<FileText />}>
        <p>7 learning resources accessed</p>
      </Card>
      <Card title="Upcoming Events" icon={<Calendar />}>
        <p>Parent-teacher meeting next week</p>
      </Card>
      <Card title="Community Involvement" icon={<Users />}>
        <p>Join parent discussion group</p>
      </Card>
    </div>
  );

  const Card = ({ title, children, icon }) => (
    <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-lg font-semibold ml-2">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">EduLift Dashboard</h1>
        <div className="flex items-center">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mr-4 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
          
        </div>
      </div>
      {role === 'student' && (
        <>
          <StudentProfile />
          <StudentDashboard />
        </>
      )}
      {role === 'teacher' && (
        <>
          <TeacherProfile />
          <TeacherDashboard />
        </>
      )}
      {role === 'parent' && (
        <>
          <ParentProfile />
          <ParentDashboard />
        </>
      )}
    </div>
  );
};

export default Dashboard;
