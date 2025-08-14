import React, { useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from "react-icons/md";
import ConfirmationModal from '../../common/ConfirmationModal'
import { apiConnector } from '../../../services/apiconnector';
import { useSelector } from 'react-redux';
import { courses } from '../../../services/apis';
import {toast} from 'react-hot-toast'

function CoursesTable({coursess,setCourses}) {
    const {token} = useSelector((state)=>state.auth)
    const [confirmationModal,setConfirmationModal]=useState(null)
    const handleCourseDelete = async (courseId) => {
        try {
            const res = await apiConnector(
            "POST",
            courses.DELETE_COURSE ,
            {courseId},
            { Authorization: `Bearer ${token}` }
            );

            if (res.data.success) {
            toast.success(res.data.message || "Course deleted successfully");
            const updatedCourses = coursess.filter((c)=>c._id!=courseId)
            setCourses(updatedCourses)
            } else {
            toast.error(res.data.message || "Failed to delete course");
            }
        } catch (error) {
                console.error("Course delete error:", error);
                toast.error("Something went wrong while deleting the course");
        } finally {
                setConfirmationModal(null);
        }
    };

  return (
    <div>
        <Table className="min-w-full">
            <Thead>
              <Tr className="border-b border-gray-700">
                <Th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Course</Th>
                <Th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</Th>
                <Th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</Th>
                <Th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</Th>
                <Th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</Th>
              </Tr>
            </Thead>
            <Tbody className="divide-y divide-gray-700">
              
                {coursess.map((course) => (
                  <Tr key={course._id} className="border-richblack-800 p-8">
                    <Td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-x-4">
                        <img
                          src={course.thumbnail}
                          alt={course.courseName}
                          className="h-20 w-20 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/150x150/6B7280/FFFFFF?text=No+Image";
                          }}
                        />
                        <div className="flex flex-col gap-y-1">
                          <h4 className="text-lg font-semibold text-gray-200">{course.courseName}</h4>
                          <p className="text-sm text-gray-400 max-w-sm truncate">
                            {course.courseDescription}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {course.category.name}
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${course.price}
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {course.status === "Draft" ? (
                        <p className="text-pink-500">DRAFTED</p>
                      ) : (
                        <p className="text-yellow-500">PUBLISHED</p>
                      )}
                    </Td>
                    <Td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-x-2">
                        <button
                          className=" text-white font-medium disabled:opacity-50"
                        //   disabled={loading}
                        >
                          <FiEdit/>
                        </button>
                        <button
                          className=" text-white font-medium disabled:opacity-50"
                        //   disabled={loading}
                          onClick={() => setConfirmationModal({
                            text1: "Do you want to delete this course?",
                            text2: "All data related to this course will be deleted.",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleCourseDelete(course._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })}
                        >
                          <MdDeleteOutline/>
                        </button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              
            </Tbody>
          </Table>
          {confirmationModal && <ConfirmationModal modalData ={ confirmationModal}/>}
    </div>
  )
}

export default CoursesTable