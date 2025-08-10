import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const ThumbnailUploader = ({ label, name, errors, setValue }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      // Store file in RHF state & trigger validation
      setValue(name, file, { shouldValidate: true });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-richblack-5 font-semibold">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div
        className="w-full border border-gray-300 rounded-md h-64 flex items-center justify-center bg-richblack-700 overflow-hidden cursor-pointer"
        onClick={() => document.getElementById(name).click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="thumbnail preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex flex-col items-center text-richblack-200">
            <FiUploadCloud size={40} className="mb-2" />
            <p className="text-sm">Click to upload thumbnail</p>
          </div>
        )}
      </div>

      <input
        type="file"
        id={name}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {errors[name] && (
        <span className="text-pink-200 text-sm">{label} is required</span>
      )}
    </div>
  );
};

export default ThumbnailUploader;
