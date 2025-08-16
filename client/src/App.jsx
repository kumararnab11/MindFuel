import './App.css'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Otp from './pages/Otp'
import AboutUs from './pages/AboutUs'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from './components/core/Dashboard/Settings'
import AddCourse from './components/core/Dashboard/AddCourse'
import Contact from './pages/Contact'
import MyCourses from './pages/MyCourses'
import { Catalog } from './pages/Catalog'
import CoursePage from './pages/CoursePage'
import CartItems from './pages/CartItems'

function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Routes>
        <Route path="/"element={<><Navbar/><Home/></>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/signup"element={<Signup/>}/>
        <Route path="/reset-password"element={<ForgotPassword/>}/>
        <Route path="/update-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email"element={<Otp/>}/>
        <Route path="/about"element={<><Navbar/><AboutUs/></>}/>
        <Route path="/contact"element={<><Navbar/><Contact/></>}/>
        <Route path="/catalog/:catalogName"element={<><Navbar/><Catalog/></>}/>
        <Route path="/courses/:courseId"element={<><Navbar/><CoursePage/></>}/>
        <Route path="/dashboard/cart"element={<><Navbar/><CartItems/></>}/>
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='/dashboard/settings' element={<Settings/>}/>
          <Route path="/dashboard/add-course" element={<AddCourse/>}/>
          <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
