import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VscSignOut, VscSettingsGear } from "react-icons/vsc";
import SidebarLink from './SidebarLink';
import ConfirmationModal from '../../common/ConfirmationModal';
import useLogout from '../../../services/logout'
import { sidebarLinks } from '../../../data/sidebar';

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);
  //const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = useLogout();

  const [confirmationModalData, setConfirmationModal] = useState(null);

//   if (profileLoading || authLoading) {
//     return <div className='mt-10'>Loading...</div>;
//   }

  return (
    <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
      <div className='flex flex-col'>
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) {
            return null;
          }
          return <SidebarLink key={link.id} link={link} />;
        })}
      </div>

      <div className='flex flex-col'>
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings", icon:VscSettingsGear }}   
        />

        <button
          onClick={() => setConfirmationModal({
            text1: "Are You Sure?",
            text2: "You will be logged out of your Account",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => dispatch(logout()),
            btn2Handler: () => setConfirmationModal(null),
          })}
          className='text-sm font-medium text-richblack-300 mt-4 px-8'
        >
          <div className='flex items-center gap-x-2'>
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
      </div>

      {confirmationModalData && (
        <ConfirmationModal
          modalData={{
            text1: "Logout?",
            text2: "Are you sure you want to logout.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => {
              setConfirmationModal(false);
              logout();
            },
            btn2Handler: () => {
              setConfirmationModal(null);
            }
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
