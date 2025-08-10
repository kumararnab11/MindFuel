import React from "react";

const Input = ({ label, placeholder, inputValue, setInputValue,type,...rest }) => {
  return (
    <div >
      <label className="block text-sm font-medium text-gray-50 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        className="bg-richblack-700
         placeholder-pure-greys-300 w-full px-4 py-2 border
        border-b-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue?.(e.target.value)}
        {...rest}
      />
    </div>
  );
};

export default Input;
