import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaVideo } from "react-icons/fa";

const CourseContentAccordion = ({ courseContent }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="border border-richblack-600 rounded">
      {courseContent.map((section, index) => (
        <div key={section._id || index}>
          {/* Section Header */}
          <div
            className="bg-richblack-800 px-4 py-3 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(index)}
          >
            <div className="flex items-center gap-2 text-richblack-5 font-semibold">
              {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
              {section.sectionName}
            </div>
            <span className="text-sm text-yellow-100">
              {section.subSection?.length || 0} lecture(s)
            </span>
          </div>

          {/* Subsections */}
          {openSection === index && (
            <div className="bg-richblack-900">
              {section.subSection?.map((sub, subIndex) => (
                <div
                  key={sub._id || subIndex}
                  className="flex items-center gap-2 px-6 py-2 text-richblack-5 hover:bg-richblack-700"
                >
                  <FaVideo />
                  <div className="flex flex-row justify-between w-full">
                    <span>{sub.title}</span>
                    <span>{sub.timeDuration}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContentAccordion;
