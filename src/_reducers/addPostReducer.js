import {
    GET_TYPE_VEHICLES,
    GET_VEHICLE_MAKES,
    GET_VEHICLE_MODEL,
    GET_VEHICLE_BODY_TYPE,
    GET_VEHICLE_TRIMS,
    TOGGLE_VEHICLE_TRIMS,
    GET_VEHICLE_FUEL_TYPE,
    GET_VEHICLE_DRIVE_TRAIN,
    GET_VEHICLE_FEATURES,
    TOGGLE_VEHICLE_FEATURES,
    SAVED_POST_START,
    SEND_SUCCESS_MESSAGE,
    SAVED_POST_END,
    REMOVE_ALL_FEATURES,
    REMOVE_ALL_POST_STATE,
    TOGGLE_VEHICLE_MAKE,
    TOGGLE_VEHICLE_MODEL,
    TOGGLE_VEHICLE_TYPE,
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
} from '../_constants/constants';

const initialState = {
    type_of_vehicle: [],
    vehicle_make: [],
    vehicle_model: [],
    vehicle_body: [],
    vehicle_trims: [],
    vehicle_drive_train: [],
    vehicle_fuel_type: [],
    vehicle_features: [],
    update_view: false,
    isLoading: false,
    removeLoaderMake: false,
    removeLoaderModel: false,
    removeLoaderType: false,
    removeLoaderTrims: false,
    loaderFeatures: false,
    loaderDriveTrain: false,
    loaderFuelType: false,
    loaderBodyType: false,
    clientSecret: {},
    paypalPayment: false,
    paypalIntentData: {},
    postEditLoading: false,
    post_ad_detail_edit: [],
    paypal_api_response: {}
}

const addPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVED_POST_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case SAVED_POST_END: {
            return {
                ...state,
                isLoading: false
            }
        }
        case TOGGLE_VEHICLE_TYPE: {
            return {
                ...state,
                removeLoaderType: action.status,
                type_of_vehicle: []
            }
        }
        case GET_TYPE_VEHICLES: {
            return {
                ...state,
                type_of_vehicle: action.response,
                removeLoaderType: !state.removeLoaderType
            };
        }
        case TOGGLE_VEHICLE_MAKE: {
            return {
                ...state,
                removeLoaderMake: action.status,
                vehicle_make: []
            }
        }
        case GET_VEHICLE_MAKES: {
            return {
                ...state,
                vehicle_make: action.response,
                removeLoaderMake: true
            };
        }
        case TOGGLE_VEHICLE_MODEL: {
            return {
                ...state,
                removeLoaderModel: action.status,
                vehicle_model: []
            }
        }
        case GET_VEHICLE_MODEL: {
            return { ...state, vehicle_model: action.response, removeLoaderModel: true };
        }
        case TOGGLE_VEHICLE_TRIMS: {
            return {
                ...state,
                removeLoaderTrims: action.status,
                vehicle_trims: []
            }
        }
        case GET_VEHICLE_TRIMS: {
            return { ...state, vehicle_trims: action.response, removeLoaderTrims: true };
        }
        case GET_VEHICLE_BODY_TYPE: {
            return { ...state, vehicle_body: action.response };
        }
        case GET_VEHICLE_FUEL_TYPE: {
            return { ...state, vehicle_fuel_type: action.response };
        }
        case GET_VEHICLE_DRIVE_TRAIN: {
            return { ...state, vehicle_drive_train: action.response };
        }
        case GET_VEHICLE_FEATURES: {
            return { ...state, vehicle_features: action.response };
        }
        case TOGGLE_VEHICLE_FEATURES: {
            const features = state.vehicle_features.slice().map(item => {
                if (item.id === action.id) {
                    return {
                        ...item, checked: !item.checked
                    }
                }
                return item
            })
            return {
                ...state,
                vehicle_features: features
            }
        }
        case REMOVE_ALL_FEATURES: {
            const features = state.vehicle_features.slice().map(item => {
                return {
                    ...item,
                    checked: false
                }
            })
            return {
                ...state,
                vehicle_features: features,
                isLoading: false,
            }
        }
        case REMOVE_ALL_POST_STATE: {
            const features = state.vehicle_features.slice().map(item => {
                return {
                    ...item,
                    checked: false
                }
            })
            return {
                ...state,
                vehicle_features: features,
                isLoading: false,

            }
        }
        case PAYPAL_PAYMENT_INTENT: {
            return {
                ...state,
                paypalIntentData: action.response
            }
        }
        // case PAYPAL_PAYMENT_DONE: {
        //     return {
        //         ...state,
        //         paypalPayment: true
        //     }
        // }
        case REMOVE_ALL: {
            return {
                type_of_vehicle: [],
                vehicle_make: [],
                vehicle_model: [],
                vehicle_body: [],
                vehicle_trims: [],
                vehicle_drive_train: [],
                vehicle_fuel_type: [],
                vehicle_features: [],
                update_view: false,
                isLoading: false,
                removeLoaderMake: false,
                removeLoaderModel: false,
                removeLoaderType: false,
                removeLoaderTrims: false,
                loaderFeatures: false,
                loaderDriveTrain: false,
                loaderFuelType: false,
                loaderBodyType: false,
                clientSecret: {},
                paypalPayment: false,
                paypalIntentData: {},
                postEditLoading: false,
                post_ad_detail_edit: []
            }
        }
        case REMOVE_SPECIFIC_STATE: {
            return {
                ...state,
                vehicle_make: [],
                vehicle_model: [],
                vehicle_body: [],
                vehicle_features: [],
                removeLoaderMake: false,
                removeLoaderModel: false,
                removeLoaderType: false
            }
        }
        case SEND_SUCCESS_MESSAGE: {
            return {
                ...state,
                update_view: !state.update_view,
                isLoading: false,
                clientSecret: {},
                paypalIntentData: {},
                paypalPayment: false,
            }
        }
        case CREATE_PAYMENT_INTENT: {
            return {
                ...state,
                clientSecret: action.response
            }
        }
        case REMOVE_CLIENT_SECRET: {
            return {
                ...state,
                clientSecret: ''
            }
        }
        case VEHICLE_FEATURES_LOADER: {
            return {
                ...state,
                loaderFeatures: action.status
            }
        }
        case VEHICLE_DRIVE_TRAIN_LOADER: {
            return {
                ...state,
                loaderDriveTrain: action.status
            }
        }
        case VEHICLE_FUEL_TYPE_LOADER: {
            return {
                ...state,
                loaderFuelType: action.status
            }
        }
        case VEHICLE_BODY_TYPE_LOADER: {
            return {
                ...state,
                loaderBodyType: action.status
            }
        }
        case REMOVE_CARD_INTENTS: {
            return {
                ...state,
                clientSecret: {},
                paypalPayment: false,
                paypalIntentData: {},
                paypal_api_response: {}
            }
        }
        case GET_AD_POST_DETAIL_EDIT: {
            return {
                ...state,
                post_ad_detail_edit: action.response
            }
        }
        case GET_POST_AD_EDIT_LOADING: {
            return {
                ...state,
                postEditLoading: action.status
            }
        }
        case DEFAULT_SELECT_FEATURES: {
            const features = (state.vehicle_features || []).slice().map(item => {
                return {
                    id: item.id,
                    v_features: item.v_features,
                    isChecked: action.response.filter((feat, featIndex) => Number(feat.id) === Number(item.id)) !== undefined && action.response.filter((feat, featIndex) => Number(feat.id) === Number(item.id)) !== null && action.response.filter((feat, featIndex) => Number(feat.id) === Number(item.id)).length > 0 ? true : false
                }

            })
            return {
                ...state,
                vehicle_features: features
            }
        }
        case PAYPAL_PAYMENT_DONE: {
            return {
                ...state,
                paypal_api_response: action.response,
                paypalPayment: true
            }
        }
        case REMOVE_ALL_SELECTED_FEATURES: {
            const features = (state.vehicle_features || []).slice().map(item => {
                return {
                    ...item,
                    checked: false
                }

            })
            return {
                ...state,
                vehicle_features: features
            }
        }
        default:
            return { ...state }
    }
}
export default addPostReducer