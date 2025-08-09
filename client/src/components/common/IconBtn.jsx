import React from 'react';

const IconBtn = ({
  text,
  onClick,
  children=null,
  disabled = false,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`
        flex items-center gap-2 rounded-md font-semibold text-richblack-900
        ${
          outline
            ? "border border-yellow-50 bg-transparent text-yellow-50"
            : "bg-yellow-50"
        }
        ${customClasses ? customClasses : ""}
        ${text ? "px-6 py-3" : "p-3"}
      `}
    >
      {children ? (
        <>
          <span className={`${text && "text-richblack-900"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;