import {
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  USERS_REGISTER_SUCCESS,
  USERS_REGISTER_SUCCESS_POST_APP,
  DEALER_REGISTER,
  VERIFY_REQUEST,
  VERIFY_USER_SUCCESS,
  IS_LOADING_TRUE,
  IS_LOADING_FALSE,
  VERIFY_USER_FAILURE,
} from '../_constants/constants';

const registration = (state = { registering: false, user_detail: {}, dealer_register: false, isLoadingOnConfrim: false, isLoading: false, isVerify: false, dealer_data: {}, dealer_preference:{} }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registering: false, isLoading: true,
        dealer_register: false,
        user_detail: {},
      };
    case USERS_REGISTER_SUCCESS:
      return { ...state, registering: true, isLoading: false, user_detail: action.response };
    case IS_LOADING_TRUE:
      return { ...state, isLoadingOnConfrim: true};
    case IS_LOADING_FALSE:
        return { ...state, isLoadingOnConfrim: false};
    case USERS_REGISTER_SUCCESS_POST_APP:
      return { ...state, isLoading: false, user_detail: action.response };
    case REGISTER_FAILURE:
      return { ...state, registering: false, isLoading: false, dealer_register: false };
    case DEALER_REGISTER: {
      return {
        ...state,
        dealer_register: !state.dealer_register,
        dealer_data: action.data,
        dealer_preference:action.dealer_preference,
        isLoading: false
      }
    }
    case VERIFY_REQUEST: {
      return {
        ...state,
        isVerify: false,
        isLoading: false,
      }
    }
    case VERIFY_USER_SUCCESS: {
      return {
        ...state,
        isVerify: true,
        isLoading: false,
      }
    }
    case VERIFY_USER_FAILURE: {
      return {
        ...state,
        isVerify: false,
        isLoading: false,
      }
    }
    default: {
      return { ...state }
    }
  }
}
export default registration