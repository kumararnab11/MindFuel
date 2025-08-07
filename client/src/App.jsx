import './App.css'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/common/Navbar'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Routes>
        <Route path="/"element={<><Navbar/><Home/></>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/signup"element={<Signup/>}/>
        <Route path="/reset-password"element={<ForgotPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
