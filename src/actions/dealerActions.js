import {
    DEALER_REGISTER, REGISTER_REQUEST,
    REGISTER_FAILURE
} from '../_constants/constants';
import { toastr } from 'react-redux-toastr'
import simpleAxios from '../_helpers/axios'


export const register_dealer = (data) => {
    return dispatch => {
        dispatch({
            type: REGISTER_REQUEST
        })
        const url = `/dealer_details/create/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: (data),
            url
        }
        simpleAxios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: DEALER_REGISTER,
                    })
                }

            })
            .catch(err => {
                dispatch({
                    type: REGISTER_FAILURE
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.response.data.detail !== undefined ? err.response.data.detail : err.message : err.message
                toastr.error('Error', message)
            })
    }
}

export const save_dealer_record = (data, dealer_preference) => {
    return dispatch => {
        dispatch({
            type: REGISTER_REQUEST
        })
        setTimeout(() => {
            dispatch({
                type: DEALER_REGISTER,
                data: data,
                dealer_preference:dealer_preference
            })
        }, 200)

    }
}