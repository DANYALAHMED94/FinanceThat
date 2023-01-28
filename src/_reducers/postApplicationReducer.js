import {
  START_POST_APPLICATION,
  POST_APPLICATION_SUCCESS,
  END_POST_APPLICATION,
  GET_POST_APPLICATIONS,
  GET_DMS_POST_APPLICATIONS,
  GET_STOCK_RECORD_BY_ID,
  RESUBMIT_POST_APP,
  CONFIRM_POST_APPLICATION,
  REMOVE_ALL_POST_APP_STATE,
  LOADING_STOCK_BY_ID,
  DISCARD_POST_STATE,
  LOADING,
  SET_RESUBMIT_TRUE,
  PUT_UPDATE_SIN_REQUEST,
} from "../_constants/constants";

const initialState = {
  isLoading: false,
  save_post: false,
  response_type: "",
  post_applications: [],
  post_applications: [],
  post_dms_applications: {},
  single_stock_detail: [],
  reSubmit: false,
  message: "",
  amount: "",
  loadingStock: false,
  stock_message: "",
  loading: false,
  app_id: "",
};

const postApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: action.response,
      };
    }
    case START_POST_APPLICATION: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PUT_UPDATE_SIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case POST_APPLICATION_SUCCESS: {
      return {
        ...state,
        save_post: !state.save_post,
        response_type: action.response,
        isLoading: false,
        message: action.message,
        amount: action.amount,
        app_id: action.app_id,
        jumio_url: action.jumio_url,
        jumio_reference: action.jumio_reference,
        credit_score: action.credit_score,
      };
    }

    case END_POST_APPLICATION: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case GET_POST_APPLICATIONS: {
      return {
        ...state,
        post_applications: action.response,
      };
    }
    case GET_DMS_POST_APPLICATIONS: {
      return {
        ...state,
        post_dms_applications: action.response,
      };
    }
    case GET_STOCK_RECORD_BY_ID: {
      return {
        ...state,
        single_stock_detail: action.response,
        stock_message: action.message,
      };
    }
    case RESUBMIT_POST_APP: {
      return {
        ...state,
        reSubmit: true,
        response_type: "",
        message: "",
        amount: "",
        single_stock_detail: "",
      };
    }
    case SET_RESUBMIT_TRUE: {
      return {
        ...state,
        reSubmit: true,
      };
    }
    case CONFIRM_POST_APPLICATION: {
      return {
        ...state,
        response_type: 5,
      };
    }
    case LOADING_STOCK_BY_ID: {
      return {
        ...state,
        loadingStock: action.status,
      };
    }
    case REMOVE_ALL_POST_APP_STATE: {
      return {
        ...state,
        response_type: "",
        message: "",
        amount: "",
        single_stock_detail: [],
        loadingStock: false,
        stock_message: "",
        app_id: "",
      };
    }
    case DISCARD_POST_STATE: {
      return {
        ...state,
        response_type: "",
        message: "",
        amount: "",
        loadingStock: false,
        stock_message: "",
        app_id: "",
      };
    }
    default:
      return { ...state };
  }
};
export default postApplicationReducer;
