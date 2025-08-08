import { auth } from "./apis";
import { apiConnector } from "./apiconnector";
import toast from "react-hot-toast";

export const sendOtpApi = async ({ email, navigate}) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiConnector("POST", auth.SEND_OTP_API, { email });

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    toast.success("OTP Sent Successfully");
    navigate("/verify-email");

  } catch (error) {
    console.error("SEND_OTP_API_ERROR...", error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
  }
};