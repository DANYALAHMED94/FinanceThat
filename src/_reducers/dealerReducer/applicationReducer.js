import {
    GET_PENDING_ACTIVE_APPLICATIONS_DEALER,
    LOADING_DEALER_APPLICATIONS,
    UPDATE_APPLICATION_ROW_DATA_DEALER,
    SINGLE_CHECK_APPLICATION_DEALER,
    TOGGLE_ALL_CHECK_APPLICATION_DEALER,
    REMOVE_ALL_STATE_APPLICATION_DEALER,
    TOGGLE_VEHICLE_MAKE_EDIT_POST_APP_DEALER,
    GET_VEHICLE_MAKES_EDIT_POST_APP_DEALER,
    TOGGLE_VEHICLE_MODEL_EDIT_POST_APP_DEALER,
    GET_VEHICLE_MODEL_EDIT_POST_APP_DEALER,
    TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP_DEALER,
    GET_VEHICLE_TRIMS_EDIT_POST_APP_DEALER,
    EDIT_POST_APP_LOADING_DEALER,
    EDIT_POST_APP_UPDATE_DEALER,
    GET_ADDTIONAL_TYPE_DEALER,
    REMOVE_UPDATE_ROW_APPLICATION_DEALER,
    DELETE_ADDTIONAL_INFO_LOADING_DEALER,
    DELETE_ADDTIONAL_INFO_DEALER,
    DELETE_VEHICLE_DETAIL_DEALER,
    DELETE_VEHICLE_DETAIL_LOADING_DEALER,
    DELETE_UPLOADED_DOC_DEALER,
    DELETE_UPLOAD_DOC_LOADING_DEALER,
    FLINKS_REQUEST_ID_RESPONSE_DEALER,
    LOADING_FLINKS_REQUEST_ID_DEALER,
    LOADING_FLINKS_LOGIN_ID_DEALER,
    FLINKS_LOGIN_ID_RESPONSE_DEALER,
    DELETE_SINGLE_APPLICATION_DEALER,
    LOADING_DELETE_SINGLE_APPLICATION_DEALER,
    DELETE_MULTIPLE_APPLICATION_DEALER,
    GET_CREDIT_REPORT_DATA_DEALER,
    LOADING_DEALER_EDIT_POST_STOCK_DETAIL,
    DEALER_EDIT_POST_STOCK_DETAIL,
    DEALER_DELETE_COAPPLICANT_INFO,
    DEALER_DELETE_COAPPLICANT_LOADING,
    UPDATE_APPLICATION_STATUSES_DEALER,
    GET_CO_APPLICANT_CREDIT_REPORT_DATA_DEALER,
    GET_AGENTS_APPLICATON_DEALER,
    EDIT_DEALER_POST_APP_UPDATE_UPLOAD_DOC,
    DELETE_LOAN_DOC_DEALER,
    GET_PDF_DATA_DEALER,
    TOGGLE_VEHICLE_TYPE_DEALER,
    GET_TYPE_VEHICLES_DEALER
} from '../../_constants/dealerConstants'

const initialState = {
    loading: false,
    application_data: [],
    addtional_types: [],
    loading_make: false,
    vehicle_makes: [],
    loading_model: false,
    vehicle_models: [],
    loading_trim: false,
    vehicle_trims: [],
    application_detail: [],
    application_credit_detail: [],
    loading_update: false,
    updateBuyerApplicationPersonal: false,
    updateBuyerApplicationEmployement: false,
    updateCoBuyerApplicationPersonal: false,
    updateCoBuyerApplicationEmployement: false,
    updateSellerDetail: false,
    updateAssetsDetail: false,
    updateTradeIn: false,
    updateAddtionalInfo: false,
    updateVerifyIdentity: false,
    updateIncomeVerify: false,
    updateLoanPaymant: false,
    updateLoanDoc: false,
    deleteAddtionalInfo: false,
    updateAdminLoanDocumentDetail: false,
    loading_delete_addtional: false,
    loading_delete_vehicle: false,
    deleteVehicleDetail: false,
    loading_delete_uploaded_doc: false,
    deleteUploadedDoc: false,
    loadingFlinksRequestId: false,
    flinks_login_id: '',
    loadingFlinksLogin: false,
    flinks_login_response: '',
    adminDocumentRequest: false,
    updateAssignAgent: false,
    delete_doc_id: '',
    upload_doc_id: '',
    adminLoanDocumentUpload: false,
    delete_application_loading: false,
    delete_application_id: '',
    loading_stock_id_detail: false,
    stock_detail: [],
    co_applicant_delete: false,
    delete_co_applicant_loading: false,
    personal_complete: '',
    employement_complete: '',
    co_personal_complete: '',
    co_employement_complete: '',
    assets_complete: '',
    trade_in_complete: "",
    seller_complete: '',
    addtional_complete: '',
    verify_identity_complete: '',
    income_verification_complete: '',
    loan_payment_complete: '',
    loan_document_complete: '',
    upload_doc_complete: '',
    co_applicant_credit_report: [],
    total_count: 0,
    pages: [],
    agent_listing: [],
    loan_loading: false,
    loan_delete: false,
    pdf_data: [],
    vehicle_types: []
}

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_VEHICLE_TYPE_DEALER: {
            return {
                ...state,
                vehicle_types: []
            }
        }
        case GET_TYPE_VEHICLES_DEALER: {
            return {
                ...state,
                vehicle_types: action.response
            }
        }
        case GET_AGENTS_APPLICATON_DEALER: {
            return {
                ...state,
                agent_listing: action.response,
            }
        }
        case UPDATE_APPLICATION_STATUSES_DEALER: {
            return {
                ...state,
                [action.stateName]: action.status
            }
        }
        case GET_CO_APPLICANT_CREDIT_REPORT_DATA_DEALER: {
            return {
                ...state,
                co_applicant_credit_report: action.response
            }
        }
        case LOADING_DEALER_APPLICATIONS: {
            return {
                ...state,
                loading: action.status,
                application_data: [],
                pages: [],
                total_count: 0,
            }
        }
        case GET_PENDING_ACTIVE_APPLICATIONS_DEALER: {
            return {
                ...state,
                application_data: action.response,
                pages: action.pages,
                total_count: action.count,
                loading: false,
                checkedAllApplication: false,
            }
        }
        case SINGLE_CHECK_APPLICATION_DEALER: {
            let application_data = state.application_data.slice().map(item => {
                if (Number(item.id) === Number(action.id)) {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                return item
            })

            const checkLength = application_data.filter(item => item.isChecked === true)
            return {
                ...state,
                checkedAllApplication: (application_data || []).length === (checkLength || []).length,
                application_data: application_data
            }
        }

        case TOGGLE_ALL_CHECK_APPLICATION_DEALER: {
            return {
                ...state,
                checkedAllApplication: action.status,
                application_data: state.application_data.slice().map(item => {
                    return {
                        ...item,
                        isChecked: action.status
                    }
                }),

            }
        }
        case GET_ADDTIONAL_TYPE_DEALER: {
            return {
                ...state,
                addtional_types: action.response,

            };
        }
        case UPDATE_APPLICATION_ROW_DATA_DEALER: {
            return {
                ...state,
                application_detail: action.response
            }
        }
        case GET_CREDIT_REPORT_DATA_DEALER: {

            return {
                ...state,
                application_credit_detail: action.response
            }
        }

        case TOGGLE_VEHICLE_MAKE_EDIT_POST_APP_DEALER: {
            return {
                ...state,
                loading_make: action.status
            }
        }
        case GET_VEHICLE_MAKES_EDIT_POST_APP_DEALER: {
            let data = state.vehicle_makes;
            delete data[`vehicle${action.index}${action.prevId}`]
            data = {
                ...data,
                [`vehicle${action.index}${action.id}`]: action.response
            }
            return {
                ...state,
                vehicle_makes: data
            }
        }
        case TOGGLE_VEHICLE_MODEL_EDIT_POST_APP_DEALER: {
            return {
                ...state,
                loading_model: action.status
            }
        }
        case GET_VEHICLE_MODEL_EDIT_POST_APP_DEALER: {
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
        }
        case TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP_DEALER: {
            return {
                ...state,
                loading_trim: action.status
            }
        }
        case GET_VEHICLE_TRIMS_EDIT_POST_APP_DEALER: {
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
        }
        case EDIT_POST_APP_LOADING_DEALER: {
            return {
                ...state,
                loading_update: action.status,
                // upload_doc_id: action.id
            }
        }
        case EDIT_DEALER_POST_APP_UPDATE_UPLOAD_DOC: {
            return {
                ...state,
                application_detail: {
                    ...state.application_detail,
                    docs: [...state.application_detail.docs, ...action.response]
                }
            }
        }
        case EDIT_POST_APP_UPDATE_DEALER: {
            // if (action.screenName === 'updateCoBuyerApplicationEmployement') {
            //     return {
            //         ...state,
            //         [action.screenName]: !state[action.screenName],
            //         application_detail: action.response
            //     }
            // } else
            if (action.screenName === 'updateAddtionalInfo') {
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
            } else if (action.screenName === 'adminDocumentRequest') {
                return {
                    ...state,
                    [action.screenName]: !state[action.screenName],
                    application_detail: action.response
                }
            } else if (action.screenName === 'adminLoanDocumentUpload') {
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
        case DELETE_ADDTIONAL_INFO_LOADING_DEALER: {
            return {
                ...state,
                loading_delete_addtional: action.status
            }
        }
        case DELETE_ADDTIONAL_INFO_DEALER: {
            return {
                ...state,
                deleteAddtionalInfo: !state.deleteAddtionalInfo
            }
        }
        case DELETE_VEHICLE_DETAIL_DEALER: {
            return {
                ...state,
                deleteVehicleDetail: !state.deleteVehicleDetail
            }
        }
        case DELETE_VEHICLE_DETAIL_LOADING_DEALER: {
            return {
                ...state,
                loading_delete_vehicle: action.status
            }
        }
        case DELETE_UPLOADED_DOC_DEALER: {
            return {
                ...state,
                deleteUploadedDoc: !state.deleteUploadedDoc,
                application_detail: {
                    ...state.application_detail,
                    docs: state.application_detail.docs.filter(item => Number(item.id) !== Number(action.id))
                }
            }
        }
        case DELETE_UPLOAD_DOC_LOADING_DEALER: {
            return {
                ...state,
                loading_delete_uploaded_doc: action.status,
                delete_doc_id: action.id

            }
        }
        case LOADING_FLINKS_REQUEST_ID_DEALER: {
            return {
                ...state,
                loadingFlinksRequestId: action.status
            }
        }
        case FLINKS_REQUEST_ID_RESPONSE_DEALER: {
            return {
                ...state,
                flinks_login_id: action.response
            }
        }
        case LOADING_FLINKS_LOGIN_ID_DEALER: {
            return {
                ...state,
                loadingFlinksLogin: action.status
            }
        }
        case FLINKS_LOGIN_ID_RESPONSE_DEALER: {
            return {
                ...state,
                flinks_login_response: action.response

            }
        }
        case LOADING_DELETE_SINGLE_APPLICATION_DEALER: {
            return {
                ...state,
                delete_application_loading: action.status,
                delete_application_id: action.id
            }
        }
        case DELETE_SINGLE_APPLICATION_DEALER: {
            const application_data = state.application_data.filter(item => Number(item.id) !== Number(action.id))
            return {
                ...state,
                application_data
            }
        }
        case DELETE_MULTIPLE_APPLICATION_DEALER: {
            let application_data = state.application_data
            action.ids.map(item => {
                application_data = application_data.filter(app => Number(app.id) !== Number(item))
            })
            return {
                ...state,
                application_data
            }
        }
        case DEALER_EDIT_POST_STOCK_DETAIL: {
            return {
                ...state,
                stock_detail: action.response
            }
        }
        case LOADING_DEALER_EDIT_POST_STOCK_DETAIL: {
            return {
                ...state,
                loading_stock_id_detail: action.status
            }
        }
        case DEALER_DELETE_COAPPLICANT_LOADING: {
            return {
                ...state,
                delete_co_applicant_loading: action.status
            }
        }
        case DEALER_DELETE_COAPPLICANT_INFO: {
            return {
                ...state,
                co_applicant_delete: !state.co_applicant_delete
            }
        }
        case DELETE_LOAN_DOC_DEALER: {
            return {
                ...state,
                loan_loading: action.status,
                loan_delete: action.deleted
            }
        }
        case REMOVE_UPDATE_ROW_APPLICATION_DEALER: {
            return {
                ...state,
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
                updateTradeIn: false,
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
                adminDocumentRequest: false,
                updateAssignAgent: false,
                delete_doc_id: '',
                upload_doc_id: '',
                adminLoanDocumentUpload: false,
                delete_application_loading: false,
                delete_application_id: ''
            }
        }
        case REMOVE_ALL_STATE_APPLICATION_DEALER: {
            return {
                ...state,
                loading: false,
                application_data: [],
                pages: [],
                checkedAllApplication: false,
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
                updateTradeIn: false,
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
                adminDocumentRequest: false,
                updateAssignAgent: false,
                delete_doc_id: '',
                upload_doc_id: '',
                adminLoanDocumentUpload: false,
                delete_application_loading: false,
                delete_application_id: ''
            }

        }
        case GET_PDF_DATA_DEALER: {
            return {
                ...state,
                pdf_data: action.response
            }
        }
        default:
            return state
    }
}
export default applicationReducer