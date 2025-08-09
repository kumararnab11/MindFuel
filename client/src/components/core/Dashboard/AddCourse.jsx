import React, { useState } from "react";
import Input from "../Input";

function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen bg-richblack-900 text-white">
      {/* Main content */}
      <div className="flex-1 p-8">
        {/* Step indicator */}
        <div className="flex items-center mb-8 relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 border-2 border-yellow-50 text-yellow-50 font-bold">
            1
            </div>
            <span className="mt-2 text-xs">Course Information</span>
        </div>

        {/* Dotted line between Step 1 & 2 */}
        <div className="mb-6 flex-1 border-t-2 border-dotted border-richblack-600 relative top-0.5"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 border-2 border-yellow-50 text-yellow-50 font-bold">
            2
            </div>
            <span className="mt-2 text-xs">Course Builder</span>
        </div>

        {/* Dotted line between Step 2 & 3 */}
        <div className="mb-6 flex-1 border-t-2 border-dotted border-richblack-600 relative top-0.5"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center z-10">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 border-2 border-yellow-50 text-yellow-50 font-bold">
            3
            </div>
            <span className="mt-2 text-xs">Publish</span>
        </div>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <Input
            label="Course Title"
            name="title"
            placeholder="Enter Course Title"
            value={formData.title}
            onChange={handleChange}
          />
          <Input
            label="Course Short Description"
            name="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Course Price"
            name="price"
            placeholder="Enter Course Price"
            value={formData.price}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2 text-sm">Course Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-richblack-800 border border-richblack-700 focus:outline-none"
            >
              <option value="">Choose a Category</option>
              <option value="web">Web Development</option>
              <option value="data">Data Science</option>
              <option value="design">Design</option>
            </select>
          </div>

          <Input
            label="Tags"
            name="tags"
            placeholder="Enter Tags and press Enter"
            value={formData.tags}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-yellow-50 text-black font-bold py-2 px-4 rounded-md"
          >
            Save & Continue
          </button>
        </form>
      </div>

      {/* Tips section */}
      <aside className="w-100 bg-richblack-800 p-6 h-fit">
        <h2 className="font-bold text-lg mb-4">⚡ Course Upload Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-richblack-300 text-sm">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024×576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>Add Topics in the Course Builder to create lessons, quizzes, and assignments.</li>
          <li>Information from the Additional Data section shows up on the course single page.</li>
          <li>Make announcements to notify any important updates.</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </aside>
    </div>
  );
}

export default AddCourse;
