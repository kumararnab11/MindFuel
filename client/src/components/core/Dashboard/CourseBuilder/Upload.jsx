import React, { useEffect, useState, useRef } from "react";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // On mount/update, show preview for view or edit mode URLs
  useEffect(() => {
    if (viewData) {
      setPreview(viewData);
    } else if (editData) {
      setPreview(editData);
    }
  }, [viewData, editData]);

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Validate file type if video prop is true
    if (video && !file.type.startsWith("video/")) {
      alert("Please upload a valid video file");
      return;
    }

    setPreview(URL.createObjectURL(file));
    setValue(name, file, { shouldValidate: true }); // update RHF form state
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-richblack-5 font-semibold">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Preview Area */}
      <div
        onClick={() => fileInputRef.current.click()}
        className="w-full border border-gray-300 rounded-md h-64 flex items-center justify-center bg-richblack-700 overflow-hidden cursor-pointer hover:border-blue-500 transition"
      >
        {preview ? (
          video ? (
            <video
              src={preview}
              controls
              className="object-contain w-full h-full"
            />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full"
            />
          )
        ) : (
          <p className="text-richblack-200">Click to upload {video ? "video" : "file"}</p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        id={name}
        accept={video ? "video/*" : "*"}
        className="hidden"
        {...register(name, { required: true })}
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {/* Validation Error */}
      {errors[name] && (
        <span className="text-pink-200 text-sm">{label} is required</span>
      )}
    </div>
  );
};

export default Upload;
