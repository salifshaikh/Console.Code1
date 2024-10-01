"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Image from "next/image"; // Importing Image for Next.js optimized image handling
import app from '/Users/suban0408/sem - 5 MPR/NEW_SIH/cs/src/Components/Firebase.js';
import prfimg from '../../../public/images/header/profile_icon.png'; // Importing profile icon
import logoLight from '../../../public/images/logo/logo_light.png'; // Importing logos

import logoDark from '../../../public/images/logo/logo_dark.png';

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isUser, setIsUser] = useState(true); // State for tracking if a user is logged in
  const profileImage = prfimg;

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const auth = getAuth(app);

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar); // Cleanup on unmount
    
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUser(!user);
      console.log({isUser});  
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  const currentPath = usePathname();

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully.");
      setIsUser(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src={logoLight}
                  alt="logo"
                  width={140}
                  height={140}
                  className="dark:hidden"
                />
                <Image
                  src={logoDark}
                  alt="logo"
                  width={140}
                  height={140}
                  className="hidden dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : ""
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        <Link
                          href={
                            isUser || menuItem.title === "Home" || menuItem.title === "Contact Us"
                              ? menuItem.path
                              : "/signin" // Conditional path based on isUser state
                          }
                          className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            currentPath === menuItem.path
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                {!isUser ? (
                  <>
                    <Link
                      href="/signin"
                      className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center">
                    <Link
                      href="/dashboard"
                      className={`header-logo block w-full ${
                        sticky ? "py-5 lg:py-2" : "py-8"
                      } `}
                    >
                      {/* Static Profile Image */}
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={35}
                        height={35}
                        className="rounded-full"
                      />
                    </Link>
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="ml-4 px-4 py-2 text-base font-medium text-dark hover:opacity-70 dark:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
