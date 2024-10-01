"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter for client-side navigation
import { auth } from '../firebase'; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import auth method
import { db } from '../firebase'; // Import your Firestore database
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

const SignupPage = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: ''
  });

  const router = useRouter(); // Use useRouter instead of useNavigate

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Firebase sign-up logic
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Successfully signed up
      console.log('User signed up:', userCredential.user);

      // Store user information in Firestore
      const userId = userCredential.user.uid; // Get the signed-up user's ID
      await setDoc(doc(db, "students", userId), {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        role: role
      });

      // Successfully stored user data
      console.log('User data stored in Firestore');

      // Redirect after successful signup
      router.push("/dashboard"); 
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <>
      <section className="relative rounded-lg z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  It’s totally free and super easy
                </p>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label htmlFor="role" className="mb-3 block text-sm text-dark dark:text-white">
                      Select Role
                    </label>
                    <select
                      name="role"
                      value={role}
                      onChange={handleRoleChange}
                      aria-placeholder="Select Role"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-[10px] py-3 pr-[10px] text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    >
                     
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                    </select>
                  </div>

                  {/* Common Fields */}
                  <div className="mb-8">
                    <label htmlFor="name" className="mb-3 block text-sm text-dark dark:text-white">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="email" className="mb-3 block text-sm text-dark dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your Email"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="password" className="mb-3 block text-sm text-dark dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  {/* Role-Specific Fields */}
                  {role === "student" && (
                    <>
                      <div className="mb-8">
                        <label htmlFor="age" className="mb-3 block text-sm text-dark dark:text-white">
                          Age
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Enter your age"
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>

                      <div className="mb-8">
                        <label htmlFor="gender" className="mb-3 block text-sm text-dark dark:text-white">
                          Gender
                        </label>
                        <input
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          placeholder="Enter your gender"
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </>
                  )}
                  {role === "teacher" && (
                    <>
                      <div className="mb-8">
                        <label htmlFor="age" className="mb-3 block text-sm text-dark dark:text-white">
                          Qualifications
                        </label>
                        <input
                          type="text"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Enter your qualification"
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>

                      <div className="mb-8">
                        <label htmlFor="gender" className="mb-3 block text-sm text-dark dark:text-white">
                         What will you teach?
                        </label>
                        <input
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          placeholder="Enter your skills"
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </>
                  )}
                  {role === "parent" && (
                    <>
                      <div className="mb-8">
                        <label htmlFor="age" className="mb-3 block text-sm text-dark dark:text-white">
                          Student name
                        </label>
                        <input
                          type="text"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Enter your age"
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>

                      <div className="mb-8">
                        <label htmlFor="gender" className="mb-3 block text-sm text-dark dark:text-white">
                          Student Id
                        </label>
                        <input
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          placeholder="Enter your student's id"
                          className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-6">
                    <input
                      type="submit"
                      className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                      value="Sign up"
                    />
                  </div>

                  <p className="text-center text-base font-medium text-body-color">
                    Already using EduLift?{" "}
                    <Link href="/signin">Sign in</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
