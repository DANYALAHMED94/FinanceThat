import {
    GET_AD_POST_DETAIL,
    CHANGE_DOWN_PAYMENT,
    CHANGE_CREDIT_SCORE,
    CHANGE_IN_TAX,
    SAVED_AD_POST_DETAIL,
    REMOVE_ALL_RECORD_POST_DETAIL,
    LOADING_SAVED_AD_DETAIL,
} from '../_constants/constants';
import { toastr } from 'react-redux-toastr'
import axios from '../_helpers/axiosInterceptors'
import simpleAxios from '../_helpers/axios'
import $ from 'jquery'
import { API_URL } from '../constant'

export const get_ad_post_detail = (id) => {
    return dispatch => {
        const url = `/ad_details/lfilter_detail/${id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    console.log(response.data.data, 'get_ad_post_detail')
                    dispatch({
                        type: GET_AD_POST_DETAIL,
                        response: response.data.data
                    })
                    const firstImage = response.data.data && response.data.data.length > 0 ? response.data.data[0] ? response.data.data[0].images ? response.data.data[0].images.length > 0 ? response.data.data[0].images[0] ? response.data.data[0].images[0].photo ? API_URL + '/media/' + response.data.data[0].images[0].photo : '' : '' : "" : '' : '' : ''
                    $('#LargeImage-Container').css('backgroundImage', `url(${firstImage})`)
                }
            })
            .catch(err => {
                console.log(err)
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const saved_ad_post_detail = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_SAVED_AD_DETAIL,
            status: true
        })
        const url = `/ad_details/saved_ads/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: SAVED_AD_POST_DETAIL,
                        response: data
                    })
                    // toastr.success('Success', 'Ad Saved')
                }
                dispatch({
                    type: LOADING_SAVED_AD_DETAIL,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_SAVED_AD_DETAIL,
                    status: false
                })
                console.log(err.message)
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const un_saved_ad_post_detail = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_SAVED_AD_DETAIL,
            status: true
        })
        const url = `/ad_details/saved_ads/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: SAVED_AD_POST_DETAIL,
                        response: data
                    })
                    // toastr.success('Success', 'Ad Un Saved')
                }
                dispatch({
                    type: LOADING_SAVED_AD_DETAIL,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_SAVED_AD_DETAIL,
                    status: false
                })
                console.log(err.message)
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const change_down_payment = (downPayment) => {
    return dispatch => {
        dispatch({
            type: CHANGE_DOWN_PAYMENT,
            response: downPayment
        })
    }
}

export const change_credit_score = (creditId) => {
    return dispatch => {
        dispatch({
            type: CHANGE_CREDIT_SCORE,
            response: creditId
        })
    }
}

export const change_in_tax = (tax) => {
    return dispatch => {
        dispatch({
            type: CHANGE_IN_TAX,
            response: tax
        })
    }
}

export const remove_all_record = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_RECORD_POST_DETAIL
        })
    }
}
export const add_view = (data) => {
    return dispatch => {
        const url = `/ad_details/ad_views_count/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        simpleAxios(options)
            .then(response => {
                console.log(response, '/ad_details/ad_views_count/')
            })
            .catch(err => {
                console.log(err)
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}