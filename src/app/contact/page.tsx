"use client"
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Rating } from 'react-simple-star-rating'
import { Metadata } from "next";
import { useState } from "react";






const ContactPage = () => {
  const [rating, setRating] = useState(0)
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="Ask any queries !"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
