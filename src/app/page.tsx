"use client";

import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import Brands from "@/components/Brands";
<<<<<<< HEAD
import Axios from 'axios';
import { useEffect, useState } from "react";
=======
import { Metadata } from "next";

// import Axios from 'axios';
// import { useEffect, useState } from "react";
>>>>>>> ef9187234fcd96c5621bfa827c09d18ad4d36f76

export default function Home() {
  const [data, setData] = useState('');

  const getData = async () => {
    const response = await Axios.get('http://localhost:4000/signup');
    setData(response.data);
  };

  useEffect(() => { 
    getData();
  }, []);

  return (
    <>
      <ScrollUp />
      <Hero/>
      <AboutSectionTwo />
      <Features />
      <AboutSectionOne />
      <Video />
      <Brands />
      <Testimonials />
     
    </>
  );
}
