import {
    LOADING_PENDING_ACCOUNT,
    GET_PENDING_ACTIVE_ACCOUNTS,
    SINGLE_CHECK_PENDING,
    TOGGLE_ALL_CHECK,
    UPDATE_ACCOUNT_ROW_DATA,
    REMOVE_UPDATE_ROW,
    LOADING_PENDING_ACCOUNT_DECLINE,
    LOADING_PENDING_ACCOUNT_APPROVED,
    LOADING_PRIVATE_ACCOUNT_UPDATE,
    LOADING_DEALER_ACCOUNT_UPDATE,
    REMOVE_ALL_STATE_ACCOUNTS,
    LOADING_DEALER_DETAIL_UPDATE,
    DELETE_SINGLE_ACCOUNT,
    LOADING_DELETE_SINGLE_ACCOUNT,
    DELETE_MULTIPLE_ACCOUNT,
    UPDATE_ACCOUNT_DEALER_DATA,
    UNSELECT_DEALER_ACCOUNT_VEHICLE_LOCATION,
    DELETE_DEALER_ACCOUNT_DOCUMENT_LOADING,
    DEALER_ACCOUNT_VEHICLE_LOCATION,
    GET_DEALER_CREDIT_SCORE,
    DELETE_DEALER_CREDIT_SCORE,
    NEW_DEALER_CREDIT_SCORE
} from '../../_constants/constants'

const initialState = {
    loading: false,
    active_pending_accounts: [],
    checkedAllDealerAccount: false,
    checkedAllPendingAccount: false,
    update_account_row: [],
    loading_approved: false,
    loading_decline: false,
    update_account: false,
    loading_dealer_detail: false,
    delete_account_loading: false,
    delete_account_id: '',
    total_pages: [],
    total_count: 0,
    get_user_profile: [],
    firstName: '',
    lastName: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    country: '',
    telephone: '',
    email: "",
    name: "",
    website: "",
    fax: "",
    photo: null,
    base64_image: null,
    profile_update_loading: false,
    owners: [],
    interior_business_path: null,
    license_path: null,
    logo_path: null,
    no_of_owner: 0,
    void_check_path: null,
    exterior_business_path: null,
    locations: null,
    vehicle_preferences: null,
    dealer_id: '',
    admin_fee: '',
    vehicle_location_status: false,
    is_deleted: false,
    document_name: "",
    document_delete_loading: false,
    dealer_credit_score:[],
    province:"",
    application_type:null,
    vehicle_subtype_preferences:null
}

const pendingAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_PENDING_ACCOUNT: {
            return {
                ...state,
                loading: action.status,
                active_pending_accounts: [],
                total_count: 0,
                total_pages: []
            }
        }
        case GET_PENDING_ACTIVE_ACCOUNTS: {
            return {
                ...state,
                active_pending_accounts: action.response,
                loading: false,
                checkedAllDealerAccount: false,
                checkedAllPendingAccount: false,
                total_count: action.count,
                total_pages: action.pages
            }
        }
        case SINGLE_CHECK_PENDING: {
            let active_pending_accounts = state.active_pending_accounts.slice().map(item => {
                if (Number(item.id) === Number(action.id)) {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                return item
            })
            return {
                ...state,
                checkedAllDealerAccount: action.filterName === 'dealer' ? (active_pending_accounts || []).length === (active_pending_accounts.filter(item => item.isChecked) || []).length : state.checkedAllDealerAccount,
                checkedAllPendingAccount: action.filterName === 'private' ? (active_pending_accounts || []).length === (active_pending_accounts.filter(item => item.isChecked) || []).length : state.checkedAllPendingAccount,
                active_pending_accounts: active_pending_accounts
            }
            // let active_pending_accounts = state.active_pending_accounts.slice().map(item => {
            //     if (action.filterName === 'dealer') {
            //         return {
            //             ...item,
            //             dd_user_id: (item.dd_user_id || []).slice().map(dealer => {
            //                 if (Number(dealer.id) === Number(action.id)) {
            //                     return {
            //                         ...dealer,
            //                         isChecked: !dealer.isChecked
            //                     }
            //                 }
            //                 return dealer
            //             })
            //         }
            //     } else {
            //         return {
            //             ...item,
            //             bd_user_id: (item.bd_user_id || []).slice().map(buyer => {
            //                 if (Number(buyer.id) === Number(action.id)) {
            //                     return {
            //                         ...buyer,
            //                         isChecked: !buyer.isChecked
            //                     }
            //                 }
            //                 return buyer
            //             })
            //         }
            //     }
            // })

            // const checkLength = (active_pending_accounts.map(item => {
            //     return (item.dd_user_id.map(dealer => {
            //         if (dealer.isChecked === true) {
            //             return true
            //         } else {
            //             return false
            //         }
            //     })[0]) !== undefined ? (item.dd_user_id.map(dealer => {
            //         if (dealer.isChecked === true) {
            //             return true
            //         } else {
            //             return false
            //         }
            //     })[0]) : false
            // }))
            // return {
            //     ...state,
            //     checkedAllDealerAccount: action.filterName === 'dealer' ? (active_pending_accounts || []).length === (checkLength.filter(item => item === true) || []).length : state.checkedAllDealerAccount,
            //     checkedAllPendingAccount: action.filterName === 'private' ? (active_pending_accounts || []).length === (checkLength.filter(item => item === true) || []).length : state.checkedAllPendingAccount,
            //     active_pending_accounts: active_pending_accounts
            // }
        }
        case TOGGLE_ALL_CHECK: {
            return {
                ...state,
                checkedAllDealerAccount: action.filterName === 'dealer' ? action.status : state.checkedAllDealerAccount,
                checkedAllPendingAccount: action.filterName === 'private' ? action.status : state.checkedAllPendingAccount,
                active_pending_accounts: state.active_pending_accounts.slice().map(item => {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }),
                // active_pending_accounts: state.active_pending_accounts.slice().map(item => {
                //     if (action.filterName === 'dealer') {
                //         return {
                //             ...item,
                //             dd_user_id: (item.dd_user_id || []).slice().map(dealer => {
                //                 return {
                //                     ...dealer,
                //                     isChecked: action.status
                //                 }
                //             })
                //         }
                //     } else {
                //         return {
                //             ...item,
                //             bd_user_id: (item.bd_user_id || []).slice().map(buyer => {
                //                 return {
                //                     ...buyer,
                //                     isChecked: action.status
                //                 }
                //             })
                //         }
                //     }
                // }),

            }
        }
        case UPDATE_ACCOUNT_ROW_DATA: {
            return {
                ...state,
                update_account_row: action.response,
                loading: false
            }
        }
        case UPDATE_ACCOUNT_DEALER_DATA: {
            return {
                ...state,
                loading: false,
                update_account_row: action.response,
                get_user_profile: action.response,
                province: action.response.province !== undefined && action.response.province !== null ? action.response.province : '',
                locations: action.response.locations !== undefined && action.response.locations !== null ? action.response.locations : '',
                vehicle_preferences: action.response.vehicle_preferences !== undefined && action.response.vehicle_preferences !== null ? action.response.vehicle_preferences : '',
                vehicle_subtype_preferences: action.response.vehicle_subtype_preferences !== undefined && action.response.vehicle_subtype_preferences !== null ? action.response.vehicle_subtype_preferences : '',
                dealer_id: action.response.user_id !== undefined && action.response.user_id !== null ? Object.keys(action.response.user_id).length > 0 ? action.response.user_id.id : action.response.user_id : '',
                firstName: action.response.business_name !== undefined && action.response.business_name !== null && action.response.business_name !== '' ? action.response.business_name.split(' ')[0] ? action.response.business_name.split(' ')[0] : '' : '',
                lastName: action.response.business_name !== undefined && action.response.business_name !== null && action.response.business_name !== '' ? action.response.business_name.split(' ')[1] ? action.response.business_name.split(' ')[1] : '' : '',
                website: action.response.website !== undefined && action.response.website !== null ? action.response.website : '',
                fax: action.response.fax !== undefined && action.response.fax !== null ? action.response.fax : '',
                streetAddress: action.response.street_address !== undefined && action.response.street_address !== null ? action.response.street_address : '',
                postalCode: action.response.postal_code !== undefined && action.response.postal_code !== null ? action.response.postal_code : '',
                city: action.response.city !== undefined && action.response.city !== null ? action.response.city : '',
                country: action.response.country !== undefined && action.response.country !== null ? action.response.country : '',
                telephone: action.response.phone !== undefined && action.response.phone !== null ? action.response.phone : '',
                email: action.response.email == undefined && action.response.email == null ? '' : action.response.email,
                name: action.response.operating_name == undefined && action.response.operating_name == null ? '' : action.response.operating_name,
                owners: action.response.dealerdetail_id == undefined && action.response.dealerdetail_id == null ? [] : action.response.dealerdetail_id,
                logo_path: action.response.logo_path == undefined && action.response.logo_path == null ? '' : action.response.logo_path,
                interior_business_path: action.response.interior_business_path == undefined && action.response.interior_business_path == null ? null : action.response.interior_business_path,
                license_path: action.response.license_path == undefined && action.response.license_path == null ? null : action.response.license_path,
                no_of_owner: action.response.no_of_owner !== undefined && action.response.no_of_owner !== null ? action.response.no_of_owner : '',
                void_check_path: action.response.void_check_path == undefined && action.response.void_check_path == null ? null : action.response.void_check_path,
                exterior_business_path: action.response.exterior_business_path == undefined && action.response.exterior_business_path == null ? null : action.response.exterior_business_path,
                admin_fee: action.response.admin_fee == undefined && action.response.admin_fee == null ? '' : action.response.admin_fee,
                photo: action.response.photo == undefined && action.response.photo == null ? '' : action.response.photo,
                base64_image: action.response.base64_image == undefined && action.response.base64_image == null ? '' : action.response.base64_image,
                application_type:action.response.application_type == undefined && action.response.application_type == null ? '' : action.response.application_type,
            }
        }

        case DELETE_DEALER_ACCOUNT_DOCUMENT_LOADING: {
            return {
                ...state,
                document_delete_loading: action.status,
                document_name: action.document_name,
                is_deleted: typeof action.is_deleted !== "undefined" ? !state.is_deleted : state.is_deleted
            }
        }

        case REMOVE_UPDATE_ROW: {
            return {
                ...state,
                update_account_row: []
            }
        }
        case LOADING_PENDING_ACCOUNT_APPROVED: {
            return {
                ...state,
                loading_approved: action.status
            }
        }
        case LOADING_PENDING_ACCOUNT_DECLINE: {
            return {
                ...state,
                loading_decline: action.status
            }
        }
        case LOADING_PRIVATE_ACCOUNT_UPDATE: {
            return {
                ...state,
                update_account: action.status
            }
        }
        case LOADING_DEALER_ACCOUNT_UPDATE: {
            return {
                ...state,
                update_account: action.status
            }
        }
        case LOADING_DEALER_DETAIL_UPDATE: {
            return {
                ...state,
                loading_dealer_detail: action.status
            }
        }
        case UNSELECT_DEALER_ACCOUNT_VEHICLE_LOCATION: {
            return {
                ...state,
                vehicle_location_status: action.status
            }
        }
        case DEALER_ACCOUNT_VEHICLE_LOCATION: {
            if(action.dataType === 'vehicle'){
                return {
                    ...state,
                    vehicle_preferences:{...state.vehicle_preferences, ...action.response}
                }
            }
            if(action.dataType === 'location'){
                return {
                    ...state,
                    locations:{...state.locations, ...action.response}
                }
            }
            if(action.dataType === "subvehicle"){
                return {
                    ...state,
                    vehicle_subtype_preferences:{...state.vehicle_subtype_preferences, ...action.response}
                }
            }
            if(action.dataType === "application_type"){
                return {
                    ...state,
                    // application_type:{...state.application_type, ...action.response}
                }
            }

            return {...state}
        }
        case GET_DEALER_CREDIT_SCORE: {
            return {
                ...state,
                dealer_credit_score:action.response
            }
        }
        case DELETE_DEALER_CREDIT_SCORE: {
            return {
                ...state,
                dealer_credit_score:state.dealer_credit_score.filter(item=> +item.id !== +action.id)
            }
        }

        case NEW_DEALER_CREDIT_SCORE: {
            return {
                ...state,
                dealer_credit_score:[...state.dealer_credit_score, action.response]
            }
        }
        case REMOVE_ALL_STATE_ACCOUNTS: {
            return {
                loading: false,
                province:"",
                active_pending_accounts: [],
                checkedAllDealerAccount: false,
                checkedAllPendingAccount: false,
                update_account_row: [],
                loading_approved: false,
                loading_decline: false,
                update_account: false,
                get_user_profile: [],
                firstName: '',
                lastName: '',
                streetAddress: '',
                postalCode: '',
                city: '',
                country: '',
                telephone: '',
                email: "",
                name: "",
                website: "",
                fax: "",
                photo: null,
                base64_image: null,
                profile_update_loading: false,
                owners: [],
                interior_business_path: null,
                license_path: null,
                logo_path: null,
                no_of_owner: 0,
                void_check_path: null,
                exterior_business_path: null,
                locations: null,
                vehicle_preferences: null,
                vehicle_subtype_preferences:null,
                dealer_id: '',
                admin_fee: '',
                dealer_credit_score:[],
                application_type:null
            }
        }
        case LOADING_DELETE_SINGLE_ACCOUNT: {
            return {
                ...state,
                delete_account_loading: action.status,
                delete_account_id: action.id
            }
        }
        case DELETE_SINGLE_ACCOUNT: {
            const active_pending_accounts = state.active_pending_accounts.filter(item => Number(item.id) !== Number(action.id))
            return {
                ...state,
                active_pending_accounts
            }
        }
        case DELETE_MULTIPLE_ACCOUNT: {
            let active_pending_accounts = state.active_pending_accounts
            action.id.map(item => {
                active_pending_accounts = active_pending_accounts.filter(dat => { return Number(dat.id) !== Number(item) })
            })
            return {
                ...state,
                active_pending_accounts
            }
        }
        default:
            return state
    }
}
export default pendingAccountReducer