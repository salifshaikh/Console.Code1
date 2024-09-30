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

=======
// import Axios from 'axios';
import { useEffect, useState } from "react";
import Aos from "../../node_modules/aos";
// import "bower_components/aos/dist/aos.css"
>>>>>>> 969b8595b94441cfccb1586dfb51a88e35cef126

export default function Home() {
  // const [data, setData] = useState('');

  // const getData = async () => {
  //   const response = await Axios.get('http://localhost:4000/signup');
  //   setData(response.data);
  // };
<<<<<<< HEAD

  // useEffect(() => { 
  //   getData();
  // }, []);
=======
>>>>>>> 969b8595b94441cfccb1586dfb51a88e35cef126

  useEffect(()=>{
    Aos.init(
      {
          duration:1200
      }
    );
  },[])
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
