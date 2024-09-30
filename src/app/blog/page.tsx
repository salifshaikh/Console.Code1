"use client";
import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import GlobalChat from '@/components/GlobalChat/GlobalChat';
import ResourceManagement from '@/components/ResourceManagement/ResourceMang';
import YouTubeVideos from '@/components/YouTubeVideos/YouTubeVideos';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-[100px] right-4 z-50">
      {!isOpen ? (
        <button
          onClick={toggleChatbot}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <MessageCircle className="mr-2" size={34} />
          Need any help?
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-[350px] h-[430px] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Chatbot</h3>
            <button onClick={toggleChatbot} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow">
            <iframe
              allow="microphone;"
              width="100%"
              height="100%"
              src="https://console.dialogflow.com/api-client/demo/embedded/e54f8ae3-1f71-4a5c-8fb9-6222a727a5da"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

const Blog = () => {
  return (
    <div className="container mx-auto mt-[100px] px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <GlobalChat />
        </div>
        <div className="md:w-1/2">
          <YouTubeVideos />
        </div>
      </div>
      <div className="mt-12">
        <ResourceManagement />
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default Blog;