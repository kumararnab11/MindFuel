const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const auth = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/signup",
  RESET_TOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
  SEND_OTP_API:BASE_URL + "/auth/sendotp",
  LOGOUT_API:BASE_URL+'/auth/logout'
}

export const profile = {
  UPDATE_PROFILE:BASE_URL+"/profile/update-profile"
}