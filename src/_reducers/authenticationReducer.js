import {
  USERS_LOGIN_SUCCESS,
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_FAILURE,
  USERS_LOGOUT,
  VERIFY_LOGIN_USER,
  ADMIN_LOGOUT,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_SCREENS,
  USER_FORGOT_PASSWORD_LOADING,
  RESET_EMAIL_SENT,
  RESET_PASSWORD_ERROR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_FAILURE,
  OTP_SEND_START,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAILURE,
  CHANGE_OTP_PHONE_NO,
  VERIFY_USER_FAILURE,
  VERIFY_USER_SUCCESS,
  VERIFY_REQUEST,
  PERSONAL_LOAN_ZAP_LOADING,
  PERSONAL_LOAN_ZAP_SUCCESS
} from "../_constants/constants";

const initialState = {
  loggedIn: false,
  user: {},
  isLoading: false,
  userVerified: true,
  admin: {},
  adminLogin: false,
  adminScreens: [],
  forgotPasswordLoading: false,
  forgotPasswordConfirm: false,
  forgotMessage: "",
  otp_send: false,
  otp_loading: false,
  isLoading:false,
  save_personal_loan:false
};
/*eslint no-lone-blocks: "error"*/
/*eslint-env es6*/
const authentication = (state = initialState, action) => {
  switch (action.type) {
    case PERSONAL_LOAN_ZAP_SUCCESS: {
      return {
        ...state,
        save_personal_loan:!state.save_personal_loan
      }
    }
    case PERSONAL_LOAN_ZAP_LOADING: {
      return {
        ...state,
        isLoading:action.status
      }
    }
    case OTP_SEND_START: {
      return {
        ...state,
        otp_send: false,
        otp_loading: true,
      };
    }
    case VERIFY_REQUEST: {
      return {
        ...state,
        otp_verify_loading: true,
      };
    }
    case OTP_SEND_SUCCESS: {
      return {
        ...state,
        otp_send: true,
        otp_loading: false,
      };
    }
    case VERIFY_USER_FAILURE:
    case VERIFY_USER_SUCCESS: {
      return {
        ...state,
        otp_verify_loading: false,
      };
    }
    case OTP_SEND_FAILURE: {
      return {
        ...state,
        otp_send: false,
        otp_loading: false,
      };
    }

    case CHANGE_OTP_PHONE_NO: {
      return {
        ...state,
        otp_send: false,
        otp_loading: false,
      };
    }
    case USERS_LOGIN_REQUEST: {
      return {
        ...state,
        loggingIn: false,
        user: {},
        isLoading: true,
        userVerified: true,
      };
    }
    case ADMIN_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        userVerified: true,
        adminLogin: false,
      };
    }
    case USERS_LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        isLoading: false,
        userVerified: true,
      };
    }
    case ADMIN_LOGIN_SUCCESS: {
      return {
        ...state,
        admin: action.admin,
        isLoading: false,
        userVerified: true,
        adminLogin: true,
      };
    }
    case ADMIN_SCREENS: {
      return { ...state, isLoading: false, adminScreens: action.screens };
    }
    case USERS_LOGIN_FAILURE: {
      return {
        ...state,
        loggedIn: false,
        user: {},
        isLoading: false,
        admin: {},
        userVerified: true,
      };
    }
    case ADMIN_LOGIN_FAILURE: {
      return {
        ...state,
        adminLogin: false,
        isLoading: false,
        admin: {},
        userVerified: true,
      };
    }
    case ADMIN_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        admin: {},
        isLoading: false,
        userVerified: true,
        adminLogin: false,
        adminScreens:[]
      };
    }
    case USERS_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {},
        isLoading: false,
        userVerified: true,
        adminScreens:[]
      };
    }
    case VERIFY_LOGIN_USER: {
      return { ...state, userVerified: false, isLoading: false };
    }

    case USER_FORGOT_PASSWORD_LOADING: {
      return { ...state, forgotPasswordLoading: action.status };
    }
    case RESET_EMAIL_SENT: {
      return { ...state, forgotPasswordConfirm: !state.forgotPasswordConfirm };
    }
    case RESET_PASSWORD_ERROR: {
      return { ...state, forgotMessage: action.message };
    }
    default: {
      return { ...state };
    }
  }
};
export default authentication;
