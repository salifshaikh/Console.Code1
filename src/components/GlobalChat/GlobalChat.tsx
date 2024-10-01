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
    }, 5000);
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
      const bottomThreshold = 100;
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
      setIsNearBottom(true);
      
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
            <User size={20} className="text-[var(--text-color)]" />
          </div>
        )}
        <div className={`max-w-xs md:max-w-md ${isCurrentUser ? 'bg-[var(--message-bg-user)] text-white' : 'bg-[var(--message-bg-bot)]'} rounded-lg p-3`}>
          <p className="text-sm font-semibold mb-1 text-[var(--text-color)]">{message.sender}</p>
          <p className="text-sm text-[var(--text-color)]">{message.text}</p>
          <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
  <div className="bg-[var(--bg-color)] shadow-md rounded-t-lg p-4">
    <h2 className="text-xl font-semibold text-[var(--text-color)]">Global Chat</h2>
  </div>
  <div 
    ref={chatContainerRef}
    className="flex-1 overflow-y-auto p-4 bg-[var(--bg-color)] text-[var(--text-color)]"
    onScroll={handleScroll}
  >
    {messages.map((message, index) => (
      <MessageBubble key={index} message={message} />
    ))}
  </div>
  <form onSubmit={handleSendMessage} className="bg-[var(--bg-color)] shadow-md rounded-b-lg p-4">
    <div className="flex items-center">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border-[var(--border-color)] rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--bg-color)] text-[var(--text-color)]"
      />
      <button
        type="submit"
        className="bg-[var(--primary-color)] text-white rounded-r-lg p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
      >
        <Send size={20} />
      </button>
    </div>
  </form>
</div>

  );
};

export default GlobalChat;