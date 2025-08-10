// import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../Input";
import toast from "react-hot-toast";
import { setLoader } from "../../../slices/loaderSlice";
import { apiConnector } from "../../../services/apiconnector";
import { profile } from "../../../services/apis";
import { setUser } from "../../../slices/userSlice";
import { useForm } from "react-hook-form"

const Settings = () => {
  const { user } = useSelector((state) => state.user);
  // const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  }= useForm({
    defaultValues:{
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
      gender: user?.additionalDetails?.gender||"",
      contactNumber: user?.additionalDetails?.contactNumber||"",
      about: user?.additionalDetails?.about||""
    }
  });

  const handleSave = async (data) => {

    dispatch(setLoader(true));
    try {

      const res = await apiConnector(
        "PUT",
        profile.UPDATE_PROFILE,
        {
          token: user.token, // body token
          dateOfBirth:data.dateOfBirth,
          gender:data.gender,
          contactNumber:data.contactNumber,
          about:data.about
        },
        {
          Authorization: `Bearer ${user.token}`, // header token
        }
      );

    //   console.log(res);
    //   console.log(user);
      dispatch(setUser({
        ...user,
        additionalDetails:res.data.profileDetails
      }))

      toast.success(res.data?.message || "Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Profile update failed");
      console.error(err.response?.data || err.message);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <form action="" onSubmit={handleSubmit(handleSave)}>

        <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-50">
            Edit Profile
          </h1>

          {/* Profile Information Section */}
          <div className="p-6 bg-gray-700 rounded-xl mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <Input
                label="First Name"
                placeholder="Enter first name"
                type="text"
                disabled={true}
                {...register("firstName")}
              />
              <Input
                label="Last Name"
                placeholder="Enter last name"
                type="text"
                disabled={true}
                {...register("lastName")}
              />
              <Input
                label="Date of Birth"
                placeholder="dd/mm/yyyy"
                type="text"
                {...register("dateOfBirth",
                  { required: "Please enter your Date of Birth"}
                )}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth.message}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-50 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  className="bg-richblack-700 placeholder-pure-greys-300 w-full px-4 py-2 border border-b-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50"
                  {...register("gender", {required: "Please select your Gender"})}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
              </div>
              <Input
                label="Contact Number"
                placeholder="Enter Contact Number"
                type="tel"
                {...register("contactNumber",
                  {
                    required: "Please enter your Contact Number",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a Valid Contact Number"
                    }
                  }
                )}
              />
              {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber.message}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-50 mb-1">
                  About
                </label>
                <textarea
                  className="bg-richblack-700 placeholder-pure-greys-300 w-full px-4 py-2 border border-b-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50 resize-y"
                  placeholder="About yourself"
                  rows="4"
                  {...register("about")}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              className="bg-gray-600 hover:bg-richblack-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            <button type="submit" 
              className="bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              // onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving...": "Save"}
            </button>

            {/* <button
              className="bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button> */}
            
          </div>
        </div>

      </form>
    </div>
  );
};

export default Settings;



// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Input from "../Input";
// import toast from "react-hot-toast";
// import { setLoader } from "../../../slices/loaderSlice";
// import { apiConnector } from "../../../services/apiconnector";
// import { profile } from "../../../services/apis";
// import { setUser } from "../../../slices/userSlice";

// const Settings = () => {
//   const { user } = useSelector((state) => state.user);
//   const { loading } = useSelector((state) => state.loader);
//   const dispatch = useDispatch();

//   const [firstName] = useState(user?.firstName || "");
//   const [lastName] = useState(user?.lastName || "");
//   const [dateOfBirth, setDateOfBirth] = useState(user?.additionalDetails?.dateOfBirth||"");
//   const [gender, setGender] = useState(user?.additionalDetails?.gender||"");
//   const [contactNumber, setContactNumber] = useState(user?.additionalDetails?.contactNumber||"");
//   const [about, setAbout] = useState(user?.additionalDetails?.about||"");

//   const handleSave = async () => {
//     if (!gender || !contactNumber) {
//       toast.error("Gender and Contact Number are required");
//       return;
//     }

//     dispatch(setLoader(true));
//     try {
//       const bodyData = {
//         dateOfBirth,
//         gender,
//         contactNumber,
//         about,
//       };

//       const res = await apiConnector(
//         "PUT",
//         profile.UPDATE_PROFILE,
//         {
//           token: user.token, // body token
//           dateOfBirth:bodyData.dateOfBirth,
//           gender:bodyData.gender,
//           contactNumber:bodyData.contactNumber,
//           about:bodyData.about
//         },
//         {
//           Authorization: `Bearer ${user.token}`, // header token
//         }
//       );

//     //   console.log(res);
//     //   console.log(user);
//       dispatch(setUser({
//         ...user,
//         additionalDetails:res.data.profileDetails
//       }))

//       toast.success(res.data?.message || "Profile updated successfully");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Profile update failed");
//       console.error(err.response?.data || err.message);
//     } finally {
//       dispatch(setLoader(false));
//     }
//   };

//   return (
//     <div className="flex justify-center items-start min-h-screen bg-gray-900 text-white p-4 sm:p-8">
//       <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-50">
//           Edit Profile
//         </h1>

        // {/* Profile Information Section */}
//         <div className="p-6 bg-gray-700 rounded-xl mb-10">
//           <h2 className="text-xl sm:text-2xl font-semibold mb-6">
//             Profile Information
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
//             <Input
//               label="First Name"
//               placeholder="Enter first name"
//               inputValue={firstName
//               setInputValue={() => {}}
//               type="text"
//               disabled={true}
//             />
//             <Input
//               label="Last Name"
//               placeholder="Enter last name"
//               inputValue={lastName}
//               setInputValue={() => {}}
//               type="text"
//               disabled={true}
//             />
//             <Input
//               label="Date of Birth"
//               placeholder="dd/mm/yyyy"
//               inputValue={dateOfBirth}
//               setInputValue={setDateOfBirth}
//               type="text"
//             />
//             <div>
//               <label className="block text-sm font-medium text-gray-50 mb-1">
//                 Gender <span className="text-red-500">*</span>
//               </label>
//               <select
//                 className="bg-richblack-700 placeholder-pure-greys-300 w-full px-4 py-2 border border-b-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50"
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//             <Input
//               label="Contact Number"
//               placeholder="Enter Contact Number"
//               inputValue={contactNumber}
//               setInputValue={setContactNumber}
//               type="tel"
//             />
//             <div>
//               <label className="block text-sm font-medium text-gray-50 mb-1">
//                 About
//               </label>
//               <textarea
//                 className="bg-richblack-700 placeholder-pure-greys-300 w-full px-4 py-2 border border-b-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50 resize-y"
//                 placeholder="About yourself"
//                 value={about}
//                 onChange={(e) => setAbout(e.target.value)}
//                 rows="4"
//               ></textarea>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-4 mt-8">
//           <button
//             className="bg-gray-600 hover:bg-richblack-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
//             onClick={() => {
//               setDateOfBirth("");
//               setGender("");
//               setContactNumber("");
//               setAbout("");
//             }}
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             className="bg-yellow-50 hover:bg-yellow-100 text-richblack-900 font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
//             onClick={handleSave}
//             disabled={loading}
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings; 
