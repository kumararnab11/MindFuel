import React from 'react'
import { useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiconnector';
import { courses } from '../../../services/apis';
import { resetCourseState, setCourse, setStep } from '../../../slices/courseSlice';
import {toast} from 'react-hot-toast'

function Publish() {
  const dispatch = useDispatch()
  const {course} = useSelector((state)=>state.course)
  const {token}=useSelector((state)=>state.auth);
  const {register,handleSubmit}=useForm();

  const onSubmit = async (data)=>{
    if((course.status=="Draft" && data.checkBox == false) || (course.status=="Published" && data.checkBox == true)){
      toast("No Changes Made");
      //navigate
      return;
    }

    const formData = new FormData();

    formData.append("courseId",course._id);
    formData.append("status",data.checkBox?"Published":"Draft");

    try{
      const res= await apiConnector("PUT",courses.UPDATE_COURSE_API,formData,
        { Authorization: `Bearer ${token}` }
      );
      dispatch(setCourse(res.data.updatedCourse));
      dispatch(resetCourseState())
      dispatch(setStep(1));
      toast.success("Course Updatation Successful")
    }
    catch{
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="bg-richblack-800 p-4 rounded">
      <h2 className="text-white text-lg font-semibold mb-2">Publish Settings</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="flex items-center space-x-2 text-gray-400">
        <input 
          type="checkbox" 
          {...register("checkBox")}
        />
        <span>Make this course as public</span>
        </label>
        <div className="mt-4 flex space-x-2">
          <button className="bg-richblack-700 text-white px-4 py-2 rounded">Back</button>
          <button className="bg-yellow-50 text-black px-4 py-2 rounded" type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  )
}

export default Publish