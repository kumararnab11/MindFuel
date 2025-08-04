import React from "react";
import { FcFlowChart } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";

function CourseCard({ cardData, currentCard, setCurrentCard }) {
  const isActive = currentCard === cardData.heading;

  return (
    <div
      className={`flex flex-col justify-between max-w-[350px] h-full min-h-[250px] p-6 transition-all duration-200 cursor-pointer
        ${
          isActive
            ? "bg-white shadow-[4px_4px_0px_0px_#FFD60A] text-richblack-900"
            : "bg-richblack-900 text-white"
        }`}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      {/* Heading & Description */}
      <div>
        <h3 className="text-lg font-bold">{cardData.heading}</h3>
        <p className="text-sm text-richblack-300 mt-5 min-h-[150px]">{cardData.description}</p>
      </div>

      {/* Dashed Divider */}
      <div className="my-4 border-t border-dashed border-richblack-500"></div>

      {/* Bottom Info */}
      <div className={`flex items-center justify-between ${isActive?"text-blue-400":"text-richblack-50"} text-sm`}>
        <div className="flex items-center gap-2">
          <FaUsers />
          <span>{cardData.level}</span>
        </div>
        <div className="flex items-center gap-2">
          <FcFlowChart />
          <span>{cardData.lessionNumber} Lesson</span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
