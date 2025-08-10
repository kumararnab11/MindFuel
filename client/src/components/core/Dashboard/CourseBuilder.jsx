import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconBtn from './../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Input from '../Input';

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
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
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token);
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      });
    }
    setLoading(false);
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
          <NesteDView />
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
        <IconBtn text="Next" onclick={goToNext} />
      </div>
    </div>
  );
};

export default CourseBuilderForm;
