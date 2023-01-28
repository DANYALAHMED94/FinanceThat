import {
    LOADING_LISTING,
    GET_LISTING,
    SINGLE_CHECK_LISTING,
    TOGGLE_ALL_CHECK_LISTING,
    REMOVE_ALL_STATE_LISTING,
    GET_LISTING_DETAIL,
    LOADING_LISTING_DETAIL,
    REMOVE_DETAIL_EDIT,
    TOGGLE_VEHICLE_MODEL,
    GET_VEHICLE_MODEL,
    TOGGLE_VEHICLE_TYPE,
    GET_TYPE_VEHICLES,
    TOGGLE_VEHICLE_MAKE,
    GET_VEHICLE_MAKES,
    TOGGLE_VEHICLE_TRIMS,
    GET_VEHICLE_TRIMS,
    GET_VEHICLE_BODY_TYPE,
    GET_VEHICLE_FUEL_TYPE,
    GET_VEHICLE_DRIVE_TRAIN,
    GET_VEHICLE_FEATURES,
    REMOVE_ALL,
    TOGGLE_VEHICLE_FEATURES,
    LOADING_LISTING_VEHICLE_UPDATE,
    LOADING_LISTING_VEHICLE_UPDATE_OVERVIEW,
    LOADING_LISTING_VEHICLE_UPDATE_LOCATION,
    LOADING_LISTING_VEHICLE_UPDATE_FEATURES,
    LOADING_LISTING_VEHICLE_UPDATE_DESCRIPTION,
    LOADING_LISTING_VEHICLE_APPROVED,
    LOADING_LISTING_VEHICLE_DECLINE,
    LOADING_LISTING_DELETE_IMAGES,
    LOADING_LISTING_UPDATE_IMAGES,
    LOADING_LISTING_DELETE_LISTING,
    LISTING_DELETE_LISTING_SUCCESS,
    LOADING_LISTING_VEHICLE_UPDATE_MAKE_MODEL,
    UPDATE_VEHICLE_MAKE_MODEL_SUCCESS,
    LISTING_ARCHIVE_SUCCESS,
    LOADING_ADMIN_APIS,
    LISTING_DELETE_LISTING_SUCCESS_SINGLE,
    LOADING_LISTING_DELETE_LISTING_SINGLE,
    LOADING_EXPIRE_UPDATE_LISTING,
    REACTIVE_EXPIRE_LISTING
} from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import simpleAxios from '../../_helpers/axios'
import { history } from '../../_helpers/history'
import axios from '../../_helpers/axiosInterceptorsAdmin'
export const get_listing = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING,
            status: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/staging_ap_listings/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)

            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_LISTING,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_LISTING,
                    status: false
                })
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING,
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
export const get_listing_pages = (url, data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING,
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
            console.log(response.data)

            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_LISTING,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_LISTING,
                    status: false
                })
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING,
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
export const single_check_listing = (id, filterName) => {
    return dispatch => {
        dispatch({
            type: SINGLE_CHECK_LISTING,
            id: id,
            filterName: filterName
        })
    }
}
export const toggle_all_check_listing = (status, filterName) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_ALL_CHECK_LISTING,
            status: status,
            filterName: filterName
        })
    }
}
export const remove_all_state_listing = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_STATE_LISTING
        })
    }
}
export const get_listing_detail = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_DETAIL,
            status: true
        })
        const url = `/ap_listings/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_LISTING_DETAIL,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: LOADING_LISTING_DETAIL,
                    status: false
                })
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
            }
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_DETAIL,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const remove_detail_edit = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_DETAIL_EDIT
        })
    }
}
export const get_vehicle_type = () => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_TYPE,
            status: false
        })
        const url = `/type_of_vehicle/list/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_TYPE_VEHICLES,
                    response: response.data.data
                })
            }
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_TYPE,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_make = (id) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_MAKE,
            status: false
        })
        const url = `/v_make/retrieve_by_type/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_MAKES,
                    response: response.data.data
                })
            }
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MAKE,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_model = (id) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_MODEL,
            status: false
        })
        const url = `/v_model/retrieve_by_make/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_MODEL,
                    response: response.data.data
                })
            }
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MODEL,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_trims = (modelId) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_TRIMS,
            status: false
        })
        const url = `/v_trim/retrieve_by_model/${modelId}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_TRIMS,
                    response: response.data.data
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_TRIMS,
                    response: []
                })
            }
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_TRIMS,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_sub_type_vehicle_make = (id) => {
    return dispatch => {
        const url = `/v_make/retrieve_by_subtype/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_MAKES,
                    response: response.data.data
                })
            }
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_body_type = (id) => {
    return dispatch => {
        const url = `/body_type/retrieve_by_type/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_BODY_TYPE,
                    response: response.data.data
                })
            }
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_fuel_type = () => {
    return dispatch => {
        const url = `/fuel_type/list/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_FUEL_TYPE,
                    response: response.data.data
                })
            }
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_drive_train = () => {
    return dispatch => {
        const url = `/drive_train/list/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_DRIVE_TRAIN,
                    response: response.data.data
                })
            }
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_feature = (id) => {
    return dispatch => {
        const url = `/v_features/list/${id}/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_FEATURES,
                    response: response.data.data
                })
            }
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const toggle_vehicle_features = (id) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_FEATURES,
            id: id
        })
    }
}
export const remove_all = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL
        })
    }
}
export const update_listing_vehicle_detail = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_VEHICLE_UPDATE,
            status: true
        })
        const url = `ap_listings/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        // simpleAxios(options).then(response => {
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Update Vehicle Detail Successfully'

                toastr.success( message.toString())
            }
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const update_listing_vehicle_overview = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_VEHICLE_UPDATE_OVERVIEW,
            status: true
        })
        const url = `ap_listings/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Update Vehicle Detail Successfully'

                toastr.success( message.toString())
            }
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_OVERVIEW,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_OVERVIEW,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const update_listing_vehicle_location = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_VEHICLE_UPDATE_LOCATION,
            status: true
        })
        const url = `ap_listings/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Update Vehicle Detail Successfully'

                toastr.success(message.toString())
            }
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_LOCATION,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_LOCATION,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const update_listing_vehicle_features = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_VEHICLE_UPDATE_FEATURES,
            status: true
        })
        const url = `ap_listings/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Update Vehicle Detail Successfully'

                toastr.success( message.toString())
            }
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_FEATURES,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_FEATURES,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const update_listing_vehicle_description = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_VEHICLE_UPDATE_DESCRIPTION,
            status: true
        })
        const url = `ap_listings/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Update Vehicle Detail Successfully'

                toastr.success(message.toString())
            }
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_DESCRIPTION,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_DESCRIPTION,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const delete_listing_image = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_DELETE_IMAGES,
            status: true
        })
        const url = `ap_listings/`
        const options = {
            method: 'POST',
            // headers: { 'Content-Type': 'multipart/form-data' },
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : ' Vehicle Image Delete Successfully'
                toastr.success(message.toString())
            }
            dispatch({
                type: LOADING_LISTING_DELETE_IMAGES,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_DELETE_IMAGES,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const add_listing_image = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_UPDATE_IMAGES,
            status: true
        })
        const url = `ap_listings/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            // headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Update Vehicle Detail Successfully'
                toastr.success(message.toString())
            }
            dispatch({
                type: LOADING_LISTING_UPDATE_IMAGES,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_UPDATE_IMAGES,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const approved_listing = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_VEHICLE_APPROVED,
            status: true
        })
        const url = `ap_listings/${data.id}/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Approved Vehicle Detail Successfully'
                toastr.success(message.toString())
                history.push('/admin/pending-listing')
            }
            dispatch({
                type: LOADING_LISTING_VEHICLE_APPROVED,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_VEHICLE_APPROVED,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const decline_listing = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_VEHICLE_DECLINE,
            status: true
        })
        const url = `ap_listings/${data.id}/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Decline Vehicle Detail Successfully'
                toastr.success( message.toString())
                history.push('/admin/pending-listing')
            }
            dispatch({
                type: LOADING_LISTING_VEHICLE_DECLINE,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_VEHICLE_DECLINE,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const soft_delete_single_listing = (id, search) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        dispatch({
            type: LOADING_LISTING_DELETE_LISTING_SINGLE,
            status: true,
            id: id
        })
        const url = `/del-listing/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { id: [id] },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                const message = response.data.message !== undefined ? response.data.message : 'Listing Delete Successfully'
                toastr.success(message.toString())
                dispatch({
                    type: LISTING_DELETE_LISTING_SUCCESS_SINGLE,
                    id: id
                })
            }
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING_SINGLE,
                status: false,
                id: ''
            })
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING_SINGLE,
                status: false,
                id: ''
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
export const soft_delete_listings = (ids, search) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        dispatch({
            type: LOADING_LISTING_DELETE_LISTING,
            status: true
        })
        const url = `/del-listing/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { id: ids },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Listing Delete Successfully'
                toastr.success(message.toString())
                dispatch({
                    type: LISTING_DELETE_LISTING_SUCCESS,
                    ids: ids
                })
            }
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING,
                status: false
            })
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING,
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
export const permament_delete_listings = (ids, search) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        dispatch({
            type: LOADING_LISTING_DELETE_LISTING,
            status: true
        })
        const url = `ap_listings/`
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: { list_of_ids: ids },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                const message = response.data.message !== undefined ? response.data.message : 'Listing Delete Successfully'
                toastr.success(message.toString())
                dispatch({
                    type: LISTING_DELETE_LISTING_SUCCESS,
                    ids: ids
                })
            }
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING,
                status: false
            })
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING,
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
export const permament_delete_single_listing = (id, search) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        dispatch({
            type: LOADING_LISTING_DELETE_LISTING_SINGLE,
            status: true,
            id: id
        })
        const url = `ap_listings/`
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            data: { list_of_ids: [id] },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Listing Delete Successfully'
                toastr.success(message.toString())
                dispatch({
                    type: LISTING_DELETE_LISTING_SUCCESS_SINGLE,
                    id: id
                })
            }
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING_SINGLE,
                status: false,
                id: ''
            })
            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING_SINGLE,
                status: false,
                id: ''
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
export const archive_listing = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_LISTING_DELETE_LISTING,
            status: true
        })
        const url = `ap_listings/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success === true) {
                const message = response.data.message !== undefined ? response.data.message : 'Listing Delete Successfully'
                toastr.success(message.toString())
                dispatch({
                    type: LISTING_ARCHIVE_SUCCESS,
                    ids: data.list_of_ids
                })
            }
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_DELETE_LISTING,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const update_make_model = (data) => {
    return dispatch => {
        // 
        dispatch({
            type: LOADING_LISTING_VEHICLE_UPDATE_MAKE_MODEL,
            status: true
        })
        const url = `ap_update_vehicle_make_model/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                console.log(data.update, 'sadasdas')
                if (data.update == 'model') {
                    dispatch(update_listing_make_model({
                        update: 'ad',
                        model: response.data.data.id,
                        list_id: data.list_id
                    }))
                } else {
                    dispatch(update_listing_make_model({
                        update: 'ad',
                        make: response.data.data.id,
                        list_id: data.list_id,
                        model: response.data.data.vmake_id[0].id
                    }))
                }


                const message = response.data.message !== undefined ? response.data.message : 'Update Vehicle Make Model Successfully'

                toastr.success(message.toString())
                dispatch({
                    type: UPDATE_VEHICLE_MAKE_MODEL_SUCCESS
                })
            } else {
                toastr.error('Error', 'Not Updated Successfully')
            }
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_MAKE_MODEL,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: LOADING_LISTING_VEHICLE_UPDATE_MAKE_MODEL,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
const update_listing_make_model = (data) => {
    return dispatch => {
        const url = `ap_listings/${data.list_id}/`
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {
            console.log(response.data)
            if (response.data.success !== undefined && response.data.success == true) {
                const message = response.data.message !== undefined ? response.data.message : 'Update Vehicle Detail Successfully'
            }
        }).catch(err => {
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}
export const expire_update_list = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_EXPIRE_UPDATE_LISTING,
            status: true,
        })
        const url = `ap_listings/${data.list_id}/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: data,
            url
        }
        axios(options).then(response => {

            if (response.data.success !== undefined && response.data.success == true) {
                const message = response.data.message !== undefined ? response.data.message : 'Listing Delete Successfully'
                toastr.success(message.toString())
                dispatch({
                    type: REACTIVE_EXPIRE_LISTING,
                })
            }
            dispatch({
                type: LOADING_EXPIRE_UPDATE_LISTING,
                status: false,
            })
        }).catch(err => {
            dispatch({
                type: LOADING_EXPIRE_UPDATE_LISTING,
                status: false,
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}