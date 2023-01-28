import {
    LOADING_USERS,
    GET_USERS,
    GET_DEALER_ADMIN_USER_ROLES,
    GET_DEALER_ADMIN_USER_DETAIL,
    SINGLE_CHECK_DEALER_ADMIN_USER,
    TOGGLE_ALL_CHECK_DEALER_ADMIN_USER,
    REMOVE_ALL_STATE_DEALER_ADMIN_USER,
    LOADING_DELETEING_DEALER_ADMIN_USER,
    LOADING_UPDATE_DEALER_ADMIN_PERMISSION,
    DEALER_ADMIN_SCREENS,
    LOADING_DEALER_APIS,
    DELETE_SINGLE_AGENT,
    DELETE_MULTIPLE_DEALER_ADMIN_USER,
    LOADING_UPDATE_DEALER_ADMIN_USER_DETAIL
} from '../../_constants/dealerConstants'
import { ADMIN_SCREENS } from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import axios from '../../_helpers/axiosInterceptorsAdmin'
import { history } from '../../_helpers/history'
export const get_users = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_USERS,
            status: true
        })
        dispatch({
            type: LOADING_DEALER_APIS,
            status: true
        })
        const url = `/dealer_details/Employee/${data.dealer_id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_USERS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_USERS,
                    status: false
                })
            }

            dispatch({
                type: LOADING_DEALER_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_USERS,
                status: false
            })
            dispatch({
                type: LOADING_DEALER_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}

export const get_dealer_admin_users = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_USERS,
            status: true
        })
        dispatch({
            type: LOADING_DEALER_APIS,
            status: true
        })
        const url = `/dealer_user/${data.dealer_id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_USERS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_USERS,
                    status: false
                })
            }

            dispatch({
                type: LOADING_DEALER_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_USERS,
                status: false
            })
            dispatch({
                type: LOADING_DEALER_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}

export const get_users_pages = (url) => {
    return dispatch => {
        dispatch({
            type: LOADING_USERS,
            status: true
        })
        dispatch({
            type: LOADING_DEALER_APIS,
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
                    type: GET_USERS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_USERS,
                    status: false
                })
            }

            dispatch({
                type: LOADING_DEALER_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_USERS,
                status: false
            })
            dispatch({
                type: LOADING_DEALER_APIS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_user_roles = () => {
    return dispatch => {
        const url = `/ap_userroles/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success === true) {
                dispatch({
                    type: GET_DEALER_ADMIN_USER_ROLES,
                    response: response.data.data
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const create_new_user = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_USERS,
            status: true
        })
        const url = `/dealer_details/Employee/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: LOADING_USERS,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'User Created Successfully'
                toastr.success(message.toString())
                history.push('/dealer-admin/users')
            } else {
                dispatch({
                    type: LOADING_USERS,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'User Not Created Successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_USERS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const get_user_detail = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_USERS,
            status: true
        })
        const url = `/ap_adminuser/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_DEALER_ADMIN_USER_DETAIL,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: LOADING_USERS,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_USERS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const delete_user = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_DELETEING_DEALER_ADMIN_USER,
            status: true,
            id: id
        })
        const url = `/ap_adminuser/${id}/`
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: LOADING_DELETEING_DEALER_ADMIN_USER,
                    status: false,
                    id: ''
                })
                history.push('/dealer-admin/users')
                const message = response.data.message !== undefined ? response.data.message : 'record deleted successfully'
                toastr.success(message.toString())
            } else {
                dispatch({
                    type: LOADING_DELETEING_DEALER_ADMIN_USER,
                    status: false,
                    id: ''
                })
                const message = response.data.message !== undefined ? response.data.message : 'record not deleted successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_DELETEING_DEALER_ADMIN_USER,
                status: false,
                id: ''
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const single_check_user = (id) => {
    return dispatch => {
        dispatch({
            type: SINGLE_CHECK_DEALER_ADMIN_USER,
            id: id,
        })
    }
}
export const toggle_all_check_user = (status) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_ALL_CHECK_DEALER_ADMIN_USER,
            status: status,
        })
    }
}
export const remove_all_state_user = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_STATE_DEALER_ADMIN_USER
        })
    }
}
export const update_user_permissions = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_UPDATE_DEALER_ADMIN_PERMISSION,
            status: true
        })
        const url = `/ap_adminuser/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: LOADING_UPDATE_DEALER_ADMIN_PERMISSION,
                    status: false
                })
                const currentAdminId = localStorage.getItem('userId') ? localStorage.getItem('userId') : ''
                if (Number(data.id) === Number(currentAdminId)) {
                    localStorage.removeItem('dealerSccrens')
                    localStorage.setItem('dealerSccrens', JSON.stringify(response.data.data))
                    dispatch({
                        type: ADMIN_SCREENS,
                        screens: response.data.data
                    })
                }

                const message = response.data.message !== undefined ? response.data.message : 'User Permissions Update Successfully'
                toastr.success(message.toString())
            } else {
                dispatch({
                    type: LOADING_UPDATE_DEALER_ADMIN_PERMISSION,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'User Permissions Not Update Successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_UPDATE_DEALER_ADMIN_PERMISSION,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const update_user_detail = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_UPDATE_DEALER_ADMIN_USER_DETAIL,
            status: true
        })
        const url = `/ap_adminuser/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: LOADING_UPDATE_DEALER_ADMIN_USER_DETAIL,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'User Permissions Update Successfully'
                toastr.success(message.toString())
            } else {
                dispatch({
                    type: LOADING_UPDATE_DEALER_ADMIN_USER_DETAIL,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'User Permissions Not Update Successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_UPDATE_DEALER_ADMIN_USER_DETAIL,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const delete_single_user = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_DELETEING_DEALER_ADMIN_USER,
            status: true,
            id: id
        })
        const url = `/ap_adminuser/${id}/`
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: DELETE_SINGLE_AGENT,
                    id: id
                })
                const message = response.data.message !== undefined ? response.data.message : 'record deleted successfully'
                toastr.success(message.toString())
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'record not deleted successfully'
                toastr.error('Error', message.toString())
            }
            dispatch({
                type: LOADING_DELETEING_DEALER_ADMIN_USER,
                status: false,
                id: ''
            })
        }).catch(err => {
            dispatch({
                type: LOADING_DELETEING_DEALER_ADMIN_USER,
                status: false,
                id: ''
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const delete_multi_user = (ids) => {
    return dispatch => {
        const url = `/ap_adminuser/[${ids}]/`
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },

            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: DELETE_MULTIPLE_DEALER_ADMIN_USER,
                    ids: ids
                })
                const message = response.data.message !== undefined ? response.data.message : 'record deleted successfully'
                toastr.success(message.toString())
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'record not deleted successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}