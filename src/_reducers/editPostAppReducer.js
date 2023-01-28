import {
    GET_ADDTIONAL_TYPE, GET_VEHICLE_MAKES_EDIT_POST_APP,
    TOGGLE_VEHICLE_MAKE_EDIT_POST_APP,
    GET_VEHICLE_MODEL_EDIT_POST_APP,
    TOGGLE_VEHICLE_MODEL_EDIT_POST_APP,
    TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP,
    GET_VEHICLE_TRIMS_EDIT_POST_APP,
    GET_EDIT_APPLICAITION_DETAIL,
    EDIT_POST_APP_LOADING,
    EDIT_POST_APP_UPDATE,
    DELETE_ADDTIONAL_INFO_LOADING,
    DELETE_ADDTIONAL_INFO,
    DELETE_VEHICLE_DETAIL,
    DELETE_VEHICLE_DETAIL_LOADING,
    DELETE_UPLOADED_DOC,
    DELETE_UPLOAD_DOC_LOADING,
    LOADING_FLINKS_REQUEST_ID,
    FLINKS_REQUEST_ID_RESPONSE,
    LOADING_FLINKS_LOGIN_ID,
    FLINKS_LOGIN_ID_RESPONSE,
    EDIT_POST_STOCK_DETAIL,
    LOADING_EDIT_POST_STOCK_DETAIL,
    DELETE_COAPPLICANT_INFO,
    DELETE_COAPPLICANT_LOADING,
    LOADING_EDIT_APPLICATION,
    EDIT_POST_APP_UPDATE_UPLOAD_DOC,
    EDIT_APPLICATION_NOT_FOUND
} from '../_constants/constants'

const initialState = {
    addtional_types: [],
    loading_make: false,
    vehicle_makes: [],
    loading_model: false,
    vehicle_models: [],
    loading_trim: false,
    vehicle_trims: [],
    application_detail: [],
    loading_update: false,
    updateBuyerApplicationPersonal: false,
    updateBuyerApplicationEmployement: false,
    updateCoBuyerApplicationPersonal: false,
    updateCoBuyerApplicationEmployement: false,
    updateSellerDetail: false,
    updateAssetsDetail: false,
    updateAddtionalInfo: false,
    updateVerifyIdentity: false,
    updateIncomeVerify: false,
    updateLoanPaymant: false,
    updateLoanDoc: false,
    deleteAddtionalInfo: false,
    loading_delete_addtional: false,
    loading_delete_vehicle: false,
    deleteVehicleDetail: false,
    loading_delete_uploaded_doc: false,
    deleteUploadedDoc: false,
    loadingFlinksRequestId: false,
    flinks_login_id: '',
    loadingFlinksLogin: false,
    flinks_login_response: '',
    uploadDocClient: false,
    delete_doc_id: '',
    loading_stock_id_detail: false,
    stock_detail: [],
    co_applicant_delete: false,
    delete_co_applicant_loading: false,
    loading_edit_application: false,
    showNotFound:false
}
const editPostAppReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDTIONAL_TYPE: {
            return {
                ...state,
                addtional_types: action.response,

            };
        }
        case LOADING_EDIT_APPLICATION: {
            return {
                ...state,
                loading_edit_application: action.status
            }
        }
        case GET_EDIT_APPLICAITION_DETAIL: {
            return {
                ...state,
                application_detail: action.response,
                showNotFound:false
            }
        }
        case EDIT_APPLICATION_NOT_FOUND: {
            return {
                ...state,
                application_detail: [],
                showNotFound:action.status
            }
        }
        case EDIT_POST_APP_UPDATE_UPLOAD_DOC: {
            return {
                ...state,
                application_detail: {
                    ...state.application_detail,
                    docs: [...state.application_detail.docs, ...action.response]
                }
            }
        }
        case TOGGLE_VEHICLE_MAKE_EDIT_POST_APP: {
            return {
                ...state,
                loading_make: action.status
            }
        }
        case GET_VEHICLE_MAKES_EDIT_POST_APP: {
            let data = state.vehicle_makes;
            // if (data[`vehicle${action.index}${}`] !== undefined && data[`vehicle${action.index}`] !== undefined && data[`vehicle${action.index}`].length > 0) {
            //     delete data.[`vehicle${action.index}${action.prevId}`]
            //     data[`vehicle${action.index}`] = action.response
            // } else {
            delete data[`vehicle${action.index}${action.prevId}`]
            data = {
                ...data,
                [`vehicle${action.index}${action.id}`]: action.response
            }
            // }

            return {
                ...state,
                // vehicle_makes: [...state.vehicle_makes, ...action.response]
                vehicle_makes: data
            }
        }
        case TOGGLE_VEHICLE_MODEL_EDIT_POST_APP: {
            return {
                ...state,
                loading_model: action.status
            }
        }
        case GET_VEHICLE_MODEL_EDIT_POST_APP: {
            let data = state.vehicle_models;
            delete data[`vehicle${action.index}${action.prevId}`]
            data = {
                ...data,
                [`vehicle${action.index}${action.id}`]: action.response
            }
            return {
                ...state,
                vehicle_models: data
            }
            // if (data[`vehicle${action.index}`] !== undefined && data[`vehicle${action.index}`] !== undefined && data[`vehicle${action.index}`].length > 0) {
            //     data[`vehicle${action.index}`] = action.response
            // } else {
            //     data = {
            //         ...data,
            //         [`vehicle${action.index}`]: action.response
            //     }
            // }
            // return {
            //     ...state,
            //     vehicle_models: data
            //     // vehicle_models: [...state.vehicle_models, action.response]
            // }
        }
        case TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP: {
            return {
                ...state,
                loading_trim: action.status
            }
        }
        case GET_VEHICLE_TRIMS_EDIT_POST_APP: {
            let data = state.vehicle_trims;
            delete data[`vehicle${action.index}${action.prevId}`]
            data = {
                ...data,
                [`vehicle${action.index}${action.id}`]: action.response
            }
            return {
                ...state,
                vehicle_trims: data
            }
            // let data = state.vehicle_trims;
            // if (data[`vehicle${action.index}`] !== undefined && data[`vehicle${action.index}`] !== undefined && data[`vehicle${action.index}`].length > 0) {
            //     data[`vehicle${action.index}`] = action.response
            // } else {
            //     data = {
            //         ...data,
            //         [`vehicle${action.index}`]: action.response
            //     }
            // }
            // return {
            //     ...state,
            //     // vehicle_trims: [...state.vehicle_trims, action.response]
            //     vehicle_trims: data
            // }
        }
        case EDIT_POST_APP_LOADING: {
            return {
                ...state,
                loading_update: action.status
            }
        }
        case EDIT_POST_APP_UPDATE: {
            if (action.screenName === 'uploadDocClient') {
                return {
                    ...state,
                    [action.screenName]: !state[action.screenName],
                    application_detail: action.response
                }
            } else if (action.screenName === 'updateCoBuyerApplicationEmployement') {
                return {
                    ...state,
                    [action.screenName]: !state[action.screenName],
                    application_detail: action.response
                }
            } else if (action.screenName === 'updateAddtionalInfo') {
                return {
                    ...state,
                    [action.screenName]: !state[action.screenName],
                    application_detail: action.response
                }
            } else if (action.screenName === 'updateAssetsDetail') {
                return {
                    ...state,
                    [action.screenName]: !state[action.screenName],
                    application_detail: action.response
                }
            } else {
                return {
                    ...state,
                    [action.screenName]: !state[action.screenName]
                }
            }

        }
        case DELETE_ADDTIONAL_INFO_LOADING: {
            return {
                ...state,
                loading_delete_addtional: action.status
            }
        }
        case DELETE_ADDTIONAL_INFO: {
            return {
                ...state,
                deleteAddtionalInfo: !state.deleteAddtionalInfo
            }
        }
        case DELETE_VEHICLE_DETAIL: {
            return {
                ...state,
                deleteVehicleDetail: !state.deleteVehicleDetail
            }
        }
        case DELETE_VEHICLE_DETAIL_LOADING: {
            return {
                ...state,
                loading_delete_vehicle: action.status
            }
        }
        case DELETE_UPLOADED_DOC: {
            return {
                ...state,
                deleteUploadedDoc: !state.deleteUploadedDoc,
                application_detail: {
                    ...state.application_detail,
                    docs: state.application_detail.docs.filter(item => Number(item.id) !== Number(action.id))
                }
            }
        }
        case DELETE_UPLOAD_DOC_LOADING: {
            return {
                ...state,
                loading_delete_uploaded_doc: action.status,
                delete_doc_id: action.id

            }
        }
        case LOADING_FLINKS_REQUEST_ID: {
            return {
                ...state,
                loadingFlinksRequestId: action.status
            }
        }
        case FLINKS_REQUEST_ID_RESPONSE: {
            return {
                ...state,
                flinks_login_id: action.response
            }
        }
        case LOADING_FLINKS_LOGIN_ID: {
            return {
                ...state,
                loadingFlinksLogin: action.status
            }
        }
        case FLINKS_LOGIN_ID_RESPONSE: {
            return {
                ...state,
                flinks_login_response: action.response

            }
        }
        case EDIT_POST_STOCK_DETAIL: {
            return {
                ...state,
                stock_detail: action.response
            }
        }
        case LOADING_EDIT_POST_STOCK_DETAIL: {
            return {
                ...state,
                loading_stock_id_detail: action.status
            }
        }
        case DELETE_COAPPLICANT_LOADING: {
            return {
                ...state,
                delete_co_applicant_loading: action.status
            }
        }
        case DELETE_COAPPLICANT_INFO: {
            return {
                ...state,
                co_applicant_delete: !state.co_applicant_delete
            }
        }
        default:
            return { ...state }
    }
}
export default editPostAppReducer