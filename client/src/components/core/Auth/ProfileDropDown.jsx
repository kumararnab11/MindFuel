import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import useLogout from "../../../services/logout";
import ConfirmationModal from "../../common/ConfirmationModal";

function ProfileDropDown() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const logout = useLogout();

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".profile-dropdown")) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpenModal(true);
  };

  return (
    <div className="relative profile-dropdown">
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
          <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white text-sm uppercase font-semibold">
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
            className="text-richblack-300 w-full text-left px-4 py-2 hover:bg-richblack-700 transition-colors duration-200 flex gap-2 items-center"
          >
            <MdDashboard /> Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-richblack-300 w-full text-left px-4 py-2 hover:bg-richblack-700 transition-colors duration-200 flex gap-2 items-center"
          >
            <RiLogoutBoxRLine /> Logout
          </button>
        </div>
      )}

      {/* Confirmation Modal */}
      {openModal && (
        <ConfirmationModal
          modalData={{
            text1: "Logout?",
            text2: "Are you sure you want to logout.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => {
              setOpenModal(false);
              logout();
            },
            btn2Handler: () => {
              setOpenModal(false);
            },
          }}
        />
      )}
    </div>
  );
}

export default ProfileDropDown;
