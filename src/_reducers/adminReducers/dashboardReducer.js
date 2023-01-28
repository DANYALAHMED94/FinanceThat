import {
    LOADING_DASHBOARD_NEW_APPLICATIONS,
    GET_DASHBOARD_NEW_APPLICATIONS,
    LOADING_DASHBOARD_NEW_ACCOUNTS,
    GET_DASHBOARD_NEW_ACCOUNTS,
    LOADING_DASHBOARD_NEW_LISTINGS,
    GET_DASHBOARD_NEW_LISTINGS,
} from '../../_constants/constants'

const initialState = {
    loading_dashboard_application: false,
    loading_dashboard_accounts: false,
    loading_dashboard_listings: false,
    dashboard_accounts: [],
    dashboard_listings: [],
    dashboard_applications: [],
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DASHBOARD_NEW_APPLICATIONS: {
            return {
                ...state,
                loading_dashboard_application: action.status,
                dashboard_applications: []
            }
        }
        case LOADING_DASHBOARD_NEW_ACCOUNTS: {
            return {
                ...state,
                loading_dashboard_accounts: action.status,
                dashboard_accounts: []
            }
        }
        case LOADING_DASHBOARD_NEW_LISTINGS: {
            return {
                ...state,
                loading_dashboard_listings: action.status,
                dashboard_listings: []
            }
        }
        case GET_DASHBOARD_NEW_APPLICATIONS: {
            return {
                ...state,
                dashboard_applications: action.response,
                loading_dashboard_application: false,
            }
        }
        case GET_DASHBOARD_NEW_ACCOUNTS: {
            return {
                ...state,
                dashboard_accounts: action.response,
                loading_dashboard_accounts: false,
            }
        }
        case GET_DASHBOARD_NEW_LISTINGS: {
            return {
                ...state,
                dashboard_listings: action.response,
                loading_dashboard_listings: false,
            }
        }
        default:
            return state
    }
}
export default dashboardReducer