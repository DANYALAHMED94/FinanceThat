import {
  GET_POST_LIST_DETAIL,
  GET_POST_LIST_FILTERS,
  CHANGE_TYPE_OF_VEHICLE,
  SAVED_AD_POST,
  ADD_FILTERS,
  REMOVE_FILTER,
  REMOVE_FEATURE_NAME,
  REMOVE_ALL_FILTER,
  REMOVE_ALL_POST_STATE,
  REMOVE_ALL_POST,
  POST_LIST_DETAIL_LOADING,
  GET_POST_LIST_FILTERS_VALUES,
  GET_POST_LIST_FILTERS_LOADING,
  TOP_AD_LOADING,
  GET_TOP_ADS,
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
} from "../_constants/constants";

const initialState = {
  add_post_list: [],
  copy_add_post_list: [],
  post_list_filters: [],
  list_type_of_vehicle: [],
  list_vehicle_make: [],
  list_vehicle_model: [],
  selected_filter_list: [],
  showListSearchLoader: false,
  showloaderValues: false,
  get_search_values: [],
  top_ads: [],
  top_ads_loading: false,
  nextLoadMoreUrl: "",
  prevLoadMoreUrl: "",
  next_post_loading: false,
  loading_listing_type_of_vehicle: false,
  type_of_vehicles: [],
  removeLoaderMake: false,
  vehicle_make: [],
  removeLoaderModel: false,
  vehicle_model: [],
  loading_saved_ad: false,
  grid_ad_id: "",
  /** Dealer User Profile Data */
  firstName: "",
  lastName: "",
  streetAddress: "",
  postalCode: "",
  city: "",
  country: "",
  email: "",
  telephone: "",
  name: "",
  photo: "",
  base64_image: "",
  preview: null,
  get_user_profile: [],
  totalListing: "",
};

const listPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LISTING_VEHICLE_TYPE: {
      return {
        ...state,
        loading_listing_type_of_vehicle: action.status,
      };
    }
    case GET_TYPE_VEHICLES_LISTING: {
      return {
        ...state,
        type_of_vehicles: action.response,
      };
    }
    case TOGGLE_LISTING_MAKE: {
      return {
        ...state,
        removeLoaderMake: action.status,
      };
    }
    case GET_MAKE_LISTING: {
      return {
        ...state,
        vehicle_make: action.response,
      };
    }
    case GET_MULTI_MODEL_LISTING: {
      return {
        ...state,
        vehicle_model: action.response,
      };
    }
    // case TOGGLE_LISTING_MODEL: {
    //     return {
    //         ...state,
    //         removeLoaderModel: action.status
    //     }
    // }
    // case GET_MODEL_LISTING: {
    //     return {
    //         ...state,
    //         vehicle_model: action.response
    //     }
    // }
    case TOGGLE_LISTING_VEHICLE_MULTI_MODEL: {
      return {
        ...state,
        removeLoaderModel: action.status,
      };
    }
    case GET_POST_LIST_DETAIL: {
      return {
        ...state,
        add_post_list: action.response,
        copy_add_post_list: action.response,
        // add_post_list: action.response,
        // copy_add_post_list: action.response,
        type_of_vehicles: action.type_of_vehicles,
        vehicle_make: action.vehicle_make,
        vehicle_model: action.vehicle_model,
        sub_vehicle_type: action.sub_vehicle_type,
        nextLoadMoreUrl: action.next,
        prevLoadMoreUrl: action.previous,
        totalListing: action.totalListing,
        showListSearchLoader: false,
        body_types: action.bodyTypes,
      };
    }
    case POST_LIST_NEXT_DETAIL_LOADING: {
      return {
        ...state,
        next_post_loading: action.loading,
      };
    }
    case GET_POST_LIST_DETAIL_NEXT: {
      return {
        ...state,
        add_post_list: [...state.add_post_list, ...action.response],
        copy_add_post_list: [...state.copy_add_post_list, ...action.response],
        // copy_add_post_list: action.response,
        nextLoadMoreUrl: action.next,
        prevLoadMoreUrl: action.previous,
        next_post_loading: false,
      };
    }
    case GET_POST_LIST_FILTERS: {
      return {
        ...state,
        post_list_filters: action.response,
        list_type_of_vehicle:
          action.response.type_of_vehicle !== undefined &&
          action.response.type_of_vehicle !== null
            ? action.response.type_of_vehicle
            : [],
        list_vehicle_make:
          action.response.vehicle_make !== undefined &&
          action.response.vehicle_make !== null
            ? action.response.vehicle_make
            : [],
        list_vehicle_model:
          action.response.vehicle_model !== undefined &&
          action.response.vehicle_model !== null
            ? action.response.vehicle_model
            : [],
      };
    }
    case GET_POST_LIST_FILTERS_VALUES: {
      return {
        ...state,
        showloaderValues: false,
        get_search_values: action.response,
      };
    }
    case GET_POST_LIST_FILTERS_LOADING: {
      return {
        ...state,
        showloaderValues: action.status,
      };
    }
    case ADD_FILTERS: {
      return {
        ...state,
        selected_filter_list: [action.response],
      };
    }
    case REMOVE_FILTER: {
      let selected_filter_list = state.selected_filter_list;
      if (action.key === "typeOfVehicle") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.category == action.name) {
              return {
                ...item,
                category: "",
              };
            }
            return item;
          });
      }
      if (action.key === "vehicleSubType") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              subTypeName: item.subTypeName.filter(
                (subType) => Number(subType.id) !== Number(action.name)
              ),
            };
          });
      }
      if (action.key === "defaultSubTypeName") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              defaultSubTypeName: item.defaultSubTypeName.filter(
                (subType) => Number(subType.id) !== Number(action.name)
              ),
            };
          });
      }
      if (action.key === "vehicleMake") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              make: item.make.filter(
                (mak) => Number(mak.id) !== Number(action.name)
              ),
            };
          });
      }
      if (action.key === "vehicleModel") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              model: item.model.filter(
                (mod) => Number(mod.id) !== Number(action.name)
              ),
            };
          });
      }
      if (action.key === "selectTrim") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              trim: item.trim.filter(
                (tri) => Number(tri.id) !== Number(action.name)
              ),
            };
          });
      }
      if (action.key === "transmission") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              transmission: item.transmission.filter(
                (tri) => tri.id.toString() !== action.name.toString()
              ),
            };
          });
      }
      if (action.key === "condition") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              condition: item.condition.filter(
                (tri) => tri.id.toString() !== action.name.toString()
              ),
            };
          });
      }
      if (action.key === "color") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              color: item.color.filter(
                (tri) => tri.id.toString() !== action.name.toString()
              ),
            };
          });
      }
      if (action.key === "seller_type") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              seller_type: item.seller_type.filter(
                (tri) => Number(tri.id) != Number(action.name)
              ),
            };
          });
      }
      if (action.key === "vehicleFuel") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              vehicleFuel: item.vehicleFuel.filter(
                (tri) => Number(tri.id) != Number(action.name)
              ),
            };
          });
      }
      if (action.key === "vehicleDrive") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              vehicleDrive: item.vehicleDrive.filter(
                (tri) => Number(tri.id) != Number(action.name)
              ),
            };
          });
      }
      if (action.key === "vehicleBody") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              vehicleBody: item.vehicleBody.filter(
                (tri) => Number(tri.id) != Number(action.name)
              ),
            };
          });
      }
      if (action.key === "steering_type") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              steering_type: item.steering_type.filter(
                (tri) => tri.id.toString() !== action.name.toString()
              ),
            };
          });
      }
      // if (action.key === 'subTypeOfVehicle') {
      //     selected_filter_list = state.selected_filter_list.slice().map(item => {
      //         return {
      //             ...item, steering_type: item.steering_type.filter(tri => Number(tri.id) !== Number(action.name))
      //         }
      //     })
      // }

      if (action.key === "vehicleCylinder") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              vehicleCylinder: item.vehicleCylinder.filter(
                (tri) => Number(tri.id) !== Number(action.name)
              ),
            };
          });
      }
      if (action.key === "vehicleSeating") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              vehicleSeating: item.vehicleSeating.filter(
                (tri) => Number(tri.id) !== Number(action.name)
              ),
            };
          });
      }
      if (action.key === "vehicleOwner") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              vehicleOwner: item.vehicleOwner.filter(
                (tri) => tri.id.toString() !== action.name.toString()
              ),
            };
          });
      }
      if (action.key === "hullMaterial") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              hullMaterial: item.hullMaterial.filter(
                (tri) => tri.id.toString() !== action.name.toString()
              ),
            };
          });
      }
      if (action.key === "vehicleAccident") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              vehicleAccident: item.vehicleAccident.filter(
                (tri) => tri.id.toString() !== action.name.toString()
              ),
            };
          });
      }
      if (action.key === "vehiclePassenger") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              vehiclePassenger: item.vehiclePassenger.filter(
                (tri) => Number(tri.id) !== Number(action.name)
              ),
            };
          });
      }
      if (action.key === "location") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.location == action.name) {
              return {
                ...item,
                location: "",
              };
            }
            return item;
          });
      }
      if (action.key === "sortBy") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.sortBy == action.name) {
              return {
                ...item,
                sortBy: "",
              };
            }
            return item;
          });
      }
      if (action.key === "enginFilter") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.enginFilter == action.name) {
              return {
                ...item,
                enginFilter: "",
              };
            }
            return item;
          });
      }
      if (action.key === "hoursFilter") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.hoursFilter == action.name) {
              return {
                ...item,
                hoursFilter: "",
              };
            }
            return item;
          });
      }
      if (action.key === "lengthFilter") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.lengthFilter == action.name) {
              return {
                ...item,
                lengthFilter: "",
              };
            }
            return item;
          });
      }
      if (action.key === "weightFilter") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.weightFilter == action.name) {
              return {
                ...item,
                weightFilter: "",
              };
            }
            return item;
          });
      }
      if (action.key === "priceFilter") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.priceFilter == action.name) {
              return {
                ...item,
                priceFilter: "",
              };
            }
            return item;
          });
      }
      if (action.key === "kilometerFilter") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.kilometerFilter == action.name) {
              return {
                ...item,
                kilometerFilter: "",
              };
            }
            return item;
          });
      }
      if (action.key === "distanceFilter") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.distanceFilter == action.name) {
              return {
                ...item,
                distanceFilter: "",
              };
            }
            return item;
          });
      }
      if (action.key === "yearFilter") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            if (item.yearFilter == action.name) {
              return {
                ...item,
                yearFilter: "",
              };
            }
            return item;
          });
      }
      if (action.key === "allFeatures") {
        selected_filter_list = state.selected_filter_list
          .slice()
          .map((item) => {
            return {
              ...item,
              features: [],
            };
          });
      }
      // if (action.key === 'start_p') {
      //     selected_filter_list = state.selected_filter_list.slice().map(item => {
      //         if (item.start_p == action.name) {
      //             return {
      //                 ...item, start_p: ''
      //             }
      //         } return item
      //     })
      // }
      // if (action.key === 'end_p') {
      //     selected_filter_list = state.selected_filter_list.slice().map(item => {
      //         if (item.end_p == action.name) {
      //             return {
      //                 ...item, end_p: ''
      //             }
      //         } return item
      //     })
      // }
      return {
        ...state,
        selected_filter_list,
      };
    }
    case REMOVE_FEATURE_NAME: {
      const selected_filter_list = state.selected_filter_list
        .slice()
        .map((item) => {
          return {
            ...item,
            features: item.features.filter((fetId) => {
              return fetId.id !== action.response;
            }),
          };
        });
      return {
        ...state,
        selected_filter_list,
      };
    }
    case REMOVE_ALL_POST_STATE: {
      const selected_filter_list = state.selected_filter_list
        .slice()
        .map((item) => {
          return {
            ...item,
            features: item.features.filter((fetId) => {
              return fetId.id !== action.response;
            }),
          };
        });
      return {
        ...state,
        selected_filter_list,
      };
    }
    case REMOVE_ALL_FILTER: {
      return {
        ...state,
        selected_filter_list: [],
      };
    }
    case REMOVE_ALL_POST: {
      return {
        ...state,
        add_post_list: [],
        copy_add_post_list: [],
        post_list_filters: [],
        list_type_of_vehicle: [],
        list_vehicle_make: [],
        list_vehicle_model: [],
        selected_filter_list: [],
        showListSearchLoader: false,
        showloaderValues: false,
        get_search_values: [],
        next_post_loading: false,
        loading_saved_ad: false,
        grid_ad_id: "",
      };
    }
    case CHANGE_TYPE_OF_VEHICLE: {
      const list_type_of_vehicle = state.list_type_of_vehicle
        .slice()
        .map((item) => {
          if (item.id == action.response) {
            return {
              ...item,
              isSelected: !item.isSelected,
            };
          }
          return item;
        });
      return {
        ...state,
        list_type_of_vehicle,
      };
    }

    case SAVED_AD_POST: {
      const add_post_list = state.add_post_list.slice().map((item, index) => {
        if (item.id === action.response.ad_id) {
          return {
            ...item,
            saved_ad: !item.saved_ad,
          };
        }
        return item;
      });
      const copy_add_post_list = state.add_post_list
        .slice()
        .map((item, index) => {
          if (item.id === action.response.ad_id) {
            return {
              ...item,
              saved_ad: !item.saved_ad,
            };
          }
          return item;
        });
      return {
        ...state,
        add_post_list,
        copy_add_post_list,
      };
    }
    case SAVED_AD_POST_TOP_ADD: {
      const top_ads = state.top_ads.slice().map((item, index) => {
        if (item.id === action.response.ad_id) {
          return {
            ...item,
            saved_ad: !item.saved_ad,
          };
        }
        return item;
      });
      return {
        ...state,
        top_ads,
      };
    }
    case POST_LIST_DETAIL_LOADING: {
      return {
        ...state,
        showListSearchLoader: action.loading,
      };
    }
    case TOP_AD_LOADING: {
      return {
        ...state,
        top_ads_loading: action.status,
      };
    }
    case GET_TOP_ADS: {
      return {
        ...state,
        top_ads: action.response,
      };
    }
    case LOADING_SAVED_AD: {
      return {
        ...state,
        loading_saved_ad: action.status,
        grid_ad_id: action.ad_id,
      };
    }
    case GET_USER_PROFILE_DATA_FOR_LISTING: {
      return {
        ...state,
        get_user_profile: action.response,
        firstName:
          action.response.first_name !== undefined &&
          action.response.first_name !== null
            ? action.response.first_name
            : "",
        lastName:
          action.response.last_name !== undefined &&
          action.response.last_name !== null
            ? action.response.last_name
            : "",
        streetAddress:
          action.response.street !== undefined &&
          action.response.street !== null
            ? action.response.street
            : "",
        postalCode:
          action.response.postal_code !== undefined &&
          action.response.postal_code !== null
            ? action.response.postal_code
            : "",
        city:
          action.response.city !== undefined && action.response.city !== null
            ? action.response.city
            : "",
        country:
          action.response.country !== undefined &&
          action.response.country !== null
            ? action.response.country
            : "",
        telephone:
          action.response.telephone !== undefined &&
          action.response.telephone !== null
            ? action.response.telephone
            : "",
        // email: action.response.email == undefined && action.response.email !== null ? '' : action.response.email,
        email:
          action.response.user_id == undefined &&
          action.response.user_id !== null
            ? action.response.user_id.email !== undefined &&
              action.response.user_id.email !== null
              ? action.response.user_id.email
              : ""
            : "",
        name:
          action.response.name == undefined && action.response.name !== null
            ? ""
            : action.response.name,
        photo:
          action.response.photo == undefined && action.response.photo !== null
            ? ""
            : action.response.photo,
        base64_image:
          action.response.base64_image == undefined &&
          action.response.base64_image == null
            ? ""
            : action.response.base64_image,
      };
    }
    case GET_DEALER_PROFILE_DATA_FOR_LISTING: {
      return {
        ...state,
        get_user_profile: action.response,
        firstName:
          action.response.business_name !== undefined &&
          action.response.business_name !== null &&
          action.response.business_name !== ""
            ? action.response.business_name.split(" ")[0]
              ? action.response.business_name.split(" ")[0]
              : ""
            : "",
        lastName:
          action.response.business_name !== undefined &&
          action.response.business_name !== null &&
          action.response.business_name !== ""
            ? action.response.business_name.split(" ")[1]
              ? action.response.business_name.split(" ")[1]
              : ""
            : "",
        // lastName: action.response.operating_name !== undefined && action.response.operating_name !== null ? action.response.operating_name : '',
        streetAddress:
          action.response.street_address !== undefined &&
          action.response.street_address !== null
            ? action.response.street_address
            : "",
        postalCode:
          action.response.postal_code !== undefined &&
          action.response.postal_code !== null
            ? action.response.postal_code
            : "",
        city:
          action.response.city !== undefined && action.response.city !== null
            ? action.response.city
            : "",
        country:
          action.response.country !== undefined &&
          action.response.country !== null
            ? action.response.country
            : "",
        telephone:
          action.response.phone !== undefined &&
          action.response.business_name !== null
            ? action.response.phone
            : "",
        email:
          action.response.email == undefined && action.response.email == null
            ? ""
            : action.response.email,
        // name: action.response.name == undefined && action.response.name == null ? '' : action.response.name,
        name:
          action.response.business_name == undefined &&
          action.response.business_name == null
            ? ""
            : action.response.business_name,
        photo:
          action.response.photo == undefined && action.response.photo == null
            ? ""
            : action.response.photo,
        base64_image:
          action.response.base64_image == undefined &&
          action.response.base64_image == null
            ? ""
            : action.response.base64_image,
      };
    }
    default:
      return { ...state };
  }
};
export default listPostReducer;
