import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Course_Card from "./Course_Card";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const CourseSlider = ({ Courses }) => {
  return (
    <div className="w-full">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-gray-400",
            bulletActiveClass: "!bg-teal-500",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center">
                <Course_Card course={course} Height={"h-[250px]"} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500 text-lg py-10">
          No Course Found
        </p>
      )}
    </div>
  );
};

export default CourseSlider;
