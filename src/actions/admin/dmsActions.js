import {
    LOADING_DMS_ACCOUNT,
    GET_DMS_DETAIL,
    LOADING_ADMIN_APIS,
    GET_DMS_ACCOUNT_ROW,
    REMOVE_UPDATE_ROW_DMS,
    GET_DMS_DEALER_DETAIL,
    GET_DMS_DEALER_FEED,
    UPDATE_DMS_ACCOUNT_LOADING,
    REMOVE_ALL_STATE_DMS,
    SINGLE_DMS_CHECK,
    TOGGLE_ALL_DMS_CHECK,
    LOADING_DELETE_SINGLE_DMS,
    DELETE_SINGLE_DMS,
    DELETE_MULTIPLE_DMS,
    SINGLE_DMS_DEALER_CHECK,
    TOGGLE_ALL_DMS_DEALER_CHECK,
    DELETE_SINGLE_DMS_DEALER,
    DELETE_MULTIPLE_DMS_DEALER
} from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import axios from '../../_helpers/axiosInterceptorsAdmin'
/** DMS Datatable Actions */
export const get_dms_detail = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/dms/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {

            console.log(response)
            if (response.data.success !== undefined && response.data.success === true) {
                dispatch({
                    type: GET_DMS_DETAIL,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const single_check_dms = (id) => {
    return dispatch => {
        dispatch({
            type: SINGLE_DMS_CHECK,
            id: id,
        })
    }
}
export const toggle_all_check_dms = (status) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_ALL_DMS_CHECK,
            status: status,
        })
    }
}
export const delete_single_dms = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_DELETE_SINGLE_DMS,
            status: true,
            id: id
        })
        const url = `/dms/multidel/1`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: { list_of_ids: [id] },
            url,
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: DELETE_SINGLE_DMS,
                        id: id
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())
                }
                dispatch({
                    type: LOADING_DELETE_SINGLE_DMS,
                    status: false,
                    id: ''
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_DELETE_SINGLE_DMS,
                    status: false,
                    id: ''
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_multiple_dms = (ids) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/dms/multidel/1`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: { list_of_ids: ids },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: DELETE_MULTIPLE_DMS,
                        id: ids
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())
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
/** DMS Account Actions */
export const get_dms_account = id => {
    return dispatch => {
        dispatch({
            type: LOADING_DMS_ACCOUNT,
            status: true
        })
        const url = `/dms/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                dispatch({
                    type: GET_DMS_ACCOUNT_ROW,
                    response: [response.data.data],
                })
            } else {
                dispatch({
                    type: LOADING_DMS_ACCOUNT,
                    status: false
                })
            }
        }).catch(err => {
            dispatch({
                type: LOADING_DMS_ACCOUNT,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const update_dms_account = data => {
    return dispatch => {
        dispatch({
            type: UPDATE_DMS_ACCOUNT_LOADING,
            status: true
        })
        const url = `/dms/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success === true) {
                // dispatch({
                //     type: GET_DMS_ACCOUNT_ROW,
                //     response: [response.data.data],
                // })
                toastr.success('DMS Account Updated Successfully')
            }
            dispatch({
                type: UPDATE_DMS_ACCOUNT_LOADING,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: UPDATE_DMS_ACCOUNT_LOADING,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
/** DMS Dealer Detail Actions */
export const get_dms_dealer_detail = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/dms/d_detail/${data.id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_DMS_DEALER_DETAIL,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const single_check_dms_dealer = (id) => {
    return dispatch => {
        dispatch({
            type: SINGLE_DMS_DEALER_CHECK,
            id: id,
        })
    }
}
export const toggle_all_check_dms_dealer = (status) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_ALL_DMS_DEALER_CHECK,
            status: status,
        })
    }
}
export const delete_single_dms_dealer = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_DELETE_SINGLE_DMS,
            status: true,
            id: id
        })
        const url = `/dealer/multidel/1`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: { list_of_ids: [id] },
            url,
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: DELETE_SINGLE_DMS_DEALER,
                        id: id
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())
                }
                dispatch({
                    type: LOADING_DELETE_SINGLE_DMS,
                    status: false,
                    id: ''
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_DELETE_SINGLE_DMS,
                    status: false,
                    id: ''
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_multiple_dms_dealer = (ids) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/dealer/multidel/1`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: { list_of_ids: [ids] },
            url,
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: DELETE_MULTIPLE_DMS_DEALER,
                        id: ids
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())
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
/** DMS Feed Detail Actions */
export const dms_dealer_feed = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })

        const url = `/import/logs/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_DMS_DEALER_FEED,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())

            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const remove_all_state = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_STATE_DMS
        })
    }
}
export const remove_update_row = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_UPDATE_ROW_DMS
        })
    }
}
