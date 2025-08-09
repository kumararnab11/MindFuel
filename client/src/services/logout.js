import { deleteUser } from "../slices/userSlice";
import { setToken } from "../slices/authSlice";
import { setLoader } from "../slices/loaderSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { auth } from "./apis";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = useCallback(async () => {
    dispatch(setLoader(true));

    try {
      const res = await apiConnector(
        "POST",
        auth.LOGOUT_API,
        null, // no body
        null, // no extra headers
        null, // no params
        { withCredentials: true } // send cookie for clearing
      );

      toast.success(res.data?.message || "Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      // Always clear frontend state regardless of API result
      dispatch(deleteUser());
      dispatch(setToken(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
      dispatch(setLoader(false));
    }
  }, [dispatch, navigate]);

  return logoutHandler;
};

export default useLogout;
