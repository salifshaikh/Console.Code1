"use client"
import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { useState } from "react";


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
const ContactPage = () => {
  const [rating, setRating] = useState(0)
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Ask any queries !"
      />
         <ChatbotWidget />

      <Contact />
    </>
  );
};

export default ContactPage;
