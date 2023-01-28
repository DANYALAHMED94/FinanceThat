import {
    GET_UNDER_LISTING, GET_FEATURED_LISTING, GET_NEW_LISTING, GET_REDUCE_PRICE_LISTING, UNDER_LISTING_LOADING,
    FEATURE_LISTING_LOADING,
    NEW_LISTING_LOADING,
    REDUCE_PRICE_LOADING,
    GET_HOME_VEHICLE_DETAIL,
    HOME_VEHICLE_DETAIL_LOADING,
    CHANGE_CREDIT_SCORE_HOME,
    SAVED_AD_POST_HOME,
    LOADING_SAVED_AD_POST_HOME,
    CHNAGE_MAP_LNG_LAT,
    CHNAGE_AUTO_COMPLETE_LNG_LAT,
    TOGGLE_HOME_VEHICLE_TYPE,
    GET_TYPE_VEHICLES_HOME,
    GET_MULTI_MODEL_HOME,
    TOGGLE_HOME_VEHICLE_MULTI_MODEL,
    GET_HOME_MOTORCYCLE_DETAIL,
    HOME_MOTORCYCLE_DETAIL_LOADING,
    HOME_SMALL_EQUIPMENT_DETAIL_LOADING,
    GET_HOME_SMALL_EQUIPMENT_DETAIL,
    HOME_POWERSPORT_DETAIL_LOADING,
    GET_HOME_POWERSPORT_DETAIL,
    HOME_RV_DETAIL_LOADING,
    GET_HOME_RV_DETAIL,
    HOME_BOAT_DETAIL_LOADING,
    GET_HOME_BOAT_DETAIL,
    HOME_TRAILER_DETAIL_LOADING,
    GET_HOME_TRAILER_DETAIL
} from '../_constants/constants'

const initialState = {
    featured_listing: [],
    featured_listing_loading: false,
    under_listing: [],
    under_listing_loading: false,
    reducer_price_listing: [],
    reduce_price_listing_loading: false,
    new_listing: [],
    new_listing_loading: false,
    home_vehicle_detail: [],
    vehicle_detail_loading: false,
    estimatedAPR: { lowAmount: 8, highAmount: 15, creditId: '3' },
    estimatedAPRValues: [{ lowAmount: 2.95, highAmount: 4.5, creditId: "0" },
    { lowAmount: 3.2, highAmount: 6.5, creditId: "1" },
    { lowAmount: 5, highAmount: 8.5, creditId: "2" },
    { lowAmount: 8, highAmount: 15, creditId: "3" },
    { lowAmount: 15, highAmount: 25, creditId: "4" }],
    totalAmount: 0,
    tax: 13,
    taxAmount: 0,
    monthlyPayment: 0,
    downPayment: 0,
    loading_saved_ad_home: false,
    map_lng: 0,
    map_lat: 0,
    autoComplete_lng: 0,
    autoComplete_lat: 0,
    autoComplete_update: false,
    loading_home_type_of_vehicle: false,
    type_of_vehicles: [],
    removeLoaderModel: false,
    vehicle_models: [],
    homeMotorcycleLoading: false,
    home_motorcycle_detail: [],
    home_trailer_detail: [],
    home_trailer_loading: false,
    home_power_sport_detail: [],
    home_power_sport_loading: false,
    home_rv_detail: [],
    home_rv_loading: false,
    home_boat_detail: [],
    home_boat_loading: false,
    home_small_equipment_detail: [],
    home_small_equipment_loading: false,
    home_vehicle_area_ad_id: ''
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME_SMALL_EQUIPMENT_DETAIL_LOADING: {
            return {
                ...state,
                home_small_equipment_loading: action.status
            }
        }
        case GET_HOME_SMALL_EQUIPMENT_DETAIL: {
            return {
                ...state,
                home_small_equipment_detail: action.response
            }
        }
        case HOME_POWERSPORT_DETAIL_LOADING: {
            return {
                ...state,
                home_power_sport_loading: action.status
            }
        }
        case GET_HOME_POWERSPORT_DETAIL: {
            return {
                ...state,
                home_power_sport_detail: action.response

            }
        }
        case HOME_RV_DETAIL_LOADING: {
            return {
                ...state,
                home_rv_loading: action.status
            }
        }
        case GET_HOME_RV_DETAIL: {
            return {
                ...state,
                home_rv_detail: action.response

            }
        }
        case HOME_BOAT_DETAIL_LOADING: {
            return {
                ...state,
                home_boat_loading: action.status
            }
        }
        case GET_HOME_BOAT_DETAIL: {
            return {
                ...state,
                home_boat_detail: action.response
            }
        }
        case HOME_TRAILER_DETAIL_LOADING: {
            return {
                ...state,
                home_trailer_loading: action.status
            }
        }
        case GET_HOME_TRAILER_DETAIL: {
            return {
                ...state,
                home_trailer_detail: action.response
            }
        }
        case GET_HOME_MOTORCYCLE_DETAIL: {
            return {
                ...state,
                home_motorcycle_detail: action.response
            }
        }
        case HOME_MOTORCYCLE_DETAIL_LOADING: {
            return {
                ...state,
                homeMotorcycleLoading: action.status
            }
        }
        case TOGGLE_HOME_VEHICLE_TYPE: {
            return {
                ...state,
                loading_home_type_of_vehicle: action.status
            }
        }
        case GET_TYPE_VEHICLES_HOME: {
            return {
                ...state,
                type_of_vehicles: action.response
            }
        }
        case TOGGLE_HOME_VEHICLE_MULTI_MODEL: {
            return {
                ...state,
                removeLoaderModel: action.status
            }
        }
        case GET_MULTI_MODEL_HOME: {
            return {
                ...state,
                vehicle_models: action.response
            }
        }
        case GET_FEATURED_LISTING: {
            return {
                ...state,
                featured_listing: action.response,
                featured_listing_loading: false
            };
        }
        case FEATURE_LISTING_LOADING: {
            return {
                ...state,
                featured_listing_loading: action.loading
            }
        }
        case GET_UNDER_LISTING: {
            return {
                ...state,
                under_listing: action.response,
                under_listing_loading: false
            }
        }
        case UNDER_LISTING_LOADING: {
            return {
                ...state,
                under_listing_loading: action.loading
            }
        }
        case GET_NEW_LISTING: {
            return {
                ...state,
                new_listing: action.response,
                new_listing_loading: false
            }
        }
        case NEW_LISTING_LOADING: {
            return {
                ...state,
                new_listing_loading: action.loading
            }
        }
        case GET_REDUCE_PRICE_LISTING: {
            return {
                ...state,
                reducer_price_listing: action.response,
                reduce_price_listing_loading: false
            }
        }
        case REDUCE_PRICE_LOADING: {
            return {
                ...state,
                reduce_price_listing_loading: action.loading
            }
        }
        case GET_HOME_VEHICLE_DETAIL: {
            return {
                ...state,
                home_vehicle_detail: action.response
            }
        }
        case HOME_VEHICLE_DETAIL_LOADING: {
            return {
                ...state,
                vehicle_detail_loading: action.status
            }
        }
        case CHANGE_CREDIT_SCORE_HOME: {
            const creditScore = state.estimatedAPRValues.filter(item => Number(item.creditId) === Number(action.response))[0]
            return {
                ...state,
                estimatedAPR: creditScore
            }
        }
        case LOADING_SAVED_AD_POST_HOME: {
            return {
                ...state,
                loading_saved_ad_home: action.status,
                home_vehicle_area_ad_id: action.ad_id
            }
        }
        case SAVED_AD_POST_HOME: {
            if (action.filter_name === 'home_vehicle_detail') {
                const home_vehicle_detail = state.home_vehicle_detail.slice().map(item => {
                    if (Number(item.id) === Number(action.response.ad_id)) {
                        return {
                            ...item,
                            saved_ad: !item.saved_ad
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    home_vehicle_detail,
                }
            } else if (action.filter_name === 'nav-newly') {
                const new_listing = state.new_listing.slice().map(item => {
                    if (Number(item.id) === Number(action.response.ad_id)) {
                        return {
                            ...item,
                            saved_ad: !item.saved_ad
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    new_listing,
                }
            } else if (action.filter_name === 'nav-most-viewed') {
                const featured_listing = state.featured_listing.slice().map(item => {
                    if (Number(item.id) === Number(action.response.ad_id)) {
                        return {
                            ...item,
                            saved_ad: !item.saved_ad
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    featured_listing,
                }
            } else if (action.filter_name === 'nav-reduced-price') {
                // const featured_listing = state.featured_listing.slice().map(item => {
                //     if (Number(item.id) === Number(action.response.ad_id)) {
                //         return {
                //             ...item,
                //             saved_ad: !item.saved_ad
                //         }
                //     }
                //     return item
                // })
                return {
                    ...state
                    // featured_listing,
                }
            } else {
                const under_listing = state.under_listing.slice().map(item => {
                    if (Number(item.id) === Number(action.response.ad_id)) {
                        return {
                            ...item,
                            saved_ad: !item.saved_ad
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    under_listing,
                }
            }

        }
        // case CHANGE_MONTHLY_PAYMENT_HOME: {

        // }
        case CHNAGE_MAP_LNG_LAT: {
            return {
                ...state,
                map_lng: action.response.lng,
                map_lat: action.response.lat,
            }
        }
        case CHNAGE_AUTO_COMPLETE_LNG_LAT: {
            return {
              ...state,
              autoComplete_lng: action.response.lng,
              autoComplete_lat: action.response.lat,
              autoComplete_update: !state.autoComplete_update,
            };
        }
        default:
            return { ...state }
    }
}
export default homeReducer