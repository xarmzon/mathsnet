export const ENTITY_NUMBERS = {
  USERNAME_MAX: 15,
  USERNAME_MIN: 4,
  FULLNAME_MAX: 50,
  FULLNAME_MIN: 10,
  PASSWORD_MAX: 15,
  PASSWORD_MIN: 6,
};
const URL_BASE = {
  ADMIN: "/admin/",
  INSTRUCTOR: "/instructor/",
  STUDENT: "/student/",
  AUTH: "/auth/",
};
export const PER_PAGE = 10;
export const MAX_IMG_SIZE = 150; //150kb
export const MAX_DP_SIZE = 90; //90kb

export const ROUTES = {
  API: {
    CLASS: "class",
    INSTRUCTOR: "instructor",
    STUDENT: "student",
  },
  ADMIN: {
    CLASSES: `${URL_BASE.ADMIN}classes`,
    INSTRUCTORS: `${URL_BASE.ADMIN}instructors`,
    STUDENTS: `${URL_BASE.ADMIN}students`,
    PAYMENTS: `${URL_BASE.ADMIN}payments`,
  },
  STUDENT: {
    MY_CLASS: `${URL_BASE.STUDENT}myclass`,
  },
  INSTRUCTOR: {
    TOPICS: `${URL_BASE.INSTRUCTOR}topics`,
  },
  GENERAL: {
    OVERVIEW: `/dashboard`,
    CLASSES: `/learn/classes`,
  },
  AUTH: {
    LOGIN: `${URL_BASE.AUTH}login`,
    SIGNUP: `${URL_BASE.AUTH}signup`,
  },
};
export const USER_TYPES_TEXT = ["Student", "Instructor", "Admin", "All"];
export const CONSTANTS = {
  APP_NAME: "MathsNet",
  USER_TYPES: {
    STUDENT: "1",
    INSTRUCTOR: "2",
    ADMIN: "3",
    ALL: "-1",
  },
  RASTAARC: {
    GITHUB: "https://www.github.com/rastaarc",
    TWITTER: "https://www.twitter.com/rastaarcl",
  },

  ALLOWED_EXTENSIONS_FOR_DP: ["jpeg", "jpg", "png"],
  ALLOWED_FILE_SIZE_DP: 1024 * 80, // 80kb
  MESSAGES: {
    CLASS_UPDATED: "The Class Data has been updated successfully.",
    ACCOUNT_UPDATED: "Account updated successfully.",
    ACCOUNT_DELETED: "Account deleted successfully.",
    CLASS_NOT_FOUND: "Oops! We can't find the Class you're looking for",
    ACCOUNT_NOT_FOUND: "Oops! We can't find the Account you're looking for",
    CLASS_DELETED: "The Class has been deleted successfully.",
    ACCOUNT_EXIST:
      "Sorry, An account already exist with one of the details supplied",
    INVALID_REQUEST: "Invalid Request",
    BAD_REQUEST: "Bad Request, please try again with valid request data",
    NO_VALID_CREDENTIALS: "No credentials supplied, Please try again",
    INVALID_CREDENTIALS:
      "Sorry! Invalid credentials supplied, Please try again",
    NEW_ACCOUNT_SUCCESSFUL: "Account created successfully",
    NEW_CLASS_SUCCESSFUL: "Class created successfully",
    LOGOUT_SUCCESSFUL: "Your account has been logged out successfully",
    UNKNOWN_ERROR: "Unknown Error occurred. Please try again",
    INVALID_USERNAME: "Invalid Username supplied. Please choose another one",
    LOGIN_SUC: "Account Logged-in successfully",
    LOGIN_ERR: "Sorry, Your username/email or password is incorrect",
    NO_USER: "Sorry, We can't find the User with the supplied details",
    USER_EXIST:
      "Sorry! This Username has been registered. Choose another one for your account",
    EMAIL_EXIST:
      "Sorry! This Email has been registered. Choose another one for your account",
    FORM_ERROR: "Please fill the form properly",
    LOGIN_REQUIRED: "Please login first before you can access that page",
    ADMIN_REQUIRED: "Sorry! only Admin can access that page",
    INSTRUCTOR_REQUIRED: "Sorry! only Instructors can access that page",
    STUDENT_REQUIRED: "Sorry! only Students can access that page",
    ALREADY_LOGIN:
      "Please Logout first before you can have access to that page",
    FETCH_LOADING_ERROR:
      "Error Occurred while fetching the data. Please use the refresh button to reload the data",
    FETCH_LOADING_ERROR2: "Error occurred while fetching the data. Reload now",
    FETCH_LOADING_SUCCESS: "Data Fetched successfully",
    FETCH_LOADING_DATA: "Loading Data.........",
    NO_DATA_TO_DISPLAY: "SORRY! NO DATA AVAILABLE TO DISPLAY",
    NO_TOPICS_TO_DISPLAY: "No Topics Data To Display Right Now",
    COURSE_NOT_FOUND: "Oops! We can't find the Class you're looking for",
    TOPIC_NOT_FOUND: "Oops! We can't find the Topic you're looking for",
    NO_ACCESS_TO_TOPIC:
      "Oops! You don't have access to view that Class contents",
    GENERAL_ERROR_MESSAGE:
      "Oops! Something went wrong with your request. please try again",
    ADD_COURSE_FIRST: "Please add the Class to your Classes list first",
    NO_OTHER_CLASS_YET: "No other courses yet. Check back later",
    NO_TOPIC_FOR_CLASS: "No Topics for this class yet. Check back later",
    CLASS_LOGIN_REQUIRED:
      "PLEASE SIGNUP/LOGIN FIRST IN ORDER TO ADD THIS CLASS",
    NO_COURSE_DATA: "No Class Data To Display Right Now",
    METHOD_NOT_ALLOWED: "Sorry, Method not allowed or not yet supported",
    FORM: {
      FULL_NAME: `Invalid full name, please try again with minimum of ${ENTITY_NUMBERS.FULLNAME_MIN} and maximum of ${ENTITY_NUMBERS.FULLNAME_MAX} letters`,
      USERNAME: `Invalid username supplied, please try again with minimum of ${ENTITY_NUMBERS.USERNAME_MIN} and maximum of ${ENTITY_NUMBERS.USERNAME_MAX} letters`,
      EMAIL: "Invalid email supplied, please try again",
      PASSWORD: `Invalid password, please supplied a minimum of ${
        ENTITY_NUMBERS.PASSWORD_MIN
      } characters with ${1} or more uppercase letters and ${1} or more numbers`,
      CPASSWORD: "The supplied passwords do not match, please try again",
    },
  },

  ENTITY: {
    USERNAME_MAX: ENTITY_NUMBERS.USERNAME_MAX,
    USERNAME_MIN: ENTITY_NUMBERS.USERNAME_MIN,
    FULLNAME_MAX: ENTITY_NUMBERS.FULLNAME_MAX,
    FULLNAME_MIN: ENTITY_NUMBERS.FULLNAME_MIN,
    PASSWORD_MAX: ENTITY_NUMBERS.PASSWORD_MAX,
    PASSWORD_MIN: ENTITY_NUMBERS.PASSWORD_MIN,
  },
  HASH_SALT_ROUND: 12,
};
