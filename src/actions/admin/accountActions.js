import {
    LOADING_PENDING_ACCOUNT,
    GET_PENDING_ACTIVE_ACCOUNTS,
    SINGLE_CHECK_PENDING,
    TOGGLE_ALL_CHECK,
    UPDATE_ACCOUNT_ROW_DATA,
    REMOVE_UPDATE_ROW,
    LOADING_PENDING_ACCOUNT_DECLINE,
    LOADING_PENDING_ACCOUNT_APPROVED,
    LOADING_PRIVATE_ACCOUNT_UPDATE,
    LOADING_DEALER_ACCOUNT_UPDATE,
    LOADING_DEALER_DETAIL_UPDATE,
    REMOVE_ALL_STATE_ACCOUNTS,
    LOADING_ADMIN_APIS,
    DELETE_SINGLE_ACCOUNT,
    LOADING_DELETE_SINGLE_ACCOUNT,
    DELETE_MULTIPLE_ACCOUNT,
    UPDATE_ACCOUNT_DEALER_DATA,
    UNSELECT_DEALER_ACCOUNT_VEHICLE_LOCATION,
    DELETE_DEALER_ACCOUNT_DOCUMENT_LOADING,
    DEALER_ACCOUNT_VEHICLE_LOCATION,
    NEW_DEALER_CREDIT_SCORE,
    DELETE_DEALER_CREDIT_SCORE,
    GET_DEALER_CREDIT_SCORE
} from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import simpleAxios from '../../_helpers/axios'
import axios from '../../_helpers/axiosInterceptorsAdmin'
import { history } from '../../_helpers/history'
import firebaseConfig from '../../_constants/chatConfig'
import 'firebase/database'
var database = firebaseConfig.database();
export const get_pending_active_accounts = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_PENDING_ACCOUNT,
            status: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/staging_ap_accounts/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success === true) {
                dispatch({
                    type: GET_PENDING_ACTIVE_ACCOUNTS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
                dispatch({
                    type: UPDATE_ACCOUNT_ROW_DATA,
                    response: []
                })
                dispatch({
                    type: UPDATE_ACCOUNT_DEALER_DATA,
                    response: []
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_PENDING_ACCOUNT,
                    status: false
                })
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })

        }).catch(err => {
            dispatch({
                type: LOADING_PENDING_ACCOUNT,
                status: false
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

export const get_pending_active_accounts_pages = (url, data) => {
    return dispatch => {
        dispatch({
            type: LOADING_PENDING_ACCOUNT,
            status: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })

        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_PENDING_ACTIVE_ACCOUNTS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_PENDING_ACCOUNT,
                    status: false
                })
            }
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_PENDING_ACCOUNT,
                status: false
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

export const single_check_pending = (id, filterName) => {
    return dispatch => {
        dispatch({
            type: SINGLE_CHECK_PENDING,
            id: id,
            filterName: filterName
        })
    }
}

export const toggle_all_check = (status, filterName) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_ALL_CHECK,
            status: status,
            filterName: filterName
        })
    }
}

export const update_account_row_data = data => {
    return dispatch => {
        dispatch({
            type: LOADING_PENDING_ACCOUNT,
            status: true
        })
        const url = `ap_retrieve_account_by_user_id/${data.id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: UPDATE_ACCOUNT_ROW_DATA,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: LOADING_PENDING_ACCOUNT,
                    status: false
                })
            }
        }).catch(err => {
            dispatch({
                type: LOADING_PENDING_ACCOUNT,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}

export const update_account_dealer_data = data => {
    return dispatch => {
        dispatch({
            type: LOADING_PENDING_ACCOUNT,
            status: true
        })
        const url = `/dealer_details/d_detail/${data.id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: UPDATE_ACCOUNT_DEALER_DATA,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: LOADING_PENDING_ACCOUNT,
                    status: false
                })
            }
        }).catch(err => {
            dispatch({
                type: LOADING_PENDING_ACCOUNT,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            // toastr.error('Error', message.toString())
        })
    }

}

export const update_dealer_profile = (data, dealer_id) => {
    return dispatch => {
        dispatch({
            type: LOADING_DEALER_DETAIL_UPDATE,
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
                        type: UPDATE_ACCOUNT_DEALER_DATA,
                        response: response.data.data
                    })
                    toastr.success(response.data.message)
                }
                dispatch({
                    type: LOADING_DEALER_DETAIL_UPDATE,
                    status: false
                })
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_DEALER_DETAIL_UPDATE,
                    status: false
                })
            })
    }
}

export const update_dealership_vehicle_location = (data) => {
    return dispatch => {
        dispatch({
            type: UNSELECT_DEALER_ACCOUNT_VEHICLE_LOCATION,
            status:false
        })
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
                    dispatch({
                        type:DEALER_ACCOUNT_VEHICLE_LOCATION,
                        response:data.type === 'location' ? data.locations : data.type === 'vehicle' ? data.vehicle_preferences : data.type === "subvehicle" ? data.vehicle_subtype_preferences: "",
                        dataType:data.type

                    })
                    toastr.success("Update Successfully")
                } else {
                    dispatch({
                        type: UNSELECT_DEALER_ACCOUNT_VEHICLE_LOCATION,
                        status:true
                    })
                    toastr.error('Error', response.data.message)

                }


            })
            .catch(err => {
                dispatch({
                    type: UNSELECT_DEALER_ACCOUNT_VEHICLE_LOCATION,
                    status:true
                })

                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())

            })
    }
}

export const remove_update_row = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_UPDATE_ROW
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
            console.log(response, 'sdasd')
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');

            link.href = downloadUrl;
            let lastValue = filePath.substring(filePath.lastIndexOf('/') + 1);
            link.setAttribute('download', lastValue); //any other extension

            document.body.appendChild(link);

            link.click();

            link.remove();
        }).catch(err => {
            dispatch({
                type: LOADING_PENDING_ACCOUNT,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}

export const delete_document = (data, dealer_id, document_name) => {
    return dispatch => {
        dispatch({
            type: DELETE_DEALER_ACCOUNT_DOCUMENT_LOADING,
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
                        type: UPDATE_ACCOUNT_DEALER_DATA,
                        response: response.data.data
                    })
                    dispatch({
                        type: DELETE_DEALER_ACCOUNT_DOCUMENT_LOADING,
                        status: false,
                        is_deleted: true,
                        document_name: ""
                    })
                    toastr.success( response.data.message)
                }
                dispatch({
                    type: DELETE_DEALER_ACCOUNT_DOCUMENT_LOADING,
                    status: false,
                    document_name: ''
                })
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
                dispatch({
                    type: DELETE_DEALER_ACCOUNT_DOCUMENT_LOADING,
                    status: false,
                    document_name: ""
                })
            })
    }
}

export const approved_pending_account = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_PENDING_ACCOUNT_APPROVED,
            status: true
        })
        const url = `ap_accounts/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response)
            if (response.data.success !== undefined && response.data.success == true) {
                const message = response.data.message !== undefined ? response.data.message : 'Approved Successfully'
                toastr.success(message.toString())
                dispatch({
                    type: LOADING_PENDING_ACCOUNT_APPROVED,
                    status: false
                })
                history.push('/admin/pending-account')

            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_PENDING_ACCOUNT_APPROVED,
                    status: false
                })
            }
        }).catch(err => {
            dispatch({
                type: LOADING_PENDING_ACCOUNT_APPROVED,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}

export const decline_pending_account = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_PENDING_ACCOUNT_DECLINE,
            status: true
        })
        const url = `ap_accounts/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response)
            if (response.data.success !== undefined && response.data.success == true) {
                const message = response.data.message !== undefined ? response.data.message : 'Approved Successfully'
                toastr.success( message.toString())
                dispatch({
                    type: LOADING_PENDING_ACCOUNT_DECLINE,
                    status: false
                })
                history.push('/admin/pending-account')

            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_PENDING_ACCOUNT_DECLINE,
                    status: false
                })
            }
        }).catch(err => {
            dispatch({
                type: LOADING_PENDING_ACCOUNT_DECLINE,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}

export const update_private_account = (data, user_id) => {
    return dispatch => {
        dispatch({
            type: LOADING_PRIVATE_ACCOUNT_UPDATE,
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
                console.log(response)
                if (response.data.message !== undefined) {
                    toastr.success( response.data.message)
                }
                dispatch({
                    type: LOADING_PRIVATE_ACCOUNT_UPDATE,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_PRIVATE_ACCOUNT_UPDATE,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.response.data.detail !== undefined ? err.response.data.detail : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const update_dealer_account = (data, user_id) => {
    return dispatch => {
        dispatch({
            type: LOADING_DEALER_ACCOUNT_UPDATE,
            status: true
        })
        const url = `/ap_accounts/${user_id}/`
        const options = {
            method: 'PUT',
            // headers: { 'Content-Type': 'multipart/form-data' },
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.message !== undefined) {
                    toastr.success( response.data.message)
                }
                dispatch({
                    type: LOADING_DEALER_ACCOUNT_UPDATE,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_DEALER_ACCOUNT_UPDATE,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.response.data.detail !== undefined ? err.response.data.detail : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const update_dealer_detail = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_DEALER_DETAIL_UPDATE,
            status: true
        })
        const dealer_id = data.dealer_owners !== undefined && data.dealer_owners !== null && data.dealer_owners.length > 0 ? data.dealer_owners[0].dealer_id : ''
        const url = `/ap_accounts/${dealer_id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response)
                if (response.data.message !== undefined) {
                    toastr.success( response.data.message)
                }
                dispatch({
                    type: LOADING_DEALER_DETAIL_UPDATE,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_DEALER_DETAIL_UPDATE,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.response.data.detail !== undefined ? err.response.data.detail : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const remove_all_state_accounts = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_STATE_ACCOUNTS
        })
    }
}
// delete single account

export const delete_single_account = (id, search) => {
    return dispatch => {
        dispatch({
            type: LOADING_DELETE_SINGLE_ACCOUNT,
            status: true,
            id: id
        })
        const url = `/del-user/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: { id: [id] },
            url,
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: DELETE_SINGLE_ACCOUNT,
                        id: id
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())
                }
                dispatch({
                    type: LOADING_DELETE_SINGLE_ACCOUNT,
                    status: false,
                    id: ''
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_DELETE_SINGLE_ACCOUNT,
                    status: false,
                    id: ''
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

// delete multiple account
export const delete_multiple_account = (ids, search) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/del-user/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: { id: ids },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: DELETE_MULTIPLE_ACCOUNT,
                        id: ids
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success( message.toString())
                }
                dispatch({
                    type: LOADING_ADMIN_APIS,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_ADMIN_APIS,
                    status: false
                })
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
                 toastr.success( ("Credit Score Addedd Successfully").toString())
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
                 toastr.success( (response?.data?.message|| "Credit Score Deleted Successfully").toString())

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
