"use client"; // This marks the component as a client component

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Hero = (props) => {
  const { theme } = useTheme();
  const [backgroundVideo, setBackgroundVideo] = useState('');

  useEffect(() => {
    // Set the video based on the current theme
    const videoUrl = theme === "dark"
      ? "https://videos.pexels.com/video-files/6549275/6549275-sd_640_360_25fps.mp4"
      : "https://videos.pexels.com/video-files/1580505/1580505-sd_640_360_30fps.mp4";
      
    setBackgroundVideo(videoUrl);
  }, [theme]); // Runs whenever the theme changes

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] hero-section"
        style={{
          position: 'relative',
        }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          key={backgroundVideo} // Key to trigger re-render when video source changes
          className="absolute top-0 left-0 w-full h-full object-cover -z-1 filter blur-xl scale-110" // Scale the video to avoid edge distortions
          style={{ filter: 'blur(10px)' }} // Increased blur intensity
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="container relative z-10">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Empowering Every Learner, Everywhere
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-black dark:text-white sm:text-lg md:text-xl">
                  We are dedicated to leveling the playing field by providing access to educational resources and support for every student, no matter their background.
                </p>
                {/* Donation Button and Quote */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Link
                    href="/donate" // Change this to your donation page URL
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    Donate Us
                  </Link>
                  <p className="text-sm italic text-gray-600 dark:text-gray-300">
                    "Your contribution can change a life."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
