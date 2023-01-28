import { UPDATE_DEALERSHIP_LOADING, GET_DEALER_SHIP_PROFILE_DATA, DELETE_DEALERSHIP_DOCUMENT_LOADING, UNSELECT_DEALERSHIP_VEHICLE_LOCATION, GET_DEALER_CREDIT_SCORE, NEW_DEALER_CREDIT_SCORE, DELETE_DEALER_CREDIT_SCORE } from '../../_constants/dealerConstants'
import { toastr } from 'react-redux-toastr'
import axios from '../../_helpers/axiosInterceptors'
import simpleAxios from '../../_helpers/axios'
import firebaseConfig from '../../_constants/chatConfig'
import 'firebase/database'
var database = firebaseConfig.database();

export const update_dealer_profile = (data, dealer_id) => {
    return dispatch => {
        dispatch({
            type: UPDATE_DEALERSHIP_LOADING,
            status: true
        })
        const url = `/dealer_details/create/${dealer_id}/`
        const options = {
            method: 'PUT',
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
                    await database.ref("users/" + dealer_id).update(data, async (error) => {
                        if (error) {
                            // The write failed...
                        } else {
                            await update_user_image_firebase(dealer_id)
                            // Data saved successfully!
                        }
                    })

                    dispatch({
                        type: GET_DEALER_SHIP_PROFILE_DATA,
                        response: response.data.data
                    })
                    toastr.success(response.data.message)
                }
                dispatch({
                    type: UPDATE_DEALERSHIP_LOADING,
                    status: false
                })
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
                dispatch({
                    type: UPDATE_DEALERSHIP_LOADING,
                    status: false
                })
            })
    }
}
export const delete_document = (data, dealer_id, document_name) => {
    return dispatch => {
        dispatch({
            type: DELETE_DEALERSHIP_DOCUMENT_LOADING,
            status: true,
            document_name: document_name
        })
        const url = `/dealer_details/create/${dealer_id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: (data),
            url
        }
        axios(options)
            .then(async response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_DEALER_SHIP_PROFILE_DATA,
                        response: response.data.data
                    })
                    dispatch({
                        type: DELETE_DEALERSHIP_DOCUMENT_LOADING,
                        status: false,
                        is_deleted: true,
                        document_name: ""
                    })
                    toastr.success(response.data.message)
                }
                dispatch({
                    type: DELETE_DEALERSHIP_DOCUMENT_LOADING,
                    status: false,
                    document_name: ''
                })
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
                dispatch({
                    type: DELETE_DEALERSHIP_DOCUMENT_LOADING,
                    status: false,
                    document_name: ""
                })
            })
    }
}


export const get_dealer_profile_data = (dealer_id) => {
    return dispatch => {
        const url = `/dealer_details/d_detail/${dealer_id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                    dispatch({
                        type: GET_DEALER_SHIP_PROFILE_DATA,
                        response: response.data.data
                    })
                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())

            })
    }
}

// export const get_dealership_vehicle_location = (dealer_id) => {
//     return dispatch => {
//         const url = `/dealership/${dealer_id}/`
//         const options = {
//             method: 'GET',
//             headers: { "Content-Type": "application/json; charset=utf8" },
//             url
//         }
//         axios(options)
//             .then(response => {
//                 console.log(response, "RESPONSE")
//             })
//             .catch(err => {
//                 const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
//                 toastr.error('Error', message.toString())
//             })
//     }
// }
export const get_dealer_credit_score = (dealer_id) => {
    return dispatch => {
        const url = `/dealer_details/creditScore/${dealer_id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                 console.log(response.data)
                 dispatch({
                    type:GET_DEALER_CREDIT_SCORE,
                    response:response.data.data,
                 })
                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())

            })
    }
}


export const add_dealer_credit_score = (data) => {
    return dispatch => {
        const url = `/dealer_details/creditScore/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data:data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                 console.log(response.data)
                 dispatch({
                    type:NEW_DEALER_CREDIT_SCORE,
                    response:response.data.data,
                 })
                 toastr.success(("Credit Score Addedd Successfully").toString())
                }else {
                    toastr.error('Error', (response?.data?.message|| "Data Already Exist").toString())

                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())

            })
    }
}

export const delete_dealer_credit_score = (data) => {
    return dispatch => {
        const url = `/dealer_details/creditScore/${data.id}/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data:data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success !== undefined && response.data.success == true) {
                 console.log(response.data)
                 dispatch({
                    type:DELETE_DEALER_CREDIT_SCORE,
                    id:data.id,
                 })
                 toastr.success((response?.data?.message|| "Credit Score Deleted Successfully").toString())

                }else {
                    toastr.error('Error', (response?.data?.message|| "Credit Score Not Deleted Successfully").toString())

                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())

            })
    }
}



export const update_dealership_vehicle_location = (data) => {
    return dispatch => {
        const url = `/dealership/${data.dealer_id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success) {
                    console.log(response, "RESPONSE")
                    toastr.success("Update Successfully")
                } else {
                    dispatch({
                        type: UNSELECT_DEALERSHIP_VEHICLE_LOCATION,
                    })
                    toastr.error('Error', response.data.message)
                }
            })
            .catch(err => {
                dispatch({
                    type: UNSELECT_DEALERSHIP_VEHICLE_LOCATION,
                })

                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())

            })
    }
}

export const downloadFile = (filePath) => {
    return dispatch => {
        const url = `${filePath}`
        const options = {
            method: 'GET',
            responseType: 'blob',
            url
        }
        simpleAxios(options).then(async response => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            let lastValue = filePath.substring(filePath.lastIndexOf('/') + 1);
            link.setAttribute('download', lastValue); //any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
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
