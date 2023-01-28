import {
  GET_POST_LIST_DETAIL,
  GET_POST_LIST_FILTERS,
  FILTER_ON_PRICE_RANGE,
  FILTER_ON_TRIM,
  FILTER_ON_YEAR_RANGE,
  FILTER_ON_TRANSMISSION,
  FILTER_ON_KILOMETER_RANGE,
  FILTER_ON_CONDITION,
  FILTER_ON_SELLER_TYPE,
  FILTER_ON_COLOR,
  FILTER_ON_FEATURES,
  CHANGE_TYPE_OF_VEHICLE,
  FILTER_ON_MAKE,
  FILTER_ON_MODEL,
  SAVED_AD_POST,
  ADD_FILTERS,
  REMOVE_FILTER,
  REMOVE_FEATURE_NAME,
  REMOVE_ALL_FILTER,
  REMOVE_ALL_POST,
  POST_LIST_DETAIL_LOADING,
  GET_POST_LIST_FILTERS_VALUES,
  GET_POST_LIST_FILTERS_LOADING,
  GET_TOP_ADS,
  TOP_AD_LOADING,
  GET_POST_LIST_DETAIL_NEXT,
  POST_LIST_NEXT_DETAIL_LOADING,
  TOGGLE_LISTING_VEHICLE_TYPE,
  GET_TYPE_VEHICLES_LISTING,
  TOGGLE_LISTING_MAKE,
  GET_MAKE_LISTING,
  TOGGLE_LISTING_MODEL,
  GET_MODEL_LISTING,
  GET_MULTI_MODEL_LISTING,
  TOGGLE_LISTING_VEHICLE_MULTI_MODEL,
  LOADING_SAVED_AD,
  SAVED_AD_POST_TOP_ADD,
  GET_USER_PROFILE_DATA_FOR_LISTING,
  GET_DEALER_PROFILE_DATA_FOR_LISTING,
  GET_VEHICLE_BODY_TYPE,
  VEHICLE_BODY_TYPE_LOADER,
  GET_VEHICLE_TRIMS,
} from "../_constants/constants";
import { toastr } from "react-redux-toastr";
import axios from "../_helpers/axiosInterceptors";
import simpleAxios from "../_helpers/axios";

export const get_vehicle_type = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_LISTING_VEHICLE_TYPE,
      status: false,
    });

    const url = `/type_of_vehicle/list/`;
    let options = {};
    if (data !== undefined && data !== null) {
      options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        params: data,
        url,
      };
    } else {
      options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        url,
      };
    }
    simpleAxios(options)
      .then((response) => {
        console.log(response.data);
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_TYPE_VEHICLES_LISTING,
            response: response.data.data,
          });
        } else {
          dispatch({
            type: GET_TYPE_VEHICLES_LISTING,
            response: [],
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: TOGGLE_LISTING_VEHICLE_TYPE,
          status: true,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const get_vehicle_make = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_LISTING_MAKE,
      status: false,
    });

    const url = `/v_make/retrieve_by_type/${id}/`;
    let options = {};
    if (data !== undefined && data !== null) {
      options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        params: data,
        url,
      };
    } else {
      options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        url,
      };
    }
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_MAKE_LISTING,
            response: response.data.data,
          });
        } else {
          dispatch({
            type: GET_MAKE_LISTING,
            response: [],
          });
        }
        dispatch({
          type: TOGGLE_LISTING_MAKE,
          status: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: TOGGLE_LISTING_MAKE,
          status: true,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const get_vehicle_make_sub_type = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_LISTING_MAKE,
      status: false,
    });
    const url = `/vmakes_by_sub_type_list/`;
    let options = {};
    options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
      url,
    };

    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_MAKE_LISTING,
            response: response.data.data,
          });
        } else {
          dispatch({
            type: GET_MAKE_LISTING,
            response: [],
          });
        }
        dispatch({
          type: TOGGLE_LISTING_MAKE,
          status: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: TOGGLE_LISTING_MAKE,
          status: true,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const get_vehicle_model = (id, data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_LISTING_MODEL,
      status: false,
    });

    const url = `/v_model/retrieve_by_make/${id}/`;
    let options = {};
    if (data !== undefined && data !== null) {
      options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        params: data,
        url,
      };
    } else {
      options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        url,
      };
    }
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_MODEL_LISTING,
            response: response.data.data,
          });
        } else {
          dispatch({
            type: GET_MODEL_LISTING,
            response: [],
          });
        }
        dispatch({
          type: TOGGLE_LISTING_MODEL,
          status: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: TOGGLE_LISTING_MODEL,
          status: true,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const get_multi_vehicle_models = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_LISTING_VEHICLE_MULTI_MODEL,
      status: false,
    });
    const url = `/vmodels_by_make_list/`;
    let options = {};
    options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: data,
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          console.log(response.data.data);
          dispatch({
            type: GET_MULTI_MODEL_LISTING,
            response: response.data.data,
          });
        } else {
          dispatch({
            type: GET_MULTI_MODEL_LISTING,
            response: [],
          });
        }
        dispatch({
          type: TOGGLE_LISTING_VEHICLE_MULTI_MODEL,
          status: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: TOGGLE_LISTING_VEHICLE_MULTI_MODEL,
          status: true,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const get_post_list = () => {
  return (dispatch) => {
    // const url = `/ads/`
    const url = `/listing/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    axios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_POST_LIST_DETAIL,
            response: response.data.data.results,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const get_list_filters = () => {
  return (dispatch) => {
    const url = `/ad_details/listing_filter/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    simpleAxios(options)
      .then((response) => {
        // if (response.data.details == undefined && response.data.detail == undefined) {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_POST_LIST_FILTERS,
            response: response.data.data,
          });
        }

        // }
      })
      .catch((err) => {
        console.log(err.message);
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const saved_ad_post = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SAVED_AD,
      status: true,
      ad_id: data.ad_id,
    });
    const url = `/ad_details/saved_ads/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: data,
      url,
    };
    axios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: SAVED_AD_POST,
            response: data,
          });
          // toastr.success('Success', 'Ad Saved')
        }
        dispatch({
          type: LOADING_SAVED_AD,
          status: false,
          ad_id: data.ad_id,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADING_SAVED_AD,
          status: false,
          ad_id: data.ad_id,
        });
        console.log(err.message);
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const un_saved_ad_post = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SAVED_AD,
      status: true,
      ad_id: data.ad_id,
    });
    const url = `/ad_details/saved_ads/`;
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: data,
      url,
    };
    axios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: SAVED_AD_POST,
            response: data,
          });
          // toastr.success('Success', 'Ad Un Saved')
        }
        dispatch({
          type: LOADING_SAVED_AD,
          status: false,
          ad_id: data.ad_id,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADING_SAVED_AD,
          status: false,
          ad_id: data.ad_id,
        });
        console.log(err.message);
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const saved_ad_post_top_add = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SAVED_AD,
      status: true,
      ad_id: data.ad_id,
    });
    const url = `/ad_details/saved_ads/`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: data,
      url,
    };
    axios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: SAVED_AD_POST_TOP_ADD,
            response: data,
          });
          // toastr.success('Success', 'Ad Saved')
        }
        dispatch({
          type: LOADING_SAVED_AD,
          status: false,
          ad_id: data.ad_id,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADING_SAVED_AD,
          status: false,
          ad_id: data.ad_id,
        });
        console.log(err.message);
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const un_saved_ad_post_top_add = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SAVED_AD,
      status: true,
      ad_id: data.ad_id,
    });
    const url = `/ad_details/saved_ads/`;
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: data,
      url,
    };
    axios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: SAVED_AD_POST_TOP_ADD,
            response: data,
          });
          // toastr.success('Success', 'Ad Un Saved')
        }
        dispatch({
          type: LOADING_SAVED_AD,
          status: false,
          ad_id: data.ad_id,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOADING_SAVED_AD,
          status: false,
          ad_id: data.ad_id,
        });
        console.log(err.message);
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const get_filter_record = (data) => {
  return (dispatch) => {
    dispatch({
      type: POST_LIST_DETAIL_LOADING,
      loading: true,
    });
    dispatch({
      type: VEHICLE_BODY_TYPE_LOADER,
      status: true,
    });
    // const url = `/ads/`
    const url = `/listing/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      params: data,
      url,
    };
    axios(options)
      .then((response) => {
        console.log(response);
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_POST_LIST_DETAIL,
            response: response.data.data.results,
            next: response.data.data.next,
            previous: response.data.data.previous,
            totalListing: response.data.data.count,
            type_of_vehicles: response.data.typeOfVehicles,
            vehicle_make: response.data.typeOfMakes,
            vehicle_model: response.data.typeOfModels,
            sub_vehicle_type: response.data.subTypes,
          });
          dispatch({
            type: GET_VEHICLE_BODY_TYPE,
            response: response.data.bodyTypes,
          });
          if (response.data.typeOfMakes?.length > 0) {
            dispatch({
              type: TOGGLE_LISTING_MAKE,
              status: true,
            });
          }
          dispatch({
            type: GET_VEHICLE_TRIMS,
            response: response.data.trims,
          });
          dispatch({
            type: VEHICLE_BODY_TYPE_LOADER,
            status: false,
          });
        } else {
          dispatch({
            type: POST_LIST_DETAIL_LOADING,
            loading: false,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_LIST_DETAIL_LOADING,
          loading: false,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const next_url_call = (data) => {
  return (dispatch, useStore) => {
    const storeState = useStore();

    const isMainAddsLoading =
      storeState.adPostReducers.listPostReducer.showListSearchLoader;
    if (isMainAddsLoading) return;

    dispatch({
      type: POST_LIST_NEXT_DETAIL_LOADING,
      loading: true,
    });
    console.log({ data }, "next URL");
    const url = `${data}`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    axios(options)
      .then((response) => {
        console.log(response);
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_POST_LIST_DETAIL_NEXT,
            response: response.data.data.results,
            next: response.data.data.next,
            previous: response.data.data.previous,
          });
        } else {
          dispatch({
            type: POST_LIST_NEXT_DETAIL_LOADING,
            loading: false,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_LIST_NEXT_DETAIL_LOADING,
          loading: false,
        });
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
/**
 * Filter Actions
 *
 */
export const change_type_of_vehicle = (data) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_TYPE_OF_VEHICLE,
      response: data,
    });
  };
};
export const filter_on_price_range = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_PRICE_RANGE,
      response: data,
    });
  };
};
export const filter_on_trim = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_TRIM,
      response: data,
    });
  };
};
export const filter_on_year_range = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_YEAR_RANGE,
      response: data,
    });
  };
};
export const filter_on_transmission = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_TRANSMISSION,
      response: data,
    });
  };
};
export const filter_on_kilometer_range = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_KILOMETER_RANGE,
      response: data,
    });
  };
};
export const filter_on_condition = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_CONDITION,
      response: data,
    });
  };
};
export const filter_on_seller_type = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_SELLER_TYPE,
      response: data,
    });
  };
};
export const filter_on_color = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_COLOR,
      response: data,
    });
  };
};
export const filter_on_features = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_FEATURES,
      response: data,
    });
  };
};
export const filter_on_make = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_MAKE,
      response: data,
    });
  };
};
export const filter_on_model = (data) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_ON_MODEL,
      response: data,
    });
  };
};
export const add_filters = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_FILTERS,
      response: data,
    });
  };
};
export const remove_filter = (name, value) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FILTER,
      name: value,
      key: name,
    });
  };
};
export const remove_filter_feature = (id) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FEATURE_NAME,
      response: id,
    });
  };
};
export const remove_all_filter = () => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ALL_FILTER,
    });
  };
};
export const remove_all_posts = () => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ALL_POST,
    });
  };
};
export const get_list_filter_values = () => {
  return (dispatch) => {
    dispatch({
      type: GET_POST_LIST_FILTERS_LOADING,
      status: true,
    });
    const url = `ad_details/max_price_km_year/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_POST_LIST_FILTERS_VALUES,
            response: response.data.data,
          });
        }
        dispatch({
          type: GET_POST_LIST_FILTERS_LOADING,
          status: false,
        });
        // }
      })
      .catch((err) => {
        dispatch({
          type: GET_POST_LIST_FILTERS_LOADING,
          status: false,
        });
        console.log(err.message);
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};
export const get_top_ads = (data) => {
  return (dispatch) => {
    dispatch({
      type: TOP_AD_LOADING,
      status: true,
    });
    // const url = `ads/`
    const url = `/listing/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      params: data,
      url,
    };
    simpleAxios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_TOP_ADS,
            response: response.data.data.results,
          });
        }
        dispatch({
          type: TOP_AD_LOADING,
          status: false,
        });
        // }
      })
      .catch((err) => {
        dispatch({
          type: TOP_AD_LOADING,
          status: false,
        });
        console.log(err.message);
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        toastr.error("Error", message.toString());
      });
  };
};

export const get_user_profile_data = (user_id) => {
  return (dispatch) => {
    const url = `/buyer_details/b_detail/${user_id}/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    axios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_USER_PROFILE_DATA_FOR_LISTING,
            response: response.data.data,
          });
        }
      })
      .catch((err) => {
        toastr.error("Error", err.message.toString());
      });
  };
};
/**
 *
 * Dealer Update
 *
 */
export const get_dealer_profile_data = (user_id) => {
  return (dispatch) => {
    const url = `/dealer_details/d_detail/${user_id}/`;
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=utf8" },
      url,
    };
    axios(options)
      .then((response) => {
        if (
          response.data.success !== undefined &&
          response.data.success == true
        ) {
          dispatch({
            type: GET_DEALER_PROFILE_DATA_FOR_LISTING,
            response: response.data.data,
          });
        }
      })
      .catch((err) => {
        const message =
          err.response !== undefined && err.response !== null
            ? err.response.data.message !== undefined
              ? err.response.data.message
              : err.message
            : err.message;
        // toastr.error("Error", message.toString());
      });
  };
};
