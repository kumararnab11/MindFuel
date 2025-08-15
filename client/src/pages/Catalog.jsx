import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { categories } from "../services/apis";
import Course_Card from "../components/core/Catalog/Course_Card";

export const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState("popular");

  const handleClick = (type) => {
    setActive(type);
    //onSortChange(type);
  };

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.allCategories?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]?._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await apiConnector("POST", categories.COURSES_API, {
          categoryId,
        });
        console.log(res.data)
        setCatalogPageData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className="bg-richblack-900 text-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-sm text-richblack-300 mb-2">
          Home / Catalog /{" "}
          <span className="text-yellow-50">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <h1 className="text-3xl font-bold mb-2">
          {catalogPageData?.data?.selectedCategory?.name}
        </h1>
        <p className="text-richblack-200 text-lg max-w-3xl">
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>

      {/* Section 1 */}
      <section className="bg-richblack-800 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">
            Courses to get you started
          </h2>
          <div className="flex gap-x-6 mb-6 border-b border-richblack-600">
            <button
              onClick={() => handleClick("popular")}
              className={`pb-2 text-sm font-medium transition-colors duration-200 ${
                active=== "popular"
                  ? "text-yellow-100 border-b-2 border-yellow-100"
                  : "text-richblack-200 border-b-2 border-transparent hover:text-richblack-50"
              }`}
            >
              Most Popular
            </button>

            {/* New */}
            <button
              onClick={() => handleClick("new")}
              className={`pb-2 text-sm font-medium transition-colors duration-200 ${
                active === "new"
                  ? "text-yellow-100 border-b-2 border-yellow-100"
                  : "text-richblack-200 border-b-2 border-transparent hover:text-richblack-50"
              }`}
            >
              New
            </button>
          </div>
          <CourseSlider
            Courses={catalogPageData?.data?.topSellingCourses || []}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">
            Top courses in {catalogPageData?.data?.selectedCategory?.name}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {catalogPageData?.data?.selectedCategory?.course?.length > 0 ? (
              catalogPageData.data.selectedCategory.course.map((course, index) => (
                <Course_Card key={index} course={course} Height="h-[250px]" />
              ))
            ) : (
              <p className="col-span-full text-gray-500">No Course Found</p>
            )}
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-richblack-800 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Frequently Bought</h2>
          <CourseSlider Courses={catalogPageData?.data?.topSellingCourses || []} />
        </div>
      </section>
    </div>
  );
};
