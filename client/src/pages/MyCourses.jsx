import IconBtn from '../components/common/IconBtn'
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';
import { useSelector } from 'react-redux';
import { useState ,useEffect} from 'react';
import CoursesTable from '../components/core/MyCourses/CoursesTable';
import {courses} from '../services/apis'
import { FaPlusCircle } from "react-icons/fa";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const {_id} = useSelector((state)=>state.user.user);
  const navigate = useNavigate();
  const [course, setCourses] = useState([]);

  const fetchCourses = async () => {
    console.log("id is",_id)
      try{
        const res = await apiConnector("POST",courses.GET_COURSES_BY_INSTRUCTOR_ID,{
          instructorId : _id,
          token : token
        },{ Authorization: `Bearer ${token}` })
        console.log(res.data.data);
        setCourses(res.data.data)
      }
      catch(err){
        console.log(err.data.message)
      }
  };



  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <div>
        <h1 className='text-3xl font-bold text-richblack-5 py-6'>My Courses</h1>
        <IconBtn customClasses='mb-6'
          text="Add Course"
          onClick={()=>navigate('/dashboard/add-course')}
        >
          <FaPlusCircle/>
        </IconBtn>
      </div>

      {courses && <CoursesTable coursess={course} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;