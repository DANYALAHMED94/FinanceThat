import {
    LOADING_AGENTS,
    GET_AGENTS,
    GET_USER_ROLES,
    GET_AGENT_DETAIL,
    SINGLE_CHECK_AGENTS,
    TOGGLE_ALL_CHECK_AGENTS,
    REMOVE_ALL_STATE_AGENTS,
    LOADING_DELETEING_AGENTS,
    LOADING_UPDATE_AGENT_PERMISSION,
    ADMIN_SCREENS,
    LOADING_ADMIN_APIS,
    DELETE_SINGLE_AGENT,
    DELETE_MULTIPLE_AGENT,
    LOADING_UPDATE_AGENT_DETAIL
} from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import axios from '../../_helpers/axiosInterceptorsAdmin'
import { history } from '../../_helpers/history'
export const get_agents = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_AGENTS,
            status: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        // dispatch({
        //     type: GET_AGENTS,
        //     response: [],
        // })
        const url = `/staging_ap_adminuser/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_AGENTS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_AGENTS,
                    status: false
                })
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_AGENTS,
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
export const get_agents_pages = (url) => {
    return dispatch => {
        dispatch({
            type: LOADING_AGENTS,
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
                    type: GET_AGENTS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_AGENTS,
                    status: false
                })
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_AGENTS,
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
                    type: GET_USER_ROLES,
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
export const create_new_agent = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_AGENTS,
            status: true
        })
        const url = `/ap_adminuser/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: LOADING_AGENTS,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'Agent Created Successfully'
                toastr.success( message.toString())
                history.push('/admin/agent-listing')
            } else {
                dispatch({
                    type: LOADING_AGENTS,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'Agent Not Created Successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_AGENTS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const get_agent_detail = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_AGENTS,
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
                    type: GET_AGENT_DETAIL,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: LOADING_AGENTS,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_AGENTS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const delete_agent = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_DELETEING_AGENTS,
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
                    type: LOADING_DELETEING_AGENTS,
                    status: false,
                    id: ''
                })
                history.push('/admin/agent-listing')
                const message = response.data.message !== undefined ? response.data.message : 'record deleted successfully'
                toastr.success( message.toString())
            } else {
                dispatch({
                    type: LOADING_DELETEING_AGENTS,
                    status: false,
                    id: ''
                })
                const message = response.data.message !== undefined ? response.data.message : 'record not deleted successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_DELETEING_AGENTS,
                status: false,
                id: ''
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const single_check_agent = (id) => {
    return dispatch => {
        dispatch({
            type: SINGLE_CHECK_AGENTS,
            id: id,
        })
    }
}
export const toggle_all_check_agent = (status) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_ALL_CHECK_AGENTS,
            status: status,
        })
    }
}
export const remove_all_state_agent = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_STATE_AGENTS
        })
    }
}
export const update_agent_permissions = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_UPDATE_AGENT_PERMISSION,
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
                    type: LOADING_UPDATE_AGENT_PERMISSION,
                    status: false
                })
                const currentAdminId = localStorage.getItem('adminId') ? localStorage.getItem('adminId') : ''
                if (Number(data.id) === Number(currentAdminId)) {
                    localStorage.removeItem('adminSccrens')
                    localStorage.setItem('adminSccrens', JSON.stringify(response.data.data))
                    dispatch({
                        type: ADMIN_SCREENS,
                        screens: response.data.data
                    })
                }

                const message = response.data.message !== undefined ? response.data.message : 'Agent Permissions Update Successfully'
                toastr.success( message.toString())
            } else {
                dispatch({
                    type: LOADING_UPDATE_AGENT_PERMISSION,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'Agent Permissions Not Update Successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_UPDATE_AGENT_PERMISSION,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const update_agent_detail = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_UPDATE_AGENT_DETAIL,
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
                    type: LOADING_UPDATE_AGENT_DETAIL,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'Agent Permissions Update Successfully'
                toastr.success(message.toString())
            } else {
                dispatch({
                    type: LOADING_UPDATE_AGENT_DETAIL,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'Agent Permissions Not Update Successfully'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_UPDATE_AGENT_DETAIL,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const delete_single_agent = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_DELETEING_AGENTS,
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
                toastr.success( message.toString())
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'record not deleted successfully'
                toastr.error('Error', message.toString())
            }
            dispatch({
                type: LOADING_DELETEING_AGENTS,
                status: false,
                id: ''
            })
        }).catch(err => {
            dispatch({
                type: LOADING_DELETEING_AGENTS,
                status: false,
                id: ''
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const delete_multi_agent = (ids) => {
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
                    type: DELETE_MULTIPLE_AGENT,
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