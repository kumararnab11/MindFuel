import React, { useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineDelete,MdModeEdit,MdOutlineArrowDropDownCircle } from "react-icons/md";
import ConfirmationModal from '../../../common/ConfirmationModal'
import { apiConnector } from "../../../../services/apiconnector";
import { courses } from "../../../../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../slices/courseSlice";
import toast from "react-hot-toast";
import SubSectionModal from "./SubsectionModal";

const NestedView =()=> {
    const dispatch=useDispatch();
  const {course} = useSelector((state)=>state.course)
  if (!course?.courseContent || course.courseContent.length === 0) {
    return <div className="text-white">No course content</div>;
  }
  const {token} = useSelector((state)=>state.auth)
  const [confirmationModalData,setConfirmationModalData]=useState(null);
  const [modalData,setModalData]=useState(null);
  const [subSectionOpen,setSubSectionOpen]=useState(false)

  const [isOpen,setIsOpen]=useState("")
  
  const handleDeleteSection = async(section)=>{
    console.log("section ",section)
    try{
        const res = await apiConnector(
            "POST",
            courses.DELETE_SECTION_API,
            { sectionId: section._id,courseId: course._id},
            { Authorization: `Bearer ${token}` }
        );
        console.log(res);
        dispatch(setCourse(res.data.updated));
        toast.success("Section deleted successfully")
    }
    catch(res){
        console.log(res);
        toast.error(res?.data?.message||"Something went wrong");
    }
  }

  const handleDeleteSubSection = async (sub,section)=>{
    console.log("section ",section)
    try{
        const res = await apiConnector(
            "POST",
            courses.DELETE_SUBSECTION_API,
            { sectionId: section._id,subSectionId: sub._id},
            { Authorization: `Bearer ${token}` }
        );
        const result = res.data.updatedSection;

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            );
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }

        toast.success("SubSection deleted successfully")
    }
    catch(res){
        console.log(res);
        toast.error(res?.data?.message||"Something went wrong");
    }
  }

  const deleteSection = (section)=>{
    setConfirmationModalData({
        text1: "Delete Section?",
        text2: "This action cann't be undone.",
        btn1Text: "Delete",
        btn2Text: "Cancel",
        btn1Handler: () => {
            setConfirmationModalData(null);
            handleDeleteSection(section);
        },
        btn2Handler: () => {
            setConfirmationModalData(null);
        },
    })
  }

  const deleteSubSection = (sub,section) =>{
    setConfirmationModalData({
        text1: "Delete SubSection?",
        text2: "This action cann't be undone.",
        btn1Text: "Delete",
        btn2Text: "Cancel",
        btn1Handler: () => {
            setConfirmationModalData(null);
            handleDeleteSubSection(sub,section);
        },
        btn2Handler: () => {
            setConfirmationModalData(null);
        },
    })
  }

  return (
    <div className="bg-richblack-700 p-4 rounded-md">
      {course.courseContent.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-2">
          {/* Section Row */}
          <div className="flex items-center justify-between px-2 py-1 bg-richblack-800 rounded">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">
                {section.sectionName}
              </span>
            </div>
            <div className="flex gap-2 text-white">
              <div>
                {subSectionOpen ? <RxDropdownMenu className="cursor-pointer" 
                onClick={()=>setSubSectionOpen(false)}/>:
                  <MdOutlineArrowDropDownCircle className="cursor-pointer" 
                onClick={()=>setSubSectionOpen(true)}/>}
              </div>
              <MdModeEdit className="cursor-pointer" />
              <div onClick={()=>deleteSection(section)}>
                <MdOutlineDelete className="cursor-pointer"/>
              </div>
            </div>
          </div>

          {/* Subsections */}
          {subSectionOpen && section.subSection?.map((sub, subIndex) => (
            <div
              key={subIndex}
              className="flex items-center justify-between ml-6 px-2 py-1"
            >
              <span onClick={()=>{setIsOpen("view")
                setModalData(sub)}} className="text-white cursor-pointer">{sub.title}</span>
              <div className="flex gap-2 text-white">
                <MdModeEdit className="cursor-pointer" />
                <MdOutlineDelete className="cursor-pointer" onClick={()=>deleteSubSection(sub,section)}/>
              </div>
            </div>
          ))}

          {/* Add Lecture */}
          <div className="ml-6 mt-1 text-yellow-300 cursor-pointer" onClick={()=>{
            setIsOpen("add")
            setModalData(section._id)
          }}>
            + Add Lecture
          </div>
        </div>
      ))}
      {confirmationModalData && <ConfirmationModal modalData={confirmationModalData}/>}
      {isOpen=="add" && modalData && <SubSectionModal modalData={modalData} setModalData={setModalData} add={true} />}
      {isOpen=="view" && modalData && <SubSectionModal modalData={modalData} setModalData={setModalData} view={true} />}
    </div>
  );
}

export default NestedView
