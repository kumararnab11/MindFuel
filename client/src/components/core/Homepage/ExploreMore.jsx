import { useState, useEffect } from "react";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";
import {HomePageExplore} from "../../../data/homepage-explore";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    
  // Update cards on tab change
  useEffect(() => {
    const result = HomePageExplore.find((course) => course.tag === currentTab);
    if (result) {
      setCourses(result.courses);
      setCurrentCard(result.courses[0]?.heading || "");
    }
  }, [currentTab]);


  return (
    <div className="max-w-[1080px] w-fit text-white relative">
      <div className="text-4xl font-semibold text-center">
        Unlock the <HighlightText text="Power of Code" />
      </div>

      <p className="text-center text-richblack-300 text-sm mt-3">
        Learn to build anything you can imagine
      </p>

      {/* Tabs */}
      <div className="mt-5 flex flex-wrap justify-center rounded-full bg-richblack-800 mb-5 border px-1 py-1 border-richblack-100">
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

      <div className="h-[150px]"></div>

      {/* Course Cards */}
      <div className="w-full absolute lg:h-[150px] pb-3 translate-y-[-120px] translate-x-[-220px]">
        <div className="flex gap-10 items-center min-w-max">
          {courses.map((course, index) => (
            //console.log(course.heading)
            <CourseCard
              key={index}
              cardData={course}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
