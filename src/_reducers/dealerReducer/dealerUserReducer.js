/* eslint-disable array-callback-return */
import {
    LOADING_USERS,
    GET_USERS, GET_DEALER_ADMIN_USER_DETAIL,
    GET_DEALER_ADMIN_USER_ROLES,
    SINGLE_CHECK_DEALER_ADMIN_USER,
    TOGGLE_ALL_CHECK_DEALER_ADMIN_USER,
    REMOVE_ALL_STATE_DEALER_ADMIN_USER,
    LOADING_DELETEING_DEALER_ADMIN_USER,
    LOADING_UPDATE_DEALER_ADMIN_PERMISSION,
    DELETE_SINGLE_AGENT,
    DELETE_MULTIPLE_DEALER_ADMIN_USER,
    LOADING_UPDATE_DEALER_ADMIN_USER_DETAIL
} from '../../_constants/dealerConstants'

const initialState = {
    loading: false,
    user_listing: [],
    user_roles: [],
    checkedAllUser: false,
    user_detail: [],
    loading_deleteing: false,
    loading_update_permissions: false,
    loading_update_detail: false,
    delete_user_id: '',
    total_pages: [],
    total_count: 0
}

const dealerUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_UPDATE_DEALER_ADMIN_USER_DETAIL: {
            return {
                ...state,
                loading_update_detail: action.status
            }
        }
        case LOADING_USERS: {
            return {
                ...state,
                loading: action.status,
                user_listing: [],
                count: 0,
                pages: [],
            }
        }
        case GET_USERS: {
            return {
                ...state,
                user_listing: action.response,
                loading: false,
                checkedAllUser: false,
                total_count: action.count,
                total_pages: action.pages
            }
        }
        case GET_DEALER_ADMIN_USER_DETAIL: {
            return {
                ...state,
                user_detail: action.response,
                loading: false,
            }
        }
        case GET_DEALER_ADMIN_USER_ROLES: {
            return {
                ...state,
                user_roles: action.response
            }
        }
        case SINGLE_CHECK_DEALER_ADMIN_USER: {
            let user_listing = state.user_listing.slice().map(item => {
                if (Number(item.id) === Number(action.id)) {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                return item
            })

            const checkLength = user_listing.filter(item => item.isChecked === true)
            return {
                ...state,
                checkedAllUser: (user_listing || []).length === (checkLength || []).length,
                user_listing: user_listing
            }
        }

        case TOGGLE_ALL_CHECK_DEALER_ADMIN_USER: {
            return {
                ...state,
                checkedAllUser: action.status,
                user_listing: state.user_listing.slice().map(item => {
                    return {
                        ...item,
                        isChecked: action.status
                    }
                }),

            }
        }
        case LOADING_DELETEING_DEALER_ADMIN_USER: {
            return {
                ...state,
                loading_deleteing: action.status,
                delete_user_id: action.id
            }
        }
        case DELETE_SINGLE_AGENT: {
            return {
                ...state,
                user_listing: state.user_listing.filter(item => Number(item.id) !== Number(action.id))
            }
        }
        case DELETE_MULTIPLE_DEALER_ADMIN_USER: {
            let user_listing = state.user_listing
            action.ids.map(item => {
                user_listing = user_listing.filter(ag => Number(ag.id) !== Number(item))
            })
            return {
                ...state,
                user_listing
            }
        }
        case LOADING_UPDATE_DEALER_ADMIN_PERMISSION: {
            return {
                ...state,
                loading_update_permissions: action.status
            }
        }

        case REMOVE_ALL_STATE_DEALER_ADMIN_USER: {
            return {
                loading: false,
                user_listing: [],
                user_roles: [],
                checkedAllUser: false,
                user_detail: [],
                loading_deleteing: false,
                loading_update_permissions: false,
                delete_user_id: ''
            }
        }
        default:
            return state
    }
}
export default dealerUserReducer