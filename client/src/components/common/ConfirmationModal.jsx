import React from 'react';
import IconBtn from './IconBtn';

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-richblack-900/60 backdrop-blur-sm transition-all duration-300">
      <div className="w-11/12 max-w-md rounded-lg border border-richblack-500 bg-richblack-800 p-6 shadow-lg animate-fadeIn">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-richblack-5">
          {modalData?.text1}
        </h2>

        {/* Description */}
        <p className="mt-3 mb-6 text-sm leading-6 text-richblack-200">
          {modalData?.text2}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses="!px-5 !py-2 !text-sm"
          />
          <button
            className="cursor-pointer rounded-md bg-richblack-200 px-5 py-2 text-sm font-semibold text-richblack-900 hover:bg-richblack-300 transition-colors"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
