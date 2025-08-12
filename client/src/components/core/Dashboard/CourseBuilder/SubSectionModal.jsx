import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import Input from "../../Input";

// Assuming these are your actual paths
import { setCourse } from "../../../../slices/courseSlice";
import IconBtn from "../../../common/IconBtn";
import { apiConnector } from "../../../../services/apiconnector";
import { courses } from "../../../../services/apis";
import Upload from "./Upload";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  // Initialize hooks
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  // Pre-populate form fields on view/edit
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
      setValue("timeDuration",modalData.timeDuration)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if form has been updated
  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  };

  // Handle form submission for creating a new sub-section
  const handleCreateSubSection = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);
    formData.append("timeDuration",data.timeDuration);
    formData.append("token",token)

    try {
      const res = await apiConnector(
        "POST",
        courses.ADD_SUBSECTION_API,
        formData,
        { Authorization: `Bearer ${token}` }
        );
      const result = res.data.updatedSection
      if (result) {
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData ? result : section
        );
        const updatedCourse = { ...course, courseContent: updatedCourseContent };
        dispatch(setCourse(updatedCourse));
      }
    } catch (error) {
      console.error("CREATE SUB-SECTION ERROR:", error);
      toast.error("Failed to create lecture");
    }
    setModalData(null);
    setLoading(false);
  };

  // Handle form submission for editing an existing sub-section
  const handleEditSubSection = async () => {
    // const currentValues = getValues();
    // const formData = new FormData();
    
    // formData.append("sectionId", modalData.sectionId);
    // formData.append("subSectionId", modalData._id);

    // if (currentValues.lectureTitle !== modalData.title) {
    //   formData.append("title", currentValues.lectureTitle);
    // }
    // if (currentValues.lectureDesc !== modalData.description) {
    //   formData.append("description", currentValues.lectureDesc);
    // }
    // if (currentValues.lectureVideo !== modalData.videoUrl) {
    //   formData.append("video", currentValues.lectureVideo);
    // }

    // setLoading(true);
    // try {
    //   const result = await updateSubSection(formData, token);
    //   if (result) {
    //     const updatedCourseContent = course.courseContent.map((section) =>
    //       section._id === modalData.sectionId ? result : section
    //     );
    //     const updatedCourse = { ...course, courseContent: updatedCourseContent };
    //     dispatch(setCourse(updatedCourse));
    //   }
    // } catch (error) {
    //   console.error("EDIT SUB-SECTION ERROR:", error);
    //   toast.error("Failed to update lecture");
    // }
    // setModalData(null);
    // setLoading(false);
  };

  // Main submission handler
  const onSubmit = (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        handleEditSubSection();
      }
      return;
    }

    handleCreateSubSection(data);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto backdrop-blur-md">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
          {/* Lecture Video Upload */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <Input
              label="Lecture Title"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              disabled={view || loading}
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Title is required
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Input
              label="Time Duration"
              placeholder="Enter Lecture Duration"
              {...register("timeDuration", { required: true })}
              disabled={view || loading}
            />
            {errors.timeDuration && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Time Duration is required
              </span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="form-style w-full p-3 rounded-md border border-richblack-5 min-h-[130px] resize-x-none bg-richblack-700"
              disabled={view || loading}
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {!view && (
            <div className="flex justify-end">
              <IconBtn
                type="submit"
                disabled={loading}
                text={
                  loading ? "Loading..." : edit ? "Save Changes" : "Save"
                }
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;