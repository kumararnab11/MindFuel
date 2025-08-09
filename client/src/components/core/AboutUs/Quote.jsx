import React from 'react';
import HighlightText from '../Homepage/HighlightText';

const Quote = () => {
  return (
    <div className='max-w-[950px] text-richblack-5 text-center text-3xl mb-[50px]'>
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <HighlightText text={" combines technology"} />
      <span className="bg-gradient-to-br from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">
        {" "}expertise
      </span>
      , and community to create an
      <span className='bg-gradient-to-br from-[#FF512F] to-[#F09819] bg-clip-text text-transparent'>
        {" "}unparalleled educational experience.
      </span>
    </div>
  );
};

export default Quote;
