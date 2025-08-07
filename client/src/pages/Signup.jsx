import React, { useState } from "react";
import SignupImg from "../assets/signup.webp";
import Input from "../components/core/Input";
import CTAButton from "../components/core/Homepage/CTAbutton";

const tabsName = [
  "Student",
  "Instructor",
];

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentTab, setCurrentTab] = useState("Student");


  //SignupHandler

  return (
    <div className="flex flex-col md:flex-row-reverse max-w-[1080px] mx-auto my-auto items-center justify-between gap-10 py-12 px-4">
      {/* Welcome Section */}
      <div className="w-full md:hidden order-1">
        <h1 className="text-3xl font-bold text-richblack-50">Join US</h1>
        <h2 className="text-pure-greys-25">
          Build skills for today, tomorrow, and beyond.
        </h2>
        <h2 className="font-edu-sa text-blue-200 mb-5">
          Education to future-proof your career.
        </h2>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center order-2">
        <img
          src={SignupImg}
          alt="Signup"
          className="max-w-[400px] w-full h-auto object-contain"
        />
      </div>

      {/* Form + Welcome for Desktop */}
      <div className="w-full md:w-1/2 flex flex-col gap-5 order-3">
        {/* Show welcome text only on md+ screens */}
        <div className="hidden md:block">
          <h1 className="text-3xl font-bold text-richblack-50">Join Us</h1>
          <h2 className="text-pure-greys-25">
            Build skills for today, tomorrow, and beyond.
          </h2>
          <h2 className="font-edu-sa text-blue-200 mb-5">
            Education to future-proof your career.
          </h2>
        </div>

        <div className="mt-5 flex flex-wrap w-fit justify-center rounded-full bg-richblack-800 mb-5 border px-1 py-1 border-richblack-100">
            {tabsName.map((tab, index) => (
            <div
                key={index}
                className={`text-[16px] flex items-center gap-2 px-7 py-2 rounded-full cursor-pointer transition-all duration-200
                ${
                    currentTab === tab
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"
                }`}
                onClick={() => setCurrentTab(tab)}
            >
                {tab}
            </div>
            ))}
        </div>

        <div className="flex flex-row gap-3">
            <Input
            label="First Name"
            placeholder="Enter your First Name"
            inputValue={firstName}
            setInputValue={setFirstName}
            type="text"
            />

            <Input
            label="Last Name"
            placeholder="Enter your Last Name"
            inputValue={lastName}
            setInputValue={setLastName}
            type="text"
            />
        </div>

        <Input
            label="Email Address"
            placeholder="Enter your email"
            inputValue={email}
            setInputValue={setEmail}
            type="email"
        />

        <div className="flex flex-row gap-3">
            <Input
            label="Password"
            placeholder="Enter your password"
            inputValue={password}
            setInputValue={setPassword}
            type="password"
            />

            <Input
            label="Confirm Password"
            placeholder="Re enter your password"
            inputValue={confirmPassword}
            setInputValue={setConfirmPassword}
            type="password"
            />
        </div>

        <CTAButton active={true}>Signup</CTAButton>
      </div>
    </div>
  );
}

export default Signup;
