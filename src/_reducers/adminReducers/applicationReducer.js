import {
    GET_PENDING_ACTIVE_APPLICATIONS,
    LOADING_ADMIN_APPLICATIONS,
    UPDATE_APPLICATION_ROW_DATA,
    SINGLE_CHECK_APPLICATION,
    TOGGLE_ALL_CHECK_APPLICATION,
    REMOVE_ALL_STATE_APPLICATION,
    TOGGLE_VEHICLE_MAKE_EDIT_POST_APP_ADMIN,
    GET_VEHICLE_MAKES_EDIT_POST_APP_ADMIN,
    TOGGLE_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
    GET_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
    TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
    GET_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
    EDIT_POST_APP_LOADING_ADMIN,
    EDIT_POST_APP_UPDATE_ADMIN,
    GET_ADDTIONAL_TYPE_ADMIN,
    REMOVE_UPDATE_ROW_APPLICATION,
    DELETE_ADDTIONAL_INFO_LOADING_ADMIN,
    DELETE_ADDTIONAL_INFO_ADMIN,
    DELETE_VEHICLE_DETAIL_ADMIN,
    DELETE_VEHICLE_DETAIL_LOADING_ADMIN,
    DELETE_UPLOADED_DOC_ADMIN,
    DELETE_UPLOAD_DOC_LOADING_ADMIN,
    FLINKS_REQUEST_ID_RESPONSE_ADMIN,
    LOADING_FLINKS_REQUEST_ID_ADMIN,
    LOADING_FLINKS_LOGIN_ID_ADMIN,
    FLINKS_LOGIN_ID_RESPONSE_ADMIN,
    DELETE_SINGLE_APPLICATION,
    LOADING_DELETE_SINGLE_APPLICATION,
    DELETE_MULTIPLE_APPLICATION,
    GET_CREDIT_REPORT_DATA,
    LOADING_ADMIN_EDIT_POST_STOCK_DETAIL,
    ADMIN_EDIT_POST_STOCK_DETAIL,
    ADMIN_DELETE_COAPPLICANT_INFO,
    ADMIN_DELETE_COAPPLICANT_LOADING,
    UPDATE_APPLICATION_STATUSES,
    GET_CO_APPLICANT_CREDIT_REPORT_DATA,
    GET_AGENTS_APPLICATON,
    EDIT_ADMIN_POST_APP_UPDATE_UPLOAD_DOC,
    DELETE_LOAN_DOC,
    GET_PDF_DATA,
    GET_ASSIGNED_DEALER,
    GET_UNIT_FROM
} from '../../_constants/constants'

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
    // personal_complete: false,
    // employement_complete: false,
    // co_personal_complete: false,
    // co_employement_complete: false,
    // assets_complete: false,
    // seller_complete: false,
    // addtional_complete: false,
    // verify_identity_complete: false,
    // income_verification_complete: false,
    // loan_payment_complete: false,
    // loan_document_complete: false,
    // upload_doc_complete: false,
    personal_complete: '',
    employement_complete: '',
    co_personal_complete: '',
    co_employement_complete: '',
    assets_complete: '',
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
    unit_froms: [],
    assigned_dealers: [],
    updateTradeIn: false,
}

const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AGENTS_APPLICATON: {
            return {
                ...state,
                agent_listing: action.response,
            }
        }
        case UPDATE_APPLICATION_STATUSES: {
            return {
                ...state,
                [action.stateName]: action.status
            }
        }
        case GET_CO_APPLICANT_CREDIT_REPORT_DATA: {
            return {
                ...state,
                co_applicant_credit_report: action.response
            }
        }
        case LOADING_ADMIN_APPLICATIONS: {
            return {
                ...state,
                loading: action.status,
                application_data: [],
                pages: [],
                total_count: 0,
            }
        }
        case GET_PENDING_ACTIVE_APPLICATIONS: {
            return {
                ...state,
                application_data: action.response,
                pages: action.pages,
                total_count: action.count,
                loading: false,
                checkedAllApplication: false,
            }
        }
        case SINGLE_CHECK_APPLICATION: {
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

        case TOGGLE_ALL_CHECK_APPLICATION: {
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
        case GET_ADDTIONAL_TYPE_ADMIN: {
            return {
                ...state,
                addtional_types: action.response,

            };
        }
        case UPDATE_APPLICATION_ROW_DATA: {
            return {
                ...state,
                application_detail: action.response
            }
        }
        case GET_CREDIT_REPORT_DATA: {

            return {
                ...state,
                application_credit_detail: action.response
            }
        }

        case TOGGLE_VEHICLE_MAKE_EDIT_POST_APP_ADMIN: {
            return {
                ...state,
                loading_make: action.status
            }
        }
        case GET_VEHICLE_MAKES_EDIT_POST_APP_ADMIN: {
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
        case TOGGLE_VEHICLE_MODEL_EDIT_POST_APP_ADMIN: {
            return {
                ...state,
                loading_model: action.status
            }
        }
        case GET_VEHICLE_MODEL_EDIT_POST_APP_ADMIN: {
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
        case TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN: {
            return {
                ...state,
                loading_trim: action.status
            }
        }
        case GET_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN: {
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
        case EDIT_POST_APP_LOADING_ADMIN: {
            return {
                ...state,
                loading_update: action.status,
                // upload_doc_id: action.id
            }
        }
        case EDIT_ADMIN_POST_APP_UPDATE_UPLOAD_DOC: {
            return {
                ...state,
                application_detail: {
                    ...state.application_detail,
                    docs: [...state.application_detail.docs, ...action.response]
                }
            }
        }
        case EDIT_POST_APP_UPDATE_ADMIN: {
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
        case DELETE_ADDTIONAL_INFO_LOADING_ADMIN: {
            return {
                ...state,
                loading_delete_addtional: action.status
            }
        }
        case DELETE_ADDTIONAL_INFO_ADMIN: {
            return {
                ...state,
                deleteAddtionalInfo: !state.deleteAddtionalInfo
            }
        }
        case DELETE_VEHICLE_DETAIL_ADMIN: {
            return {
                ...state,
                deleteVehicleDetail: !state.deleteVehicleDetail
            }
        }
        case DELETE_VEHICLE_DETAIL_LOADING_ADMIN: {
            return {
                ...state,
                loading_delete_vehicle: action.status
            }
        }
        case DELETE_UPLOADED_DOC_ADMIN: {
            return {
                ...state,
                deleteUploadedDoc: !state.deleteUploadedDoc,
                application_detail: {
                    ...state.application_detail,
                    docs: state.application_detail.docs.filter(item => Number(item.id) !== Number(action.id))
                }
            }
        }
        case DELETE_UPLOAD_DOC_LOADING_ADMIN: {
            return {
                ...state,
                loading_delete_uploaded_doc: action.status,
                delete_doc_id: action.id

            }
        }
        case LOADING_FLINKS_REQUEST_ID_ADMIN: {
            return {
                ...state,
                loadingFlinksRequestId: action.status
            }
        }
        case FLINKS_REQUEST_ID_RESPONSE_ADMIN: {
            return {
                ...state,
                flinks_login_id: action.response
            }
        }
        case LOADING_FLINKS_LOGIN_ID_ADMIN: {
            return {
                ...state,
                loadingFlinksLogin: action.status
            }
        }
        case FLINKS_LOGIN_ID_RESPONSE_ADMIN: {
            return {
                ...state,
                flinks_login_response: action.response

            }
        }
        case LOADING_DELETE_SINGLE_APPLICATION: {
            return {
                ...state,
                delete_application_loading: action.status,
                delete_application_id: action.id
            }
        }
        case DELETE_SINGLE_APPLICATION: {
            const application_data = state.application_data.filter(item => Number(item.id) !== Number(action.id))
            return {
                ...state,
                application_data
            }
        }
        case DELETE_MULTIPLE_APPLICATION: {
            let application_data = state.application_data
            action.ids.map(item => {
                application_data = application_data.filter(app => Number(app.id) !== Number(item))
            })
            return {
                ...state,
                application_data
            }
        }
        case ADMIN_EDIT_POST_STOCK_DETAIL: {
            return {
                ...state,
                stock_detail: action.response
            }
        }
        case LOADING_ADMIN_EDIT_POST_STOCK_DETAIL: {
            return {
                ...state,
                loading_stock_id_detail: action.status
            }
        }
        case ADMIN_DELETE_COAPPLICANT_LOADING: {
            return {
                ...state,
                delete_co_applicant_loading: action.status
            }
        }
        case ADMIN_DELETE_COAPPLICANT_INFO: {
            return {
                ...state,
                co_applicant_delete: !state.co_applicant_delete
            }
        }
        case DELETE_LOAN_DOC: {
            return {
                ...state,
                loan_loading: action.status,
                loan_delete: action.deleted
            }
        }
        case REMOVE_UPDATE_ROW_APPLICATION: {
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
                delete_application_id: '',
                updateTradeIn: false,
            }
        }
        case REMOVE_ALL_STATE_APPLICATION: {
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
                delete_application_id: '',
                updateTradeIn: false,
            }

        }
        case GET_ASSIGNED_DEALER: {
            return {
                ...state,
                assigned_dealers: action.response
            }
        }
        case GET_UNIT_FROM: {
            return {
                ...state,
                unit_froms: action.response
            }
        }

        case GET_PDF_DATA: {
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