/* eslint-disable array-callback-return */
import {
    GET_DMS_DETAIL,
    REMOVE_ALL_STATE_DMS,
    LOADING_DMS_ACCOUNT,
    GET_DMS_ACCOUNT_ROW,
    REMOVE_UPDATE_ROW_DMS,
    GET_DMS_DEALER_DETAIL,
    GET_DMS_DEALER_FEED,
    UPDATE_DMS_ACCOUNT_LOADING, SINGLE_DMS_CHECK,
    TOGGLE_ALL_DMS_CHECK,
    LOADING_DELETE_SINGLE_DMS,
    DELETE_SINGLE_DMS,
    DELETE_MULTIPLE_DMS,
    SINGLE_DMS_DEALER_CHECK,
    TOGGLE_ALL_DMS_DEALER_CHECK,
    DELETE_SINGLE_DMS_DEALER,
    DELETE_MULTIPLE_DMS_DEALER
} from '../../_constants/constants'

const initialState = {
    loading: false,
    dms_detail: [],
    total_pages: [],
    total_count: 0,
    dms_account_row: [],
    update_account: false,
    dms_dealer_detail: [],
    dms_dealer_feed: [],
    checkAllDms: false,
    delete_dms_id: '',
    delete_dms_loading: false,
    checkAllDmsDealer: false
}

const dmsReducer = (state = initialState, action) => {
    switch (action.type) {
        /** DMS Reducer */
        case GET_DMS_DETAIL: {
            return {
                ...state,
                dms_detail: action.response,
                checkAllDms: false,
                loading: false,
                total_count: action.count,
                total_pages: action.pages
            }
        }
        case LOADING_DMS_ACCOUNT: {
            return {
                ...state,
                loading: action.status
            }
        }
        case SINGLE_DMS_CHECK: {
            let dms_detail = state.dms_detail.slice().map(item => {
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
                checkAllDms: (dms_detail || []).length === (dms_detail.filter(item => item.isChecked) || []).length,
                dms_detail: dms_detail
            }

        }
        case TOGGLE_ALL_DMS_CHECK: {
            return {
                ...state,
                checkAllDms: action.status,
                dms_detail: state.dms_detail.slice().map(item => {
                    return {
                        ...item,
                        isChecked: action.status
                    }
                }),
            }
        }
        case LOADING_DELETE_SINGLE_DMS: {
            return {
                ...state,
                delete_dms_loading: action.status,
                delete_dms_id: action.id
            }
        }
        case DELETE_SINGLE_DMS: {
            const dms_detail = state.dms_detail.filter(item => Number(item.id) !== Number(action.id))
            return {
                ...state,
                dms_detail,
                checkAllDms: false
            }
        }
        case DELETE_MULTIPLE_DMS: {
            let dms_detail = state.dms_detail
            action.id.map(item => {
                dms_detail = dms_detail.filter(dat => { return Number(dat.id) !== Number(item) })
            })
            return {
                ...state,
                dms_detail,
                checkAllDms: false
            }
        }
        /** DMS Account */
        case GET_DMS_ACCOUNT_ROW: {
            return {
                ...state,
                dms_account_row: action.response,
                loading: false
            }
        }
        case UPDATE_DMS_ACCOUNT_LOADING: {
            return {
                ...state,
                update_account: action.status
            }
        }
        /** DMS Dealer Detail */
        case GET_DMS_DEALER_DETAIL: {
            return {
                ...state,
                dms_dealer_detail: action.response,
                loading: false,
                checkAllDms: false
            }
        }
        case SINGLE_DMS_DEALER_CHECK: {
            let dms_dealer_detail = state.dms_dealer_detail.slice().map(item => {
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
                checkAllDmsDealer: (dms_dealer_detail || []).length === (dms_dealer_detail.filter(item => item.isChecked) || []).length,
                dms_dealer_detail: dms_dealer_detail
            }

        }
        case TOGGLE_ALL_DMS_DEALER_CHECK: {
            return {
                ...state,
                checkAllDmsDealer: action.status,
                dms_dealer_detail: state.dms_dealer_detail.slice().map(item => {
                    return {
                        ...item,
                        isChecked: action.status
                    }
                }),
            }
        }
        case DELETE_SINGLE_DMS_DEALER: {
            const dms_dealer_detail = state.dms_dealer_detail.filter(item => Number(item.id) !== Number(action.id))
            return {
                ...state,
                dms_dealer_detail,
                checkAllDms: false
            }
        }
        case DELETE_MULTIPLE_DMS_DEALER: {
            let dms_dealer_detail = state.dms_dealer_detail
            action.id.map(item => {
                dms_dealer_detail = dms_dealer_detail.filter(dat => { return Number(dat.id) !== Number(item) })
            })
            return {
                ...state,
                dms_dealer_detail,
                checkAllDmsDealer: false
            }
        }
        /** DMS Feed */
        case GET_DMS_DEALER_FEED: {
            return {
                ...state,
                dms_dealer_feed: action.response,
                loading: false,
                checkAllDms: false,
                total_count: action.count,
                total_pages: action.pages
            }
        }
        case REMOVE_UPDATE_ROW_DMS: {
            return {
                ...state,
                dms_account_row: []
            }
        }
        case REMOVE_ALL_STATE_DMS: {
            return {
                ...state,
                dms_detail: [],
                total_pages: [],
                total_count: 0,
                dms_account_row: [],
                dms_dealer_detail: [],
                dms_dealer_feed: []
            }
        }

        default:
            return state
    }
}
export default dmsReducer