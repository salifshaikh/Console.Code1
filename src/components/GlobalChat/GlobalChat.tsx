import React, { useState } from 'react';
import { Send, User } from 'lucide-react';

const GlobalChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const currentUser = 'ashmit';

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        text: inputMessage,
        sender: currentUser,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">Global Chat</h3>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
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