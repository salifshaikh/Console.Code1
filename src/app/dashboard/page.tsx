"use client";
import React, { useState } from 'react';
import { useTheme } from "next-themes";
import { Sun, Moon, Book, Star, FileText, Coins, Users, Calendar, CheckSquare, Compass } from 'lucide-react';

const Dashboard = () => {
  const [role, setRole] = useState('student');
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const StudentProfile = () => (
    <ProfileCard
      name="Ashmit Shelke"
      college="Amity University"
      email="ashmit.shelke3135@gmail.com"
      imageUrl="/images/header/profile_icons.png" // Replace with the actual image path
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

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const CareerPredictor = () => {
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({
      technical: 0,
      creative: 0,
      social: 0,
      analytical: 0,
    });
    const [result, setResult] = useState('');
  
    const questions = [
      "Do you enjoy solving complex problems?",
      "Are you creative and imaginative?",
      "Do you like working with people?",
      "Are you detail-oriented?",
      "Do you enjoy working with computers and technology?",
      "Do you like expressing yourself through art or writing?",
      "Are you good at resolving conflicts?",
      "Do you enjoy analyzing data and finding patterns?",
      "Are you interested in how things work?",
      "Do you enjoy planning and organizing events?"
    ];
  
    const handleAnswer = (answer) => {
      const newScores = { ...scores };
      if (currentQuestion % 4 === 0) newScores.technical += answer;
      else if (currentQuestion % 4 === 1) newScores.creative += answer;
      else if (currentQuestion % 4 === 2) newScores.social += answer;
      else newScores.analytical += answer;
  
      setScores(newScores);
  
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate result
        const maxScore = Math.max(newScores.technical, newScores.creative, newScores.social, newScores.analytical);
        let career = '';
        if (maxScore === newScores.technical) career = 'Software Developer';
        else if (maxScore === newScores.creative) career = 'Graphic Designer';
        else if (maxScore === newScores.social) career = 'Human Resources Manager';
        else career = 'Data Analyst';
        setResult(career);
      }
    };
  
    const resetQuiz = () => {
      setShowQuiz(false);
      setCurrentQuestion(0);
      setScores({
        technical: 0,
        creative: 0,
        social: 0,
        analytical: 0,
      });
      setResult('');
    };
  
    return (
      <Card title="Career Predictor" icon={<Compass />}>
        <button 
          onClick={() => setShowQuiz(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Career Quiz
        </button>
        <Modal isOpen={showQuiz} onClose={() => setShowQuiz(false)}>
          <h2 className="text-xl font-bold mb-4">Career Predictor Quiz</h2>
          {!result && (
            <div>
              <p className="mb-2">{questions[currentQuestion]}</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => handleAnswer(0)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Not at all
                </button>
                <button 
                  onClick={() => handleAnswer(1)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                >
                  Somewhat
                </button>
                <button 
                  onClick={() => handleAnswer(2)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Very much
                </button>
                <button 
                  onClick={() => handleAnswer(3)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Absolutely
                </button>
              </div>
            </div>
          )}
          {result && (
            <div>
              <p>Based on your answers, you might enjoy a career as a: <strong>{result}</strong></p>
              <button 
                onClick={resetQuiz}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Take Quiz Again
              </button>
            </div>
          )}
        </Modal>
      </Card>
    );
  };
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
      <CareerPredictor />
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
