import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { MdOutlineRefresh } from "react-icons/md";
import { IoIosArrowRoundBack } from 'react-icons/io';
import toast from 'react-hot-toast';
import { setLoader } from '../slices/loaderSlice';
import { auth } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import Input from '../components/core/Input';

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loader);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const token = pathParts[pathParts.length - 1];

  const handler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoader(true));
      const res = await apiConnector("POST", auth.RESET_PASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        dispatch(setLoader(false));
        return;
      }

      toast.success("Password reset successfully");
      navigate('/login');
    } catch (e) {
        console.log(e);
      toast.error(e.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className='text-richblack-5 max-w-[360px] flex flex-col items-center mx-auto my-auto'>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <h1 className="text-2xl my-[5px]">Choose a new password</h1>
          <h2 className='my-[10px]'>
            Almost done, enter your new password and you’re all set
          </h2>
          <form onSubmit={handler}>
            <Input
              label="New password"
              type="password"
              value={password}
              setInputValue={setPassword}
              placeholder="Enter your new password"
            />
            <Input
              label="Confirm password"
              type="password"
              value={confirmPassword}
              setInputValue={setConfirmPassword}
              placeholder="Enter your new password"
            />
            <button
              type="submit"
              className="text-center my-[10px] text-[13px] px-6 py-3 rounded-md font-bold
              bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
            >
              Confirm
            </button>
          </form>
          <div className='flex flex-row justify-between w-full mt-4'>
            <Link to="/login">
              <div className='flex flex-row items-center gap-1'>
                <IoIosArrowRoundBack />
                <p>Back to login</p>
              </div>
            </Link>
            <div className='flex flex-row items-center gap-1'>
              <MdOutlineRefresh />
              <button>Resend Otp</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
