import logo from "../../assets/logo.png"
import { Link, matchPath } from "react-router-dom"
import { NavbarLinks } from "../../data/navlink"
import { useLocation } from "react-router-dom"
import {useSelector} from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import {IoIosArrowDropdownCircle} from 'react-icons/io'
import { useState,useEffect } from "react"
import { categories } from "../../services/apis"
import { apiConnector } from "../../services/apiconnector"

const Navbar = () => {
  const location = useLocation()
  const {token}=useSelector((state)=>state.auth);
  const user=useSelector((state)=>state.user.user);
  const {totalItems}=useSelector((state)=>state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        //console.log("Printing Sublinks result:", result);
        setSubLinks(result.data.allCategories);
      } catch (error) {
        console.log("Could not fetch the category list");
      }
    }

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-[1080px] items-center justify-between'>
        {/* Image */}
        <Link to='/'>
          <img src={logo} width={160} height={32} loading='lazy' />
        </Link>

        {/* Nav Links */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-5'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className='relative flex items-center gap-2 group z-20'>
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />

                    <div
                    className='invisible absolute left-[50%]
                      translate-x-[-50%] translate-y-[80%]
                      top-[50%]
                      flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                      opacity-0 transition-all duration-200 group-hover:visible
                      group-hover:opacity-100 lg:w-[300px]'
                  >
                    <div
                      className='absolute left-[50%] top-0
                        translate-x-[-80%]
                        translate-y-[-45%] h-6 w-6 rotate-45 rounded
                        bg-richblack-5'
                    ></div>

                    {subLinks.length > 0 ? (
                      subLinks.map((subLink, index) => (
                        <Link
                          to={`/catalog/${subLink.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                          key={index}
                          className="px-2 py-1 hover:bg-richblack-50 rounded"
                        >
                          {subLink.name}
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-richblack-400">No categories available</p>
                    )}
                  </div>

                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRoute(link.path) ? "text-yellow-25" : "text-richblack-5"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        /* Login/SignUp/Dashboard */
        <div className='flex gap-x-4 items-center'>
          {
            user && user?.accountType != "Instructor" && (
              <Link to="/dashboard/cart" className='relative'>
                <AiOutlineShoppingCart className="text-richblack-5 relative" />
                {
                  totalItems > 0 && (
                    <span className='text-richblack-5 text-[10px] py-[0.5px] px-1 bg-caribbeangreen-500 rounded-full font-edu-sa font-extrabold absolute top-[-15px] right-[-10px] z-10'>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }


          {
            token === null && (
              <Link to="/login">
                <button className="border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                rounded-b-md text-richblack-100">
                  Log in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/signup">
                <button className="border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                rounded-b-md text-richblack-100">
                  Sign Up
                </button>
              </Link>
            )
          }

          {token !== null && <ProfileDropDown/>}

        </div>

      </div>
    </div>
  )
}

export default Navbar;