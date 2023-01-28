import {
    GET_TYPE_VEHICLES,
    TOGGLE_VEHICLE_TYPE,
    TOGGLE_VEHICLE_MAKE,
    GET_VEHICLE_MAKES,
    TOGGLE_VEHICLE_MODEL,
    GET_VEHICLE_MODEL,
    GET_VEHICLE_BODY_TYPE,
    GET_VEHICLE_FUEL_TYPE,
    GET_VEHICLE_DRIVE_TRAIN,
    GET_VEHICLE_FEATURES,
    GET_VEHICLE_TRIMS,
    TOGGLE_VEHICLE_TRIMS,
    TOGGLE_VEHICLE_FEATURES,
    SEND_SUCCESS_MESSAGE,
    REMOVE_ALL_FEATURES,
    REMOVE_ALL_POST_STATE,
    SAVED_POST_START,
    SAVED_POST_END,
    REMOVE_ALL,
    CREATE_PAYMENT_INTENT,
    REMOVE_CLIENT_SECRET,
    VEHICLE_FEATURES_LOADER,
    VEHICLE_DRIVE_TRAIN_LOADER,
    VEHICLE_FUEL_TYPE_LOADER,
    VEHICLE_BODY_TYPE_LOADER,
    REMOVE_SPECIFIC_STATE,
    PAYPAL_PAYMENT_DONE,
    PAYPAL_PAYMENT_INTENT,
    REMOVE_CARD_INTENTS,
    GET_AD_POST_DETAIL_EDIT,
    GET_POST_AD_EDIT_LOADING,
    DEFAULT_SELECT_FEATURES,
    REMOVE_ALL_SELECTED_FEATURES
} from '../_constants/constants'
import { toastr } from 'react-redux-toastr'
import axios from '../_helpers/axiosInterceptors'
import simpleAxios from '../_helpers/axios'

export const get_vehicle_type = (data) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_TYPE,
            status: false
        })

        const url = `/type_of_vehicle/list/`
        let options = {}
        if (data !== undefined && data !== null) {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: data,
                url
            }
        } else {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                url
            }
        }
        simpleAxios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_TYPE_VEHICLES,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: GET_TYPE_VEHICLES,
                    response: []
                })
            }
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_TYPE,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_make = (id, data) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_MAKE,
            status: false
        })

        const url = `/v_make/retrieve_by_type/${id}/`
        let options = {}
        if (data !== undefined && data !== null) {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: data,
                url
            }
        } else {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                url
            }
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_MAKES,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_MAKES,
                    response: []
                })
            }
            // dispatch({
            //     type: TOGGLE_VEHICLE_MAKE,
            //     status: true
            // })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MAKE,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_model = (id, data) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_MODEL,
            status: false
        })

        const url = `/v_model/retrieve_by_make/${id}/`
        let options = {}
        if (data !== undefined && data !== null) {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: data,
                url
            }
        } else {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                url
            }
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_MODEL,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_MODEL,
                    response: []
                })
            }
            // dispatch({
            //     type: TOGGLE_VEHICLE_MODEL,
            //     status: true
            // })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MODEL,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_trims = (modelId, data) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_TRIMS,
            status: false
        })

        const url = `/v_trim/retrieve_by_model/${modelId}/`
        let options = {}
        if (data !== undefined && data !== null) {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: data,
                url
            }
        } else {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                url
            }
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_TRIMS,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_TRIMS,
                    response: []
                })
            }
            // dispatch({
            //     type: TOGGLE_VEHICLE_TRIMS,
            //     status: true
            // })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_TRIMS,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}

export const get_sub_type_vehicle_make = (id) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_MAKE,
            status: false
        })

        const url = `/v_make/retrieve_by_subtype/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_MAKES,
                    response: response.data.data
                })
            }
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MAKE,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_body_type = (id, data) => {
    return dispatch => {
        dispatch({
            type: VEHICLE_BODY_TYPE_LOADER,
            status: true
        })
        const url = `/body_type/retrieve_by_type/${id}/`
        let options = {}
        if (data !== undefined && data !== null) {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: data,
                url
            }
        } else {
            options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                url
            }
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_BODY_TYPE,
                    response: response.data.data
                })
            }
            dispatch({
                type: VEHICLE_BODY_TYPE_LOADER,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: VEHICLE_BODY_TYPE_LOADER,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_fuel_type = () => {
    return dispatch => {
        dispatch({
            type: VEHICLE_FUEL_TYPE_LOADER,
            status: true
        })
        const url = `/fuel_type/list/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_FUEL_TYPE,
                    response: response.data.data
                })
            }
            dispatch({
                type: VEHICLE_FUEL_TYPE_LOADER,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: VEHICLE_FUEL_TYPE_LOADER,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_drive_train = () => {
    return dispatch => {
        dispatch({
            type: VEHICLE_DRIVE_TRAIN_LOADER,
            status: true
        })
        const url = `/drive_train/list/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_DRIVE_TRAIN,
                    response: response.data.data
                })
            }
            dispatch({
                type: VEHICLE_DRIVE_TRAIN_LOADER,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: VEHICLE_DRIVE_TRAIN_LOADER,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_feature = (id) => {
    return dispatch => {
        dispatch({
            type: VEHICLE_FEATURES_LOADER,
            status: true
        })
        const url = `/v_features/list/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_FEATURES,
                    response: response.data.data
                })
            }
            dispatch({
                type: VEHICLE_FEATURES_LOADER,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: VEHICLE_FEATURES_LOADER,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}

export const create_ad_post = (data) => {
    return dispatch => {
        const script = document.createElement('script')
        script.src = "/assets/js/gtagScript.js";
        script.async = true;
        script.id = "gtagScript"
        document.body.appendChild(script);
        dispatch({
            type: SAVED_POST_START

        })
        const url = `/ad_details/create/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: data,
            url
        }
        axios(options).then(response => {
            document.body.removeChild(script);
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: SEND_SUCCESS_MESSAGE

                })
            }
            dispatch(remove_all_features())
            // toastr.success('Success', "Ad Post Created Successfully")

        }).catch(err => {
            document.body.removeChild(script);
            dispatch({
                type: SAVED_POST_END
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const create_payment_intent = (payment) => {
    return dispatch => {
        dispatch({
            type: SAVED_POST_START

        })
        const url = `/create-payment-intent/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: JSON.stringify({ amount: [{ value: payment.amountPay }] }),
            url
        }
        simpleAxios(options)
            .then(async res => {
                if (res.data !== undefined && res.data.clientSecret !== undefined) {
                    dispatch({
                        type: CREATE_PAYMENT_INTENT,
                        response: res.data.clientSecret
                    })
                    // toastr.success('Success', "Ad Post Created Successfully")
                } else {
                    dispatch({
                        type: SAVED_POST_END
                    })
                    toastr.error('Error', "Error In Intent Creation")
                }
                //  res.json();
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message

                toastr.error('Error', message)
                // dispatch({
                //     type: SEND_SUCCESS_MESSAGE

                // })
                dispatch({
                    type: SAVED_POST_END
                })
                console.log(err.response)
            })
    }
}
export const create_post_success = () => {
    return dispatch => {
        dispatch({
            type: SEND_SUCCESS_MESSAGE
        })
    }
}
export const post_ad_end = () => {
    return dispatch => {
        dispatch({
            type: SAVED_POST_END
        })
    }
}
export const toggle_vehicle_features = (id) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_FEATURES,
            id: id
        })
    }
}
export const remove_all_features = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_FEATURES
        })
    }
}
export const remove_all_post_state = () => {
    return dispatch => {

        dispatch({
            type: REMOVE_ALL_POST_STATE
        })
    }
}
export const remove_all = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL
        })
    }
}
export const remove_client_secret = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_CLIENT_SECRET
        })
        dispatch({
            type: SAVED_POST_END
        })
    }
}
export const handle_blur_make_model_trim = (name) => {
    return dispatch => {
        if (name === 'model') {
            dispatch({
                type: TOGGLE_VEHICLE_MODEL,
                status: true
            })
        } else if (name === 'make') {
            dispatch({
                type: TOGGLE_VEHICLE_MAKE,
                status: true
            })
        } else if (name === 'trim') {
            dispatch({
                type: TOGGLE_VEHICLE_TRIMS,
                status: true
            })
        }
    }
}
export const remove_specific_state = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_SPECIFIC_STATE
        })
    }
}
export const paypal_intent_create = (data) => {
    return dispatch => {
        dispatch({
            type: PAYPAL_PAYMENT_INTENT,
            response: data
        })
    }
}
export const payal_transcation = (data) => {
    return dispatch => {
        dispatch({
            type: SAVED_POST_START
        })
        const url = `/paypal-transaction-complete/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        simpleAxios(options)
            .then(async res => {
                console.log(res)
                if (res.data.status_code !== undefined && res.data.status_code !== null && res.data.status_code === 201) {
                    dispatch({
                        type: PAYPAL_PAYMENT_DONE,
                        response: res.data
                    })
                    toastr.success("Payment Done Successfully")
                } else {
                    dispatch({
                        type: SAVED_POST_END
                    })
                    toastr.error('Error', "Error In Payment Creation")
                }
                //  res.json();
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message

                toastr.error('Error', message)
                dispatch({
                    type: SAVED_POST_END
                })
                console.log(err.response)
            })
    }
}
export const remove_card_intents = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_CARD_INTENTS
        })
    }
}
export const get_edit_post_ad_record = (id) => {
    return dispatch => {
        dispatch({
            type: GET_POST_AD_EDIT_LOADING,
            status: true
        })
        const url = `/ap_listings/${id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        simpleAxios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_AD_POST_DETAIL_EDIT,
                        response: response.data.data
                    })
                }
                dispatch({
                    type: GET_POST_AD_EDIT_LOADING,
                    status: false
                })
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_POST_AD_EDIT_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const default_select_feature = (data) => {
    return dispatch => {
        dispatch({
            type: DEFAULT_SELECT_FEATURES,
            response: data
        })

    }
}
export const update_ad_post = (data, ad_id) => {
    return dispatch => {
        dispatch({
            type: SAVED_POST_START
        })
        const url = `/ad_details/update/${ad_id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: SEND_SUCCESS_MESSAGE

                })
            }
            dispatch(remove_all_features())
            // toastr.success('Success', "Ad Post Created Successfully")

        }).catch(err => {
            dispatch({
                type: SAVED_POST_END
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const remove_selected_features = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_SELECTED_FEATURES
        })
    }
}