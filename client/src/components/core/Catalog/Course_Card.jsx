import React, { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { Link, useNavigate } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";

const Course_Card = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div className="p-3">
      <Link to={`/courses/${course._id}`}>
        <div className="bg-richblack-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full object-cover`}
            />
          </div>

          {/* Course Details */}
          <div className="p-4 flex flex-col gap-2">
            {/* Title */}
            <p className="text-lg font-semibold text-richblack-5 line-clamp-2">
              {course?.courseName}
            </p>

            {/* Instructor */}
            <p className="text-sm text-pure-greys-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium text-yellow-500">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-gray-400">
                ({course?.ratingAndReviews?.length || 0} Ratings)
              </span>
            </div>

            {/* Price */}
            <p className="text-base font-bold text-gray-900">
              ₹{course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
