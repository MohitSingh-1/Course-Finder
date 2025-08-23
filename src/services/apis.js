const BASE_URL = import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGEPASSWORD_API: BASE_URL + "/auth/changepassword",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  GET_PROFILE_API: BASE_URL + "/profile/getUserDetails",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_LIST_BY_INSTRUCTOR_ID: BASE_URL + "/course/getAllCoursesByInstructorId",
  COURSE_LIST_BY_CATEGORY_ID: BASE_URL + "/course/getAllCoursesByCategoryId",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/getAllCategories",
}

// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
}


export const wishlistEndpoints = {
  ADD_WISHLIST: BASE_URL + "/wishlist/addToWishlist",
  GET_WISHLIST: BASE_URL + "/wishlist/getWishlist",
  REMOVE_WISHLIST: BASE_URL + "/wishlist/removeFromWishlist",
}

// AI SEARCH 
export const aisearch = {
  AI_SEARCH: BASE_URL + "/aisearch/ai"
}