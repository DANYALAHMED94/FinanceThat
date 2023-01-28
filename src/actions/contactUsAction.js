import { LOADING_CONTACT_US } from '../_constants/constants'
import { toastr } from 'react-redux-toastr'
import axios from '../_helpers/axiosInterceptors'

export const submit_contact_us = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_CONTACT_US,
            status: true,
            submit: false
        })
        const url = `/contact_us_form/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: LOADING_CONTACT_US,
                        status: false,
                        submit: true
                    })
                    toastr.success('Form Submited Successfully')
                } else {
                    dispatch({
                        type: LOADING_CONTACT_US,
                        status: false,
                        submit: false
                    })
                    toastr.error('Error', response.data.message)
                }

            })
            .catch(err => {
                dispatch({
                    type: LOADING_CONTACT_US,
                    status: false,
                    submit: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
