import { UPDATE_USER_PROFILE, CHANGE_PROFILE_INPUT, GET_DEALER_PROFILE_DATA, GET_USER_PROFILE_DATA, UPDATE_PROFILE_LOADING, PASSWORD_PROFILE_UPDATE_LOADING } from '../_constants/constants';
import { toastr } from 'react-redux-toastr'
import axios from '../_helpers/axiosInterceptors'
import firebaseConfig from '../_constants/chatConfig'
import 'firebase/database'

var database = firebaseConfig.database();

export const change_profile_input = (name, value) => {
    return dispatch => {
        dispatch({
            type: CHANGE_PROFILE_INPUT,
            name: name,
            value: value
        })
    }
}
/**
 *
 * Seller Or User Update
 *
 */
export const update_user_profile = (data, user_id) => {
    return dispatch => {
        dispatch({
            type: UPDATE_PROFILE_LOADING,
            status: true
        })
        const url = `/buyer_details/create/${user_id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.message !== undefined) {
                    toastr.success(response.data.message)
                    dispatch({
                        type: GET_USER_PROFILE_DATA,
                        response: response.data.data
                    })
                    const data = {
                        firstName: response.data.data.first_name !== undefined && response.data.data.first_name !== null ? response.data.data.first_name : '',
                        lastName: response.data.data.last_name !== undefined && response.data.data.last_name !== null ? response.data.data.last_name : '',
                        streetAddress: response.data.data.street !== undefined && response.data.data.street !== null ? response.data.data.street : '',
                        postalCode: response.data.data.postal_code !== undefined && response.data.data.postal_code !== null ? response.data.data.postal_code : '',
                        city: response.data.data.city !== undefined && response.data.data.city !== null ? response.data.data.city : '',
                        country: response.data.data.country !== undefined && response.data.data.country !== null ? response.data.data.country : '',
                        telephone: response.data.data.telephone !== undefined && response.data.data.telephone !== null ? response.data.data.telephone : '',
                        // email: response.data.data.email == undefined && response.data.data.email !== null ? '' : response.data.data.email,
                        email: response.data.data.user_id == undefined && response.data.data.user_id !== null ? response.data.data.user_id.email !== undefined && response.data.data.user_id.email !== null ? response.data.data.user_id.email : '' : '',
                        name: response.data.data ? response.data.data.name ? response.data.data.name.toLowerCase() : "" : '',
                        photo: response.data.data.photo == undefined && response.data.data.photo !== null ? '' : response.data.data.photo,
                    }
                    database.ref("users/" + user_id).update(data, async (error) => {
                        if (error) {
                            dispatch({
                                type: UPDATE_PROFILE_LOADING,
                                status: false
                            })
                            // The write failed...
                        } else {
                            await update_user_image_firebase(user_id)
                            // Data saved successfully!
                        }
                    })
                }
                dispatch({
                    type: UPDATE_PROFILE_LOADING,
                    status: false
                })

            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.response.data.detail !== undefined ? err.response.data.detail : err.message : err.message
                toastr.error('Error', message.toString())
                dispatch({
                    type: UPDATE_PROFILE_LOADING,
                    status: false
                })
            })
    }
}

export const get_user_profile_data = (user_id) => {
    return dispatch => {
        const url = `/buyer_details/b_detail/${user_id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_USER_PROFILE_DATA,
                        response: response.data.data
                    })
                }
            })
            .catch(err => {
                toastr.error('Error', err.message.toString())
            })
    }
}

/** Dealer User Profile Data */
export const get_dealer_user_profile_data = (user_id) => {
    return dispatch => {
        const url = `/dealer_details/Employee/${user_id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_USER_PROFILE_DATA,
                        response: response.data.data
                    })
                }
            })
            .catch(err => {
                toastr.error('Error', err.message.toString())
            })
    }
}

/**
 *
 * Dealer Update
 *
 */
export const update_dealer_profile = (data, user_id) => {
    return dispatch => {
        dispatch({
            type: UPDATE_PROFILE_LOADING,
            status: true
        })
        const url = `/dealer_details/create/${user_id}/`
        const options = {
            method: 'PUT',
            // headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` },
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: (data),
            url
        }
        axios(options)
            .then(async response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    const data = {
                        firstName: response.data.data.business_name !== undefined && response.data.data.business_name !== null ? response.data.data.business_name : '',
                        lastName: response.data.data.operating_name !== undefined && response.data.data.operating_name !== null ? response.data.data.operating_name : '',
                        streetAddress: response.data.data.street_address !== undefined && response.data.data.street_address !== null ? response.data.data.street_address : '',
                        postalCode: response.data.data.postal_code !== undefined && response.data.data.postal_code !== null ? response.data.data.postal_code : '',
                        city: response.data.data.city !== undefined && response.data.data.city !== null ? response.data.data.city : '',
                        country: response.data.data.country !== undefined && response.data.data.country !== null ? response.data.data.country : '',
                        telephone: response.data.data.phone !== undefined && response.data.data.business_name !== null ? response.data.data.phone : '',
                        email: response.data.data.email == undefined && response.data.data.email == null ? '' : response.data.data.email,
                        name: response.data.data ? response.data.data.name ? response.data.data.name.toLowerCase() : "" : '',
                        photo: response.data.data.photo == undefined && response.data.data.photo == null ? '' : response.data.data.photo,
                    }
                    await database.ref("users/" + user_id).update(data, async (error) => {
                        if (error) {
                            // The write failed...
                        } else {
                            await update_user_image_firebase(user_id)
                            // Data saved successfully!
                        }
                    })
                    dispatch({
                        type: UPDATE_USER_PROFILE,
                    })
                    dispatch({
                        type: GET_DEALER_PROFILE_DATA,
                        response: response.data.data
                    })
                    toastr.success(response.data.message)
                }
                dispatch({
                    type: UPDATE_PROFILE_LOADING,
                    status: false
                })
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
                dispatch({
                    type: UPDATE_PROFILE_LOADING,
                    status: false
                })
            })
    }
}

export const get_dealer_profile_data = (user_id) => {
    return dispatch => {
        const url = `/dealer_details/d_detail/${user_id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_DEALER_PROFILE_DATA,
                        response: response.data.data
                    })
                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                // toastr.error('Error', message.toString())

            })
    }
}

export const update_user_password = (data) => {
    return dispatch => {
        dispatch({
            type: PASSWORD_PROFILE_UPDATE_LOADING,
            status: true
        })
        const url = `/password-change/`
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
                        type: UPDATE_USER_PROFILE
                    })
                    toastr.success(response.data.message)
                }
                dispatch({
                    type: PASSWORD_PROFILE_UPDATE_LOADING,
                    status: false
                })
            })
            .catch(err => {
                let message = ''
                if (err.response !== undefined && err.response.status !== undefined && err.response.status === 500) {
                    message = err.response.statusText
                } else {
                    message = err.response !== undefined || err.response !== null ? err.response.data !== undefined ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message : err.message
                }
                toastr.error('Error', message.toString())
                dispatch({
                    type: PASSWORD_PROFILE_UPDATE_LOADING,
                    status: false
                })
            })
    }
}

export const update_user_image_firebase = (id) => {
    return new Promise((resolve, reject) => {
        database.ref("friends/").once("value", async snapshot => {
            snapshot.forEach((snap) => {
                database.ref("users/" + id).once('value').then(async (user) => {
                    if (user.exists()) {
                        await database.ref("friends/" + snap.key + "/" + id).once('value').then((snapshot) => {
                            if (snapshot.exists()) {
                                const image = user.val().photo !== undefined ? user.val().photo : ''
                                database.ref("friends/" + snap.key + "/" + id).update({ image: image }, (error) => {
                                    if (error) {
                                        toastr.error('Error', error)
                                        // The write failed...
                                    } else {
                                        // Data saved successfully!
                                    }
                                })
                            }

                        })
                    }
                })
            });
            resolve()
        });
    })
}
