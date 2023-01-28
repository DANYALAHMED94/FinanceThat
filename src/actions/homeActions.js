import {
    GET_UNDER_LISTING, UNDER_LISTING_LOADING, FEATURE_LISTING_LOADING, GET_FEATURED_LISTING, NEW_LISTING_LOADING, GET_NEW_LISTING, REDUCE_PRICE_LOADING, GET_REDUCE_PRICE_LISTING, GET_HOME_VEHICLE_DETAIL, HOME_VEHICLE_DETAIL_LOADING, CHANGE_MONTHLY_PAYMENT_HOME,
    GET_DOWN_PAYMENT,
    SAVED_AD_POST_HOME,
    GET_HOME_MOTORCYCLE_DETAIL,
    HOME_MOTORCYCLE_DETAIL_LOADING,
    LOADING_SAVED_AD_POST_HOME,
    CHNAGE_MAP_LNG_LAT,
    CHNAGE_AUTO_COMPLETE_LNG_LAT,
    TOGGLE_HOME_VEHICLE_TYPE,
    GET_TYPE_VEHICLES_HOME,
    GET_MULTI_MODEL_HOME,
    TOGGLE_HOME_VEHICLE_MULTI_MODEL,
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
} from '../_constants/constants';
import { toastr } from 'react-redux-toastr'
import simpleAxios from '../_helpers/axios'
import axios from '../_helpers/axiosInterceptors'

export const get_vehicle_type = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_HOME_VEHICLE_TYPE,
            status: false
        })

        const url = `/type_of_vehicle/list/`
        let options = {}
        options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_TYPE_VEHICLES_HOME,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: GET_TYPE_VEHICLES_HOME,
                    response: []
                })
            }
        }).catch(err => {
            dispatch({
                type: TOGGLE_HOME_VEHICLE_TYPE,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}

export const get_multi_vehicle_models = (data) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_HOME_VEHICLE_MULTI_MODEL,
            status: false
        })
        const url = `/vmodels_by_make_list/`
        let options = {}
        options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        simpleAxios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_MULTI_MODEL_HOME,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: GET_MULTI_MODEL_HOME,
                    response: []
                })
            }
            dispatch({
                type: TOGGLE_HOME_VEHICLE_MULTI_MODEL,
                status: true
            })
        }).catch(err => {
            dispatch({
                type: TOGGLE_HOME_VEHICLE_MULTI_MODEL,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}

export const get_featured_listing = (data) => {
    return dispatch => {
        dispatch({
            type: FEATURE_LISTING_LOADING,
            loading: true
        })
        const url = `/ad_details/featured_listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                // if (response.data.details == undefined && response.data.detail == undefined) {
                console.log(response.data)
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_FEATURED_LISTING,
                        response: response.data.data
                    })
                }
                dispatch({
                    type: FEATURE_LISTING_LOADING,
                    loading: false
                })
            })
            .catch(err => {
                dispatch({
                    type: FEATURE_LISTING_LOADING,
                    loading: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const get_under_listing = (data) => {
    return dispatch => {
        dispatch({
            type: UNDER_LISTING_LOADING,
            loading: true
        })
        const url = `/ad_details/under_listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_UNDER_LISTING,
                        response: response.data.data
                    })
                }
                dispatch({
                    type: UNDER_LISTING_LOADING,
                    loading: false
                })
            })
            .catch(err => {
                dispatch({
                    type: UNDER_LISTING_LOADING,
                    loading: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const get_new_listing = (data) => {
    return dispatch => {
        dispatch({
            type: NEW_LISTING_LOADING,
            loading: true
        })
        const url = `/ad_details/new_listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_NEW_LISTING,
                        response: response.data.data
                    })
                }
                dispatch({
                    type: NEW_LISTING_LOADING,
                    loading: false
                })
            })
            .catch(err => {
                dispatch({
                    type: NEW_LISTING_LOADING,
                    loading: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const get_reduce_price_listing = (data) => {
    return dispatch => {
        dispatch({
            type: REDUCE_PRICE_LOADING,
            loading: true
        })
        const url = `/ad_details/rprice_listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.details == undefined && response.data.detail == undefined) {
                    dispatch({
                        type: GET_REDUCE_PRICE_LISTING,
                        response: response.data.data
                    })
                }
                dispatch({
                    type: REDUCE_PRICE_LOADING,
                    loading: false
                })
            })
            .catch(err => {
                dispatch({
                    type: REDUCE_PRICE_LOADING,
                    loading: false
                })
                toastr.error('Error', err.message.toString())
            })
    }
}

export const get_home_type_vehicle_detail = (data) => {
    return dispatch => {
        dispatch({
            type: HOME_VEHICLE_DETAIL_LOADING,
            status: true
        })
        // const url = `/ads/`
        const url = `/listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_HOME_VEHICLE_DETAIL,
                        response: response.data.data.results
                    })
                } else {
                    dispatch({
                        type: GET_HOME_VEHICLE_DETAIL,
                        response: []
                    })
                }
                dispatch({
                    type: HOME_VEHICLE_DETAIL_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: HOME_VEHICLE_DETAIL_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_home_motorcycle_detail = (data) => {
    return dispatch => {
        dispatch({
            type: HOME_MOTORCYCLE_DETAIL_LOADING,
            status: true
        })
        // const url = `/ads/`
        const url = `/listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_HOME_MOTORCYCLE_DETAIL,
                        response: response.data.data.results
                    })
                } else {
                    dispatch({
                        type: GET_HOME_MOTORCYCLE_DETAIL,
                        response: []
                    })
                }
                dispatch({
                    type: HOME_MOTORCYCLE_DETAIL_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: HOME_MOTORCYCLE_DETAIL_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_home_power_sport_detail = (data) => {
    return dispatch => {
        dispatch({
            type: HOME_POWERSPORT_DETAIL_LOADING,
            status: true
        })
        // const url = `/ads/`
        const url = `/listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_HOME_POWERSPORT_DETAIL,
                        response: response.data.data.results
                    })
                } else {
                    dispatch({
                        type: GET_HOME_POWERSPORT_DETAIL,
                        response: []
                    })
                }
                dispatch({
                    type: HOME_POWERSPORT_DETAIL_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: HOME_POWERSPORT_DETAIL_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_home_rv_detail = (data) => {
    return dispatch => {
        dispatch({
            type: HOME_RV_DETAIL_LOADING,
            status: true
        })
        // const url = `/ads/`
        const url = `/listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_HOME_RV_DETAIL,
                        response: response.data.data.results
                    })
                } else {
                    dispatch({
                        type: GET_HOME_RV_DETAIL,
                        response: []
                    })
                }
                dispatch({
                    type: HOME_RV_DETAIL_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: HOME_RV_DETAIL_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_home_boat_detail = (data) => {
    return dispatch => {
        dispatch({
            type: HOME_BOAT_DETAIL_LOADING,
            status: true
        })
        // const url = `/ads/`
        const url = `/listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_HOME_BOAT_DETAIL,
                        response: response.data.data.results
                    })
                } else {
                    dispatch({
                        type: GET_HOME_BOAT_DETAIL,
                        response: []
                    })
                }
                dispatch({
                    type: HOME_BOAT_DETAIL_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: HOME_BOAT_DETAIL_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_home_trailer_detail = (data) => {
    return dispatch => {
        dispatch({
            type: HOME_TRAILER_DETAIL_LOADING,
            status: true
        })
        // const url = `/ads/`
        const url = `/listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_HOME_TRAILER_DETAIL,
                        response: response.data.data.results
                    })
                } else {
                    dispatch({
                        type: GET_HOME_TRAILER_DETAIL,
                        response: []
                    })
                }
                dispatch({
                    type: HOME_TRAILER_DETAIL_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: HOME_TRAILER_DETAIL_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_home_small_equipemnt_detail = (data) => {
    return dispatch => {
        dispatch({
            type: HOME_SMALL_EQUIPMENT_DETAIL_LOADING,
            status: true
        })
        // const url = `/ads/`
        const url = `/listing/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            params: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_HOME_SMALL_EQUIPMENT_DETAIL,
                        response: response.data.data.results
                    })
                } else {
                    dispatch({
                        type: GET_HOME_SMALL_EQUIPMENT_DETAIL,
                        response: []
                    })
                }
                dispatch({
                    type: HOME_SMALL_EQUIPMENT_DETAIL_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: HOME_SMALL_EQUIPMENT_DETAIL_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_monthly_payment = (amount) => {
    return dispatch => {
        dispatch({
            type: CHANGE_MONTHLY_PAYMENT_HOME,
            amount: amount
        })
    }
}

export const get_down_payment = (amount) => {
    return dispatch => {
        dispatch({
            type: GET_DOWN_PAYMENT,
            amount: amount
        })
    }
}
export const saved_ad_post = (data, filter_name) => {
    return dispatch => {
        dispatch({
            type: LOADING_SAVED_AD_POST_HOME,
            status: true
        })
        const url = `/ad_details/saved_ads/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    // dispatch({
                    //     type: SAVED_AD_POST_HOME,
                    //     response: data,
                    //     filter_name: filter_name
                    // })
                    // toastr.success('Success', 'Ad Saved')
                }
                dispatch({
                    type: LOADING_SAVED_AD_POST_HOME,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_SAVED_AD_POST_HOME,
                    status: false
                })
                console.log(err.message)
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const un_saved_ad_post = (data, filter_name) => {
    return dispatch => {
        dispatch({
            type: LOADING_SAVED_AD_POST_HOME,
            status: true
        })
        const url = `/ad_details/saved_ads/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    // dispatch({
                    //     type: SAVED_AD_POST_HOME,
                    //     response: data,
                    //     filter_name: filter_name
                    // })
                    // toastr.success('Success', 'Ad Un Saved')
                }
                dispatch({
                    type: LOADING_SAVED_AD_POST_HOME,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_SAVED_AD_POST_HOME,
                    status: false
                })
                console.log(err.message)
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())

            })
    }
}
export const saved_ad_post_vehicle_area = (data, filter_name) => {
    return dispatch => {
        dispatch({
            type: LOADING_SAVED_AD_POST_HOME,
            status: true,
            ad_id: data.ad_id
        })
        const url = `/ad_details/saved_ads/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: SAVED_AD_POST_HOME,
                        response: data,
                        filter_name: filter_name
                    })
                    // toastr.success('Success', 'Ad Saved')
                }
                dispatch({
                    type: LOADING_SAVED_AD_POST_HOME,
                    status: false,
                    ad_id: data.ad_id
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_SAVED_AD_POST_HOME,
                    status: false,
                    ad_id: data.ad_id
                })
                console.log(err.message)
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const un_saved_ad_post_vehicle_area = (data, filter_name) => {
    return dispatch => {
        dispatch({
            type: LOADING_SAVED_AD_POST_HOME,
            status: true,
            ad_id: data.ad_id
        })
        const url = `/ad_details/saved_ads/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: SAVED_AD_POST_HOME,
                        response: data,
                        filter_name: filter_name
                    })
                    // toastr.success('Success', 'Ad Un Saved')
                }
                dispatch({
                    type: LOADING_SAVED_AD_POST_HOME,
                    status: false,
                    ad_id: data.ad_id
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_SAVED_AD_POST_HOME,
                    status: false,
                    ad_id: data.ad_id
                })
                console.log(err.message)
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())

            })
    }
}
export const change_map_lng_lat = (data) => {
    return dispatch => {
        dispatch({
            type: CHNAGE_MAP_LNG_LAT,
            response: data
        })
    }
}
export const change_autoComplete_lng_lat = (data) => {
    return dispatch => {
        dispatch({
            type: CHNAGE_AUTO_COMPLETE_LNG_LAT,
            response: data
        })
    }
}