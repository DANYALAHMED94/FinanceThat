import {
    LOADING_DASHBOARD_NEW_APPLICATIONS_DEALER,
    GET_DASHBOARD_NEW_APPLICATIONS_DEALER,
    LOADING_DASHBOARD_NEW_ACCOUNTS_DEALER,
    GET_DASHBOARD_NEW_ACCOUNTS_DEALER,
    LOADING_DASHBOARD_NEW_LISTINGS_DEALER,
    GET_DASHBOARD_NEW_LISTINGS_DEALER,
} from '../../_constants/dealerConstants'
import { toastr } from 'react-redux-toastr'
import axios from '../../_helpers/axiosInterceptors'
export const get_dashboard_listings = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_DASHBOARD_NEW_LISTINGS_DEALER,
            status: true
        })
        const url = `/dealer-dash-listings/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_DASHBOARD_NEW_LISTINGS_DEALER,
                    response: response.data.data.results
                })
            } else {
                dispatch({
                    type: LOADING_DASHBOARD_NEW_LISTINGS_DEALER,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }

        }).catch(err => {
            dispatch({
                type: LOADING_DASHBOARD_NEW_LISTINGS_DEALER,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_dashboard_accounts = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_DASHBOARD_NEW_ACCOUNTS_DEALER,
            status: true
        })
        const url = `/ap_accounts/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_DASHBOARD_NEW_ACCOUNTS_DEALER,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: LOADING_DASHBOARD_NEW_ACCOUNTS_DEALER,
                    status: true
                })
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_DASHBOARD_NEW_ACCOUNTS_DEALER,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const get_dashboard_applications = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_DASHBOARD_NEW_APPLICATIONS_DEALER,
            status: true
        })
        const url = `/dealer-dash-apps/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_DASHBOARD_NEW_APPLICATIONS_DEALER,
                    response: response.data.data.results
                })

            } else {
                dispatch({
                    type: LOADING_DASHBOARD_NEW_APPLICATIONS_DEALER,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'Agent Not Created Successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: GET_DASHBOARD_NEW_APPLICATIONS_DEALER,
                response: []
            })
            dispatch({
                type: LOADING_DASHBOARD_NEW_APPLICATIONS_DEALER,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
