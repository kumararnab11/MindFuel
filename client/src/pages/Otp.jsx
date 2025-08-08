import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { MdOutlineRefresh } from 'react-icons/md';
import { sendOtpApi } from '../services/sendOtpApi';
import { apiConnector } from '../services/apiconnector';
import { auth } from '../services/apis';
import { setSignupData } from '../slices/authSlice';
import { setLoader } from '../slices/loaderSlice';

const Otp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { signUpData } = useSelector((state) => state.auth); 

  useEffect(() => {
    if (!signUpData) {
      toast.error("Failed to fetch signup data. Redirecting...");
      navigate('/signup');
    }
  }, []); 

  const sendOtp = () => {
    dispatch(sendOtpApi({ email: signUpData?.email, navigate }));
  };

  const submitHandler = async (e) => {
    e.preventDefault(); 

    dispatch(setLoader(true));

    try {
      const dataToSubmit = { ...signUpData, otp };
      
      const res = await apiConnector("POST", auth.SIGNUP_API, dataToSubmit);

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      
      toast.success("Signup Successful!");
      dispatch(setSignupData(null)); 
      navigate("/login"); 
    } catch (error) {
      console.error("SIGNUP_API_ERROR...", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-richblack-900 text-richblack-5">
      {loading ? (
        <div className="text-xl">Loading...</div>
      ) : (
        <div className="p-8 rounded-lg shadow-lg bg-richblack-800 max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-2 text-center">Verify Email</h1>
          <p className="text-richblack-300 mb-6 text-center">A verification code has been sent to you. Enter the code below</p>
          <form onSubmit={submitHandler}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  className="min-w-[30px] h-10 bg-richblack-700 text-center rounded-md text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-50"
                />
              )}
              containerStyle="flex justify-between"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full text-center mt-6 py-2 rounded-md font-bold text-richblack-900
              bg-yellow-50 hover:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              Verify
            </button>
          </form>
          <div className='flex justify-between w-full mt-4'>
            {/* The link should go to the login page */}
            <Link to="/login"> 
              <div className='flex items-center gap-1 text-richblack-25 hover:text-richblack-5 transition-colors duration-200'>
                <IoIosArrowRoundBack />
                <p>Back to login</p>
              </div>
            </Link>
            <div
              className='flex items-center gap-1 text-richblack-25 hover:text-richblack-5 transition-colors duration-200 cursor-pointer'
              onClick={sendOtp}
            >
              <MdOutlineRefresh />
              <button>Resend Otp</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Otp;