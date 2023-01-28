import {
    LOADING_DASHBOARD_NEW_APPLICATIONS_DEALER,
    GET_DASHBOARD_NEW_APPLICATIONS_DEALER,
    LOADING_DASHBOARD_NEW_ACCOUNTS_DEALER,
    GET_DASHBOARD_NEW_ACCOUNTS_DEALER,
    LOADING_DASHBOARD_NEW_LISTINGS_DEALER,
    GET_DASHBOARD_NEW_LISTINGS_DEALER,
} from '../../_constants/dealerConstants'

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
        case LOADING_DASHBOARD_NEW_APPLICATIONS_DEALER: {
            return {
                ...state,
                loading_dashboard_application: action.status,
                dashboard_applications: []
            }
        }
        case LOADING_DASHBOARD_NEW_ACCOUNTS_DEALER: {
            return {
                ...state,
                loading_dashboard_accounts: action.status,
                dashboard_accounts: []
            }
        }
        case LOADING_DASHBOARD_NEW_LISTINGS_DEALER: {
            return {
                ...state,
                loading_dashboard_listings: action.status,
                dashboard_listings: []
            }
        }
        case GET_DASHBOARD_NEW_APPLICATIONS_DEALER: {
            return {
                ...state,
                dashboard_applications: action.response,
                loading_dashboard_application: false,
            }
        }
        case GET_DASHBOARD_NEW_ACCOUNTS_DEALER: {
            return {
                ...state,
                dashboard_accounts: action.response,
                loading_dashboard_accounts: false,
            }
        }
        case GET_DASHBOARD_NEW_LISTINGS_DEALER: {
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