import React from "react";
import HighlightText from "../Homepage/HighlightText";
import CTAButton from "../Homepage/CTAbutton"

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-fit lg:grid-cols-4 mb-10 max-w-[1200px]">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={`${index === 0 && "lg:col-span-2 bg-transparent"}
            ${
              card.order % 2 === 1
                ? "bg-richblack-700"
                : "bg-richblack-800"
            }
            ${card.order === 3 && "lg:col-start-2"}
            p-5 pb-8 lg:p-8 flex flex-col gap-3`}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-richblack-5">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </h1>
                <p className="font-medium text-richblack-300">
                  {card.description}
                </p>
                <div className="w-fit mt-4">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 min-h-[200px]">
                <h1 className="text-xl font-semibold text-richblack-5">
                  {card.heading}
                </h1>
                <p className="text-richblack-300">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;