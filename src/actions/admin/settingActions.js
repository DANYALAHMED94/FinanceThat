import {
    LOADING_ADMIN_UPDATE_PASSWORD,
    UPDATE_ADMIN_PASSWORD,
} from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import axios from '../../_helpers/axiosInterceptorsAdmin'

export const update_admin_password = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_UPDATE_PASSWORD,
            status: true
        })
        const url = `ap_adminuser/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: UPDATE_ADMIN_PASSWORD,
                })
                const message = response.data.message !== undefined ? response.data.message : 'password updated successfully'
                toastr.success(message.toString())
            } else {
                dispatch({
                    type: LOADING_ADMIN_UPDATE_PASSWORD,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'password not updated successfully'
                toastr.error('Error', message.toString())

            }
        }).catch(err => {
            dispatch({
                type: LOADING_ADMIN_UPDATE_PASSWORD,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
