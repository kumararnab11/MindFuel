import React, { useState } from "react";
import Steps from './Steps'

function AddCourse() {

  return (
    <div className="flex w-full gap-[10px] min-h-screen bg-richblack-900 text-white justify-between">
      {/* Main content */}
      
      <div className="flex w-full flex-col">
        <h1 className="text-richblack-5 font-3xl text-3xl m-3">Add Course</h1>
        <Steps/>
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
