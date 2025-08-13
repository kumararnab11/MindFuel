import React from 'react';
import timelineImage from '../../../assets/TimelineImage.png'
import logo1 from '../../../assets/Logo1.svg'
import logo2 from '../../../assets/Logo2.svg'
import logo3 from '../../../assets/Logo3.svg'
import logo4 from '../../../assets/Logo4.svg'
import CountUp from './CountUp';

const timeline = [
  {
    Logo: logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: logo2,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: logo3,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: logo4,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex flex-row gap-15 items-center relative">
      <div className="absolute left-[25px] top-5 h-[90%] w-px bg-gray-300 z-0" />
      {/* This section appears to be for the timeline with logos and text */}
      <div className="w-[45%] flex flex-col gap-5">
        {timeline.map((element, index) => {
          return (
            <div key={index} className="flex flex-row gap-6 py-5">
              <div className="w-[50px] h-[50px] bg-white flex items-center rounded-full p-4 z-1">
                <img src={element.Logo} alt={`Logo ${index + 1}`} />
              </div>
              <div>
                <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                <p className="text-base">{element.Description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* This section appears to be a separate component with an image and text overlay */}
      <div className="w-[55%] relative shadow-blue-200">
        <img src={timelineImage} alt="timelineImage" className="shadow-white object-cover h-fit" />

        <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-5 left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
            <div className="text-3xl font-bold">
              <CountUp max={10} duration={1000}/>
            </div>
            <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
          </div>
          <div className="flex gap-5 items-center px-7">
            <div className="text-3xl font-bold">
              <CountUp max={250} duration={2000}/>
            </div>
            <p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;