import {
    LOADING_DASHBOARD_NEW_APPLICATIONS,
    GET_DASHBOARD_NEW_APPLICATIONS,
    LOADING_DASHBOARD_NEW_ACCOUNTS,
    GET_DASHBOARD_NEW_ACCOUNTS,
    LOADING_DASHBOARD_NEW_LISTINGS,
    GET_DASHBOARD_NEW_LISTINGS,
} from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import axios from '../../_helpers/axiosInterceptorsAdmin'
export const get_dashboard_listings = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_DASHBOARD_NEW_LISTINGS,
            status: true
        })
        const url = `/ap_listings/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_DASHBOARD_NEW_LISTINGS,
                    response: response.data.data.results
                })
            } else {
                dispatch({
                    type: LOADING_DASHBOARD_NEW_LISTINGS,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }

        }).catch(err => {
            dispatch({
                type: LOADING_DASHBOARD_NEW_LISTINGS,
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
            type: LOADING_DASHBOARD_NEW_ACCOUNTS,
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
                    type: GET_DASHBOARD_NEW_ACCOUNTS,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: LOADING_DASHBOARD_NEW_ACCOUNTS,
                    status: true
                })
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_DASHBOARD_NEW_ACCOUNTS,
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
            type: LOADING_DASHBOARD_NEW_APPLICATIONS,
            status: true
        })
        const url = `/ap_applications/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_DASHBOARD_NEW_APPLICATIONS,
                    response: response.data.data
                })

            } else {
                dispatch({
                    type: LOADING_DASHBOARD_NEW_APPLICATIONS,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'Agent Not Created Successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_DASHBOARD_NEW_APPLICATIONS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
