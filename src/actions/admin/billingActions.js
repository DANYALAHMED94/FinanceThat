import {
    ADD_CARD_BILLING,
    BILLING_LOADING,
    BILLING_INVOICES,
    LOADING_ADMIN_APIS
} from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import axios from '../../_helpers/axiosInterceptorsAdmin'

export const add_card = (data, onSuccess, onError) => {
    return dispatch => {

        dispatch({
            type: BILLING_LOADING,
            loading: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = data.user_id ? `payment/application/` : `payment/application/?u_id=${data.user_id}`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                onSuccess()
                dispatch(get_card())
                const message = response.data.message
                toastr.success(message.toString())
            } else {
                const message = response.data.message
                onError(message)
                toastr.error('Error', message.toString())

            }
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: BILLING_LOADING,
                loading: false
            })
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            onError(message)

            toastr.error('Error', message.toString())
        })
    }
}
export const get_card = (user = null) => {
    return dispatch => {
        dispatch({
            type: BILLING_LOADING,
            loading: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        console.log(user,"user123")
        const url = user ? `payment/application/?u_id=${user}`: `payment/application/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            console.log(response.data, "get_card")
            dispatch({
                type: BILLING_LOADING,
                loading: false
            })
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: ADD_CARD_BILLING,
                    data: response?.data?.data
                })
            } else {
                const message = response.data.message
                toastr.error('Error', message.toString())

            }
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: BILLING_LOADING,
                loading: false
            })
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const edit_card = (data, app, pay, onSuccess, onError) => {
    return dispatch => {
        dispatch({
            type: BILLING_LOADING,
            loading: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = data.user_id ? `/payment/application/?u_id=${data.user_id}&app=${app}&pay=${pay}` : "/payment/application/"
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                if(typeof onSuccess === 'function') onSuccess()
                dispatch(get_card(data.user_id))

                const message = response.data.message
                toastr.success( message.toString())
            } else {
                const message = response.data.message
                if(typeof onError === 'function') onError(message)
                toastr.error('Error', message.toString())
            }
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: BILLING_LOADING,
                loading: false
            })
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            if(typeof onError === 'function') onError(message)
            toastr.error('Error', message.toString())
        })
    }
}
export const delete_card = (data, app, pay, onSuccess, onError) => {
    return dispatch => {
        dispatch({
            type: BILLING_LOADING,
            loading: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = data.user_id ? `/payment/application/?u_id=${data.user_id}&app=${app}&pay=${pay}` : "/payment/application/"
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                if(typeof onSuccess === 'function') onSuccess()
                dispatch(get_card(data.user_id))

                const message = response.data.message
                toastr.success( message.toString())
            } else {
                const message = response.data.message
                if(typeof onError === 'function') onError(message)
                toastr.error('Error', message.toString())
            }
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            console.log(err)
            dispatch({
                type: BILLING_LOADING,
                loading: false
            })
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            if(typeof onError === 'function') onError(message)
            toastr.error('Error', message.toString())
        })
    }
}
// https://dev-api.financethat.ca/biling/invoice/
export const get_invoice = (data,user = null) => {
    return dispatch => {
        dispatch({
            type: BILLING_INVOICES,
            data: [],
            pages: [],
            count: 0,
        })
        const url = user ? `biling/invoice/?u_id=`+user : `biling/invoice/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data, "biling/invoice/")
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: BILLING_INVOICES,
                    data: response?.data?.data?.results || [],
                    pages: response?.data?.pages || [],
                    count: response?.data?.data?.count || 0,
                })
            } else {
                dispatch({
                    type: BILLING_INVOICES,
                    data: [],
                    pages: [],
                    count: 0,
                })
                const message = response.data.message
                toastr.error('Error', message.toString())

            }
        }).catch(err => {
            dispatch({
                type: BILLING_INVOICES,
                data: [],
                pages: [],
                count: 0,
            })
            console.log(err)
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const get_payment = (onSuccess) => {
    return dispatch => {
        const url = `payment/application/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                onSuccess(response.data.data)
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'password not updated successfully'
                toastr.error('Error', message.toString())

            }
        }).catch(err => {
            console.log(err)
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}