import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Input from '../../Input';
import { courses } from '../../../../services/apis';
import {apiConnector} from '../../../../services/apiconnector'
import { setCourse,setEditCourse,setStep } from '../../../../slices/courseSlice';
import {setLoader} from '../../../../slices/loaderSlice';
import NestedView from './NestedView';


const CourseBuilder = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course)

  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    console.log("jsd")
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one Section");
      return;
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const onSubmit = async (data) => {
  dispatch(setLoader(true));

  try {
    let result;

    if (editSectionName) {
      // Updating an existing section
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
        },
        token
      );
      toast.success("Section updated successfully")
    } else {
      // Creating a new section
      const formData = new FormData();
      formData.append("courseId", course._id);
      formData.append("sectionName", data.sectionName);
      formData.append("token", token);

      result = await apiConnector(
        "POST",
        courses.ADD_SECTION_API,
        formData
      );
      toast.success("Section created successfully")
    }
    dispatch(setCourse(result.data.updatedCourseDetails));
    // console.log("Section operation successful:", result);
    } catch (error) {
      console.error("Error in section operation:", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoader(false));
    }
  };


  return (
    <div className="p-6 bg-richblack-800 rounded-lg shadow-md text-white space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-richblack-5">
        Course Builder
      </h2>
      <p className="text-richblack-200 text-sm">
        Add sections and lectures to structure your course content.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Input
            label="Section Name"
            id="sectionName"
            placeholder="Enter section name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-200"
          />
          {errors.sectionName && (
            <span className="text-pink-200 text-sm">Section Name is required</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <MdAddCircleOutline className="text-yellow-50" size={20} />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm underline text-richblack-200 hover:text-pink-200 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Sections view */}
      {course?.courseContent?.length > 0 && (
        <div className="border-t border-richblack-700 pt-4">
          <NestedView
          View course={course} />
        </div>
      )}

      {/* Footer navigation */}
      <div className="flex justify-end gap-3 border-t border-richblack-700 pt-4">
        <button
          onClick={goBack}
          className="rounded-md px-4 py-2 text-richblack-200 hover:text-white transition-colors"
        >
          Back
        </button>
        <IconBtn text="Next" onClick={goToNext} />
      </div>
    </div>
  );
};

export default CourseBuilder;
