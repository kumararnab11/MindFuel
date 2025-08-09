import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import Navbar from '../components/common/Navbar';

const Dashboard = () => {
  // Correctly destructure the loading state from the auth and profile slices
//   const { loading: authLoading } = useSelector((state) => state.auth);
//   const { loading: profileLoading } = useSelector((state) => state.profile);

  // Check if either of the loading states is true
//   if (profileLoading || authLoading) {
//     return (
//       <div className='mt-10'>
//         Loading...
//       </div>
//     );
//   }

  return (
    <div>
        <Navbar />
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <main className="flex-1 h-[calc(100vh-3.5rem)] overflow-auto">
            <div className="mx-auto w-full max-w-[1000px] py-10 px-4">
            <Outlet />
            </div>
        </main>
        </div>
    </div>
   );
};

export default Dashboard