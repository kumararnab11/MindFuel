import React, { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { courses } from "../services/apis";
import { formatDate } from "../utils/dateFormatter";
import ToggleSection from '../components/core/CoursePage/ToggleSection'
import {useDispatch} from 'react-redux'
import { addToCart } from "../slices/cartSlice";
import toast from "react-hot-toast";

const CoursePage = () => {
  const dispatch = useDispatch();
  const {courseId}=useParams();
  const [course,setCourse]=useState(null);
  const [loading,setLoading]=useState(true);

  const handleCart = () => {
    if (!course) return;

    dispatch(addToCart({
      id: courseId,
      image: course.thumbnail,
      price: course.price,
      instructor: `${course?.instructor?.firstName || ""} ${course?.instructor?.lastName || ""}`,
      name: course.courseName,
    }));
    toast.success("Course added to cart!");
  };

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetails = async () => {
      try {
        const res = await apiConnector(
          "POST",
          courses.GET_COURSE_DETAILS_API,
          { courseId }
        );
        console.log(res.data.data[0]);
        setCourse(res.data.data[0]);
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
      finally{
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);


  if (loading) {
    return (
      <div className="bg-richblack-900 text-white p-6">
        Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bg-richblack-900 text-white p-6">
        No course data found.
      </div>
    );
  }


  return (
    <div className="bg-richblack-900 min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mt-12">{course.courseName}</h1>
          <p className="text-richblack-300 mt-1">{course.courseDescription}</p>

          {/* Rating & Meta */}
          <div className="flex items-center gap-2 mt-2 text-yellow-50">
            <span>4.1</span>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
            <span className="text-richblack-300">(10 reviews)</span>
            <span className="text-richblack-300 ml-4">{course.studentsEnrolled.length} students enrolled</span>
          </div>

          <p className="my-5 text-sm text-richblack-300">
            Created By <span className="text-yellow-300">{`${course.instructor.firstName} ${course.instructor.lastName}`}</span>
          </p>
          <p className="text-sm text-richblack-300">
            {`📅 Created at ${formatDate(course.createdAt)}`}
          </p>

          {/* What you'll learn */}
          <div className="mt-6 border border-richblack-700 p-4 rounded-md">
            <h2 className="text-lg font-semibold">What you'll learn</h2>
            <p className="text-richblack-300 mt-2">Voluptate quod quam</p>
          </div>

          {/* Course Content */}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Course Content</h2>
              <button className="text-yellow-400 text-sm">Collapse all sections</button>
            </div>
            <p className="text-richblack-300 text-sm mt-1">
              2 section(s) 2 lecture(s) 10s total length
            </p>

            <div className="mt-4 border border-richblack-700 rounded-md">              
              <ToggleSection courseContent={course.courseContent}/>
            </div>
          </div>

          {/* Author */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Author</h2>
            <p className="mt-2">✏️ Soumya Banerjee</p>
            <p className="text-richblack-300 text-sm">Developer</p>
          </div>
        </div>

        {/* Right Card */}
        <div className="w-full lg:w-80 bg-richblack-800 p-4 rounded-md h-fit">
          <img
            src={course.thumbnail}
            alt="My Course"
            className="w-full h-40 object-cover rounded-md"
          />
          <p className="text-2xl font-bold mt-4">{`Rs. ${course.price}`}</p>
          <button className="bg-yellow-400 w-full py-2 rounded-md font-semibold mt-3 text-black">
            Buy Now
          </button>
          <button className="bg-richblack-900 w-full py-2 rounded-md font-semibold mt-2 border border-richblack-700" onClick={handleCart}>
            Add to Cart
          </button>
          <p className="text-sm text-richblack-300 text-center mt-2">
            30-Day Money-Back Guarantee
          </p>

          <div className="mt-4">
            <p className="font-semibold">This Course Includes :</p>
            <div className="flex items-center text-green-400 mt-1">
              <IoIosArrowForward />
              <span>Numquam officiis nihil</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-blue-400 mt-4 cursor-pointer">
            <FaShareAlt /> <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
