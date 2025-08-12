import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TagInput = ({ name, label, register, errors, setValue }) => {
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    if (editCourse) {
      setTagList(course?.instructions || []);
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, tagList);
  }, [tagList]);

  const handleAddTag = () => {
    if (tag.trim() !== "" && !tagList.includes(tag.trim())) {
      setTagList([...tagList, tag.trim()]);
      setTag("");
    }
  };

  const handleRemoveTag = (index) => {
    setTagList(tagList.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-richblack-5 font-semibold">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-wrap gap-2">
        {tagList.map((t, index) => (
          <span
            key={index}
            className="flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium"
          >
            {t}
            <button
              type="button"
              onClick={() => handleRemoveTag(index)}
              className="text-black font-bold hover:text-red-600"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        type="text"
        id={name}
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter Tags and press Enter"
        className="w-full h-[40px] border border-gray-300 rounded-md px-3 text-richblack-5 bg-richblack-700 focus:outline-none"
      />

      {errors[name] && (
        <span className="text-pink-200 text-sm">{label} is required</span>
      )}
    </div>
  );
};

export default TagInput;
