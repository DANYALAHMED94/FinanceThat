import { GET_USER_MY_ADS, DELETE_USER_ADD, DELETE_POST_ADD, LOADING_USER_ADD } from '../_constants/constants';
import { toastr } from 'react-redux-toastr'
import axios from '../_helpers/axiosInterceptors'

export const get_my_ads = (user_id) => {
    return dispatch => {
        dispatch({
            type: LOADING_USER_ADD,
            status: true
        })
        const url = `/ad_details/my_ads/${user_id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: GET_USER_MY_ADS,
                        response: response.data.data
                    })
                }
                dispatch({
                    type: LOADING_USER_ADD,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_USER_ADD,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_user_add = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_POST_ADD,
            deleteLoading: true,
            deletedId: id
        })
        const url = `/ad_details/del/${id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: DELETE_USER_ADD,
                        id: id
                    })
                    toastr.success("Ad Deleted Succesfully")
                }
                dispatch({
                    type: DELETE_POST_ADD,
                    deleteLoading: false,
                    deletedId: ''
                })

            })
            .catch(err => {
                dispatch({
                    type: DELETE_POST_ADD,
                    deleteLoading: false,
                    deletedId: ''
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })

    }
}