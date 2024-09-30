import React, { useState, useEffect, useRef } from 'react';
import { Send, User } from 'lucide-react';

const botNames = ['Alice', 'Bob', 'Charlie', 'Diana'];
const botMessages = [
  "How's everyone doing today?",
  "I'm working on an exciting new project!",
  "Did you hear about the latest tech news?",
  "What's your favorite programming language?",
  "I love collaborating with this team!",
  "Any interesting challenges you're tackling?",
  "Remember to take breaks and stay hydrated!",
  "Has anyone tried the new JavaScript framework?",
  "I'm looking forward to our next meetup!",
  "Don't forget to commit your code regularly!",
];

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const currentUser = 'ashmit';
  const chatContainerRef = useRef(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
      const randomMessage = botMessages[Math.floor(Math.random() * botMessages.length)];
      addMessage(randomMessage, randomBot);
    }, 5000); // Bot messages every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isNearBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const bottomThreshold = 100; // pixels from bottom
      setIsNearBottom(scrollHeight - (scrollTop + clientHeight) < bottomThreshold);
    }
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      text,
      sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      addMessage(inputMessage, currentUser);
      setInputMessage('');
      setIsNearBottom(true); // Force scroll to bottom when user sends a message
      
      // Bot response
      setTimeout(() => {
        const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
        const botResponse = generateBotResponse(inputMessage);
        addMessage(botResponse, randomBot);
      }, 1000);
    }
  };

  const generateBotResponse = (userMessage) => {
    const lowercaseMessage = userMessage.toLowerCase();
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      return "Hello there! How can I assist you today?";
    } else if (lowercaseMessage.includes('project')) {
      return "That sounds interesting! What kind of project are you working on?";
    } else if (lowercaseMessage.includes('help')) {
      return "I'd be happy to help! What do you need assistance with?";
    } else if (lowercaseMessage.includes('thanks') || lowercaseMessage.includes('thank you')) {
      return "You're welcome! Let me know if you need anything else.";
    } else {
      return "That's an interesting point! Can you tell me more about it?";
    }
  };

  const MessageBubble = ({ message }) => {
    const isCurrentUser = message.sender === currentUser;

    return (
      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
        {!isCurrentUser && (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
            <User size={20} />
          </div>
        )}
        <div className={`max-w-[70%] ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'} rounded-lg p-3 shadow`}>
          {!isCurrentUser && <div className="font-bold text-sm mb-1">{message.sender}</div>}
          <div className="mb-1">{message.text}</div>
          <div className="text-xs text-right opacity-70">{message.timestamp}</div>
        </div>
        {isCurrentUser && (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-2">
            <User size={20} color="white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col h-[600px] max-w-2xl ml-10">
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">Global Chat</h3>
      </div>
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4"
        onScroll={handleScroll}
      >
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-b-lg">
        <div className="flex items-center bg-white dark:bg-gray-600 rounded-full shadow-inner">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-3 bg-transparent focus:outline-none"
            placeholder="Type a message..."
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default GlobalChat;