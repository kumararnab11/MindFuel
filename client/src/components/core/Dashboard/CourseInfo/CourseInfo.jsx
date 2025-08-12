import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import {toast} from 'react-hot-toast'
import { setCourse, setStep } from "../../../../slices/courseSlice"
import Input from "../../Input"
import RequirementField from "./RequirementField"
import TagInput from "./TagInput"
import ThumbnailUploader from '../ThumbnailUploader'
import { courses,categories } from "../../../../services/apis"
import { apiConnector } from "../../../../services/apiconnector"

const CourseInfo = () => {

  const dispatch = useDispatch()
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
  const {token} = useSelector((state)=>state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: editCourse ? {
      courseTitle: course.courseName,
      courseShortDesc: course.courseDescription,
      coursePrice: course.price,
      courseTags: course.tag,
      courseBenefits: course.whatYouWillLearn,
      courseCategory: course.category,
      courseRequirements: course.instructions,
      courseImage: course.thumbnail
    } : {}
  });

  const getCategories = async () => {
    setLoading(true);
    const res = await apiConnector("GET",categories.CATEGORIES_API);
    if (res.data.allCategories.length > 0) {
      setCourseCategories(res.data.allCategories);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []); 



//     if (editCourse) {
//       setValue("courseTitle", course.courseName)
//       setValue("courseShortDesc", course.courseDescription)
//       setValue("coursePrice", course.price)
//       setValue("courseTags", course.tag)
//       setValue("courseBenefits", course.whatYouWillLearn)
//       setValue("courseCategory", course.category)
//       setValue("courseRequirements", course.instructions)
//       setValue("courseImage", course.thumbnail)
//     }
//     getCategories()
//   }, [])



  const onSubmit = async (data) => {
    try {
      setLoading(true);

      //console.log("FORM SUBMIT DATA:", data); // helpful for debugging

      // pick thumbnail file whether it's FileList or single File
      const thumbnailCandidate = data.thumbnail ?? getValues("thumbnail");
      const thumbnailFile = thumbnailCandidate?.[0] ?? thumbnailCandidate ?? null;

      if (!thumbnailFile) {
        // you may want to show a toast / set an error instead
        console.error("No thumbnail provided");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("category", data.courseCategory);
      formData.append("thumbnail", thumbnailFile); // File object

      // Arrays must be stringified because we're using FormData
      formData.append("tag", JSON.stringify(data.tags || []));
      formData.append("whatYouWillLearn", data.courseBenefits || "");
      // instruction in backend schema is singular; send accordingly
      formData.append("instruction", JSON.stringify(data.courseRequirements || []));
      formData.append("token",token);
      // POST request — do NOT set Content-Type (let axios set boundary)
      const res = await apiConnector(
        "POST",
        courses.ADD_COURSE_API,
        formData,
      );

      if (res?.data?.success) {
        console.log("Course created:", res.data);
        dispatch(setStep(2));
        dispatch(setCourse(res.data.newCourse));
      } else {
        console.error("Create failed:", res?.data?.message);
      }
      toast.success("Data saved successfully")
    } catch (err) {
      toast.error( err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Course Title */}
        <div>
          <Input
            label="Course Title"
            placeholder="Enter Course Title"
            type="text"
            {...register("courseTitle", { required: true })}
          />
          {errors.courseTitle && <span className="text-red-500">Course Title Required**</span>}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-50 mb-1">
            Course Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className="bg-richblack-700 placeholder-pure-greys-300 w-full px-4 py-2 border border-b-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[140px]"
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
          />
          {errors.courseShortDesc && (
            <span className="text-red-500">Course Description is required**</span>
          )}
        </div>

        {/* Price */}
        <div>
          <Input
            label="Course Price"
            placeholder="Enter Course Price"
            type="text"
            {...register("coursePrice", { required: true })}
          />
          {errors.coursePrice && <span className="text-red-500">Course Price is Required</span>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-50 mb-1">
            Course Category <span className="text-red-500">*</span>
          </label>
          <select
            className="bg-richblack-700 w-full px-4 py-2 border border-b-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue=""
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>Choose a Category</option>
            {!loading &&
              courseCategories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && <span className="text-red-500">Course Category is Required</span>}
        </div>

        {/* Thumbnail Uploader */}
        <ThumbnailUploader
          label="Course Thumbnail"
          name="thumbnail"
          setValue={setValue}
          errors={errors}
        />

        <TagInput
          name="tags"
          label="Tags"
          register={register}
          errors={errors}
          setValue={setValue}
        />

        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-50 mb-1">
            Benefits of the course <span className="text-red-500">*</span>
          </label>
          <textarea
            className="bg-richblack-700 placeholder-pure-greys-300 w-full px-4 py-2 border border-b-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[130px]"
            placeholder="Enter Benefits of the course"
            {...register("courseBenefits", { required: true })}
          />
          {errors.courseBenefits && (
            <span className="text-red-500">Benefits of the course are required**</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md font-semibold hover:scale-105 transition-transform"
        >
          Next
        </button>
      </form>
    </div>
  )
}

export default CourseInfo
