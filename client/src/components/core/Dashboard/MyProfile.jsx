import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="text-white space-y-8 max-w-[900px] mx-auto">
      <h1 className="text-3xl font-medium">My Profile</h1>

      {/* Profile Card */}
      <div className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName ?? 'Add First Name'} {user?.lastName ?? 'Add Last Name'}
            </p>
            <p className="text-sm text-richblack-300">
              {user?.email ?? 'Add Email'}
            </p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onClick={() => navigate('/dashboard/settings')}
        >
          <FiEdit className="text-lg" />
        </IconBtn>
      </div>

      {/* About Card */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate('/dashboard/settings')}
          >
            <FiEdit className="text-lg" />
          </IconBtn>
        </div>
        <p
          className={`text-sm font-medium ${
            user?.additionalDetails?.about
              ? 'text-richblack-5'
              : 'text-richblack-400'
          }`}
        >
          {user?.additionalDetails?.about ?? 'Add About'}
        </p>
      </div>

      {/* Personal Details Card */}
      <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate('/dashboard/settings')}
          >
            <FiEdit className="text-lg" />
          </IconBtn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
          <DetailItem label="First Name" value={user?.firstName ?? 'Add First Name'} />
          <DetailItem label="Last Name" value={user?.lastName ?? 'Add Last Name'} />
          <DetailItem label="Email" value={user?.email ?? 'Add Email'} />
          <DetailItem
            label="Contact Number"
            value={user?.additionalDetails?.contactNumber ?? 'Add Contact Number'}
          />
          <DetailItem
            label="Gender"
            value={user?.additionalDetails?.gender ?? 'Add Gender'}
          />
          <DetailItem
            label="Date of Birth"
            value={user?.additionalDetails?.dateOfBirth ?? 'Add Date of Birth'}
          />
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="mb-1 text-sm text-richblack-400">{label}</p>
    <p className="text-sm font-medium text-richblack-5">{value}</p>
  </div>
);

export default MyProfile;
