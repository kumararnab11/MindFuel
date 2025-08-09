import React from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Icons from "react-icons/vsc"; // Keep this import for dynamic icon rendering based on the name string.

const SidebarLink = ({ link}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Dynamically get the icon component from the imported Icons object
  const Icon = link.icon;

  // Helper function to check if the current route matches the link path
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        } transition-all duration-200`}
      ></span>
      <div className='flex items-center gap-x-2 text-richblack-100'>
        {/* Render the icon component */}
        {Icon && <Icon className="text-lg text-richblack-100" />} 
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;