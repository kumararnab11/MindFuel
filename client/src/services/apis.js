const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  COURSES_API: BASE_URL + '/course/getCategoryPageDetails'
};

export const auth = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/signup",
  RESET_TOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
  SEND_OTP_API:BASE_URL + "/auth/sendotp",
  LOGOUT_API:BASE_URL+'/auth/logout'
}

export const profile = {
  UPDATE_PROFILE:BASE_URL+"/profile/update-profile"
}

export const courses = {
  ADD_COURSE_API:BASE_URL+"/course/createCourse",
  ADD_SECTION_API: BASE_URL + "/course/addSection",
  DELETE_SECTION_API:BASE_URL+'/course/deleteSection',
  ADD_SUBSECTION_API:BASE_URL+'/course/addSubSection',
  DELETE_SUBSECTION_API:BASE_URL+'/course/deleteSubSection',
  UPDATE_COURSE_API:BASE_URL+'/course/editCourse',
  GET_COURSES_BY_INSTRUCTOR_ID: BASE_URL + '/course/getCoursesByInstructor',
  DELETE_COURSE: BASE_URL+'/course/deleteCourse'
}