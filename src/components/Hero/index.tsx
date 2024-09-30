"use client"; // This marks the component as a client component

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Hero = () => {
  const { theme } = useTheme();

  // Background images based on the theme
  const backgroundImage = theme === "dark"
    ? 'url("https://img.freepik.com/premium-vector/modern-luxury-shiny-black-with-gold-lines-elegant-background_907220-1990.jpg")' // Dark mode image URL
    : 'url("https://cdn.vectorstock.com/i/500p/84/65/abstract-white-monochrome-background-vector-32028465.jpg")'; // Light mode image URL

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] hero-section"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Welcome to our website created by SS-devs
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-black dark:text-white sm:text-lg md:text-xl">
                  Startup is free Next.js template for startups and SaaS
                  business websites comes with all the essential pages,
                  components, and sections you need to launch a complete
                  business website, built-with Next 13.x and Tailwind CSS.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href=""
                    className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                  >
                    🔥 Aaaagg
                  </Link>
                  <Link
                    href=""
                    className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5"
                  >
                    Start on GitHub
                  </Link>
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