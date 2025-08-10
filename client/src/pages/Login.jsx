import React, { useState } from "react";
import LoginImg from "../assets/login.webp";
import Input from "../components/core/Input";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { auth } from "../services/apis";
import { setToken } from "../slices/authSlice";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const loginHandler = async (data) => {
    try {
      const response = await apiConnector("POST", auth.LOGIN_API, {
        email: data.email,
        password: data.password
      });
      dispatch(setUser(response.data.user))
      console.log("login details...", response);
      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      toast.success("Logged in Successfully");
      navigate("/");
    }
    catch (e) {
      console.log(e);
      toast.error(e.response?.data?.message)
    }
  }

  //loginHandler

  return (
    <div className="flex flex-col md:flex-row-reverse max-w-[1080px] mx-auto my-auto items-center justify-between gap-10 py-12 px-4">
      {/* Welcome Section */}
      <div className="w-full md:hidden order-1">
        <h1 className="text-3xl font-bold text-richblack-50">Welcome Back</h1>
        <h2 className="text-pure-greys-25">
          Build skills for today, tomorrow, and beyond.
        </h2>
        <h2 className="font-edu-sa text-blue-200 mb-5">
          Education to future-proof your career.
        </h2>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center order-2">
        <img
          src={LoginImg}
          alt="Login"
          className="max-w-[400px] w-full h-auto object-contain"
        />
      </div>

      {/* Form + Welcome for Desktop */}
      <div className="w-full md:w-1/2 flex flex-col gap-5 order-3">
        {/* Show welcome text only on md+ screens */}
        <div className="hidden md:block">
          <h1 className="text-3xl font-bold text-richblack-50">Welcome Back</h1>
          <h2 className="text-pure-greys-25">
            Build skills for today, tomorrow, and beyond.
          </h2>
          <h2 className="font-edu-sa text-blue-200 mb-5">
            Education to future-proof your career.
          </h2>
        </div>
        <form onSubmit={handleSubmit(loginHandler)} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            type="email"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

          <Input
            label="Password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            type="password"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              className="text-sm text-caribbeangreen-200 hover:underline transition duration-200"
              onClick={() => alert("Redirect to forgot password page")}
            >
              Forgot Password?
            </button>
          </div>
          
            <button className="text-center text-[13px] px-6 py-3 rounded-md font-bold
          bg-yellow-50 text-black
            hover:scale-95 transition-all duration-200"
              type="submit"
            >
              Login
            </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
