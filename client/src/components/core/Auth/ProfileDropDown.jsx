import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../slices/userSlice";
import { removeToken } from "../../../slices/authSlice"; // assuming you have a token slice
import { MdDashboard } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import useLogout from "../../../services/logout";

function ProfileDropDown() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const logout = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full focus:outline-none"
      >
        {user?.image ? (
          <img
            src={user.image}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white text-sm uppercase">
            {user?.firstName?.charAt(0) || "U"}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-richblack-800 text-white rounded-md shadow-lg z-20">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
              setOpen(false);
            }}
            className="text-richblack-300 w-full text-left px-4 py-2 hover:bg-richblack-700 flex gap-2 items-center"
          >
            <MdDashboard/> Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-richblack-300 w-full text-left px-4 py-2 hover:bg-richblack-700 flex gap-2 items-center"
          >
            <RiLogoutBoxRLine/> Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
