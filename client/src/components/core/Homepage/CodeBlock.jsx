import React from 'react';
import CTAButton from '../Homepage/CTAbutton';
import HighlightText from './HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation'; // <--- Added this import

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroudGradient, 
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
      {/* Left section: Heading, Subheading, and Call-to-Action Buttons */}
      <div className='w-[50%] flex flex-col gap-8'>
        {heading}

        <div className='text-richblack-300 font-bold '>
          {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
          {/* First CTA Button */}
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          {/* Second CTA Button */}
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Right section: Codeblock with Line Numbers and Type Animation */}
      <div className={`h-fit flex flex-row text-10 w-[100%] py-4 lg:w-[500px] ${backgroudGradient}`}>
        {/* Line numbers column */}
        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>

        {/* Code block with typing animation */}
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
          <TypeAnimation
            sequence={[codeblock, 2000, ""]} // Displays codeblock, waits 2000ms, then clears
            repeat={Infinity} // Repeats the animation indefinitely
            cursor={true} // Shows a blinking cursor
            style={{
              whiteSpace: "pre-line", // Preserves whitespace and newlines
              display: "block", // Ensures it takes full width
            }}
            omitDeletionAnimation={true} // Omits the deletion animation when repeating
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;