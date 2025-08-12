// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//   step: 1,
//   course: null,
//   editCourse: false,
//   paymentLoading: false,
// }

// const courseSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {
//     setStep: (state, action) => {
//       state.step = action.payload
//     },
//     setCourse: (state, action) => {
//       state.course = action.payload
//     },
//     setEditCourse: (state, action) => {
//       state.editCourse = action.payload
//     },
//     setPaymentLoading: (state, action) => {
//       state.paymentLoading = action.payload
//     },
//     resetCourseState: (state) => {
//       state.step = 1
//       state.course = null
//       state.editCourse = false
//     },
//   },
// })

// export const { setStep, setCourse, setEditCourse, setPaymentLoading, resetCourseState } = courseSlice.actions

// export default courseSlice.reducer



import { createSlice } from "@reduxjs/toolkit";

const savedState = localStorage.getItem("courseState")
  ? JSON.parse(localStorage.getItem("courseState"))
  : {
      step: 1,
      course: null,
      editCourse: false,
      paymentLoading: false,
    };

const courseSlice = createSlice({
  name: "course",
  initialState: savedState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
      localStorage.setItem("courseState", JSON.stringify(state));
    },
    setCourse: (state, action) => {
      state.course = action.payload;
      localStorage.setItem("courseState", JSON.stringify(state));
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
      localStorage.setItem("courseState", JSON.stringify(state));
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
      localStorage.setItem("courseState", JSON.stringify(state));
    },
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
      state.paymentLoading = false;
      localStorage.removeItem("courseState");
    },
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;

