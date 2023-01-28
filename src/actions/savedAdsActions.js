import { GET_USER_SAVED_ADS, DELETE_SAVED_ADD, DELETE_POST_ADD, LOADING_SAVED_ADD } from '../_constants/constants';
import { toastr } from 'react-redux-toastr'
import axios from '../_helpers/axiosInterceptors'

export const get_saved_ads = (user_id) => {
    return dispatch => {
        dispatch({
            type: LOADING_SAVED_ADD,
            status: true
        })
        const url = `/ad_details/saved_ads/${user_id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_USER_SAVED_ADS,
                        response: response.data.data
                    })
                }
                dispatch({
                    type: LOADING_SAVED_ADD,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_SAVED_ADD,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_saved_user_add = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_POST_ADD,
            deleteLoading: true,
            deletedId: id
        })
        const url = `/ad_details/saved_ads/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: { ad_id: id },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: DELETE_SAVED_ADD,
                        id: id,
                    })

                    toastr.success("Ad UnSaved Succesfully")
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