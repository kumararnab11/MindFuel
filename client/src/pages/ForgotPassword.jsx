import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../slices/loaderSlice';
import { apiConnector } from '../services/apiconnector';
import { auth } from '../services/apis';
import { Link } from 'react-router-dom';
import Input from '../components/core/Input';
import { IoIosArrowRoundBack } from "react-icons/io";


const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  const handler = async(e)=>{
    try{
        e.preventDefault();
        dispatch(setLoader(true));
        const res= await apiConnector("POST", auth.RESET_TOKEN_API,{email});

        if(!res.data.success){
            toast.error(res.data.message);
        }

        toast.success("Mail sent successfully");
        setEmailSent(true);
        dispatch(setLoader(false));
    }
    catch(e){
        toast.error(e.data.message||"Something went wrong");
    }
  }

  return (
    <div className='text-richblack-5 max-w-[360px] flex flex-col items-center mx-auto my-auto'>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <h1 className="text-2xl my-[5px]">
            {!emailSent ? 'Reset your Password' : 'Check Your Email'}
          </h1>
          <h2 className='my-[10px]'>
            {!emailSent
              ? 'Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery'
              : `We have sent the reset email to ${email}`}
          </h2>
          <form onSubmit={handler}>
            {!emailSent && (
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  setInputValue={setEmail}
                  placeholder="Enter Your Email Address"
                />
            )}
            <button type="submit" className="text-center my-[10px] text-[13px] px-6 py-3 rounded-md font-bold
            bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
>
              {!emailSent ? 'Reset Password' : 'Resend Email'}
            </button>
          </form>
          <div>
            <Link to="/login">
                <div className='flex flex-row items-center gap-1'>
                    <IoIosArrowRoundBack/>
                    <p>Back to login</p>
                </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;