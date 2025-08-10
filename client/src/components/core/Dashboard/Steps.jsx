import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInfo from "./CourseInfo";
import CourseBuilder from "./CourseBuilder";
import Publish from "./Publish";

const steps = [
  { id: 1, title: "Course Information" },
  { id: 2, title: "Course Builder" },
  { id: 3, title: "Publish" },
];

function Steps() {
  const { step } = useSelector((state) => state.course);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      
      <div className="flex flex-row justify-between my-5 w-[100%]">
        {steps.map((item, index) => (
            <div key={item.id} className="flex items-center w-full">
            {/* Step */}
            <div className="flex flex-col items-center z-10">
                <div
                className={`aspect-square w-[34px] grid place-items-center rounded-full border-[2px] font-bold
                ${
                    step === item.id
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                    : step > item.id
                    ? "bg-yellow-50 border-yellow-50 text-richblack-900"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                }`}
                >
                {step > item.id ? (
                    <FaCheck className="text-richblack-900" />
                ) : (
                    item.id
                )}
                </div>
                <span className="mt-2 text-sm text-center text-richblack-100">
                {item.title}
                </span>
            </div>

            {/* Connector */}
            {index !== steps.length - 1 && (
                <div
                    className={`flex-1 mx-[-40px] z-0 border-b-2 border-dotted mb-6 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-700"
                    }`}
                ></div>
            )}
            </div>
        ))}
      </div>

      {step===1 && <CourseInfo/>}
      {step==2 && <CourseBuilder/>}
      {step===3 && <Publish/>}

    </div>
  );
}

export default Steps;
