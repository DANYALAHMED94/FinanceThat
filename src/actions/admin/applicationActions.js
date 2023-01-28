/* eslint-disable array-callback-return */
import {
    LOADING_ADMIN_APPLICATIONS,
    GET_PENDING_ACTIVE_APPLICATIONS,
    SINGLE_CHECK_APPLICATION,
    TOGGLE_ALL_CHECK_APPLICATION,
    REMOVE_ALL_STATE_APPLICATION,
    UPDATE_APPLICATION_ROW_DATA,
    GET_ADDTIONAL_TYPE_ADMIN, GET_VEHICLE_MAKES_EDIT_POST_APP_ADMIN,
    TOGGLE_VEHICLE_MAKE_EDIT_POST_APP_ADMIN,
    GET_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
    TOGGLE_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
    TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
    GET_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
    EDIT_POST_APP_LOADING_ADMIN,
    EDIT_POST_APP_UPDATE_ADMIN,
    REMOVE_UPDATE_ROW_APPLICATION,
    DELETE_ADDTIONAL_INFO_LOADING_ADMIN,
    DELETE_ADDTIONAL_INFO_ADMIN,
    LOADING_ADMIN_APIS,
    DELETE_VEHICLE_DETAIL_ADMIN,
    DELETE_VEHICLE_DETAIL_LOADING_ADMIN,
    DELETE_UPLOADED_DOC_ADMIN,
    DELETE_UPLOAD_DOC_LOADING_ADMIN,
    FLINKS_REQUEST_ID_RESPONSE_ADMIN,
    LOADING_FLINKS_REQUEST_ID_ADMIN,
    LOADING_FLINKS_LOGIN_ID_ADMIN,
    FLINKS_LOGIN_ID_RESPONSE_ADMIN,
    DELETE_SINGLE_APPLICATION,
    LOADING_DELETE_SINGLE_APPLICATION,
    DELETE_MULTIPLE_APPLICATION,
    GET_CREDIT_REPORT_DATA,
    LOADING_ADMIN_EDIT_POST_STOCK_DETAIL,
    ADMIN_EDIT_POST_STOCK_DETAIL,
    ADMIN_DELETE_COAPPLICANT_INFO,
    ADMIN_DELETE_COAPPLICANT_LOADING,
    UPDATE_APPLICATION_STATUSES,
    GET_CO_APPLICANT_CREDIT_REPORT_DATA,
    ADMIN_JUMIO_LOADING,
    ADMIN_JUMIO_INFO,
    GET_AGENTS_APPLICATON,
    EDIT_ADMIN_POST_APP_UPDATE_UPLOAD_DOC,
    DELETE_LOAN_DOC,
    GET_PDF_DATA,
    GET_ASSIGNED_DEALER,
    GET_UNIT_FROM
} from '../../_constants/constants'
import { toastr } from 'react-redux-toastr'
import simpleAxios from '../../_helpers/axios'
import axios from '../../_helpers/axiosInterceptorsAdmin'
import actualAxios from 'axios'
import { history } from '../../_helpers'
export const get_application_agents = () => {
    return dispatch => {
        const url = `/ap_adminuser/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            console.log(response, 'Agent response')
            if (response.data.success !== undefined && response.data.success === true) {
                dispatch({
                    type: GET_AGENTS_APPLICATON,
                    response: response.data.data,
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
export const get_pending_active_application = (data) => {
    return dispatch => {
        dispatch({
            type: GET_PENDING_ACTIVE_APPLICATIONS,
            response: [],
            count: 0,
            pages: [],
        })
        dispatch({
            type: LOADING_ADMIN_APPLICATIONS,
            status: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/admin_panel_applications/`
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: data,
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success === true) {
                dispatch({
                    type: GET_PENDING_ACTIVE_APPLICATIONS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {
                dispatch({
                    type: GET_PENDING_ACTIVE_APPLICATIONS,
                    response: [],
                    count: 0,
                    pages: [],
                })
                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_ADMIN_APPLICATIONS,
                    status: false
                })
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {
            dispatch({
                type: GET_PENDING_ACTIVE_APPLICATIONS,
                response: [],
                count: 0,
                pages: [],
            })
            dispatch({
                type: LOADING_ADMIN_APPLICATIONS,
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
export const get_pending_active_application_paging = (pageUrl, data) => {
    return dispatch => {

        dispatch({
            type: LOADING_ADMIN_APPLICATIONS,
            status: true
        })
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = pageUrl
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        axios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_PENDING_ACTIVE_APPLICATIONS,
                    response: response.data.data.results,
                    count: response.data.data.count,
                    pages: response.data.pages,
                })
            } else {

                const message = response.data.message !== undefined ? response.data.message : 'No Record Found'
                toastr.error('Error', message.toString())
                dispatch({
                    type: LOADING_ADMIN_APPLICATIONS,
                    status: false
                })
            }

            dispatch({
                type: LOADING_ADMIN_APIS,
                status: false
            })
        }).catch(err => {

            dispatch({
                type: LOADING_ADMIN_APPLICATIONS,
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
export const single_check_application = (id) => {
    return dispatch => {
        dispatch({
            type: SINGLE_CHECK_APPLICATION,
            id: id,
        })
    }
}
export const toggle_all_check = (status) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_ALL_CHECK_APPLICATION,
            status: status,
        })
    }
}
export const remove_update_row = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_UPDATE_ROW_APPLICATION
        })
    }
}
export const downloadFile = (filePath) => {
    return dispatch => {
        const url = `${filePath}`
        const options = {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
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
            dispatch({
                type: LOADING_ADMIN_APPLICATIONS,
                status: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}

export const get_addtional_type = () => {
    return dispatch => {
        const url = `/additional_item_type/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: GET_ADDTIONAL_TYPE_ADMIN,
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
export const get_application_detail = (id) => {
    return dispatch => {
        const url = `/application/${id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: UPDATE_APPLICATION_ROW_DATA,
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
export const get_vehicle_make = (id, index, prevId) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_MAKE_EDIT_POST_APP_ADMIN,
            status: false
        })
        const url = `/v_make/retrieve_by_type/${id}/`
        let options = {}
        options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                console.log(response.data.data)
                dispatch({
                    type: GET_VEHICLE_MAKES_EDIT_POST_APP_ADMIN,
                    // response: [{ [`vehicle${index}`]: response.data.data }],
                    response: response.data.data,
                    index: index,
                    prevId: prevId,
                    id: id
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_MAKES_EDIT_POST_APP_ADMIN,
                    response: [],
                    index: index
                })
            }
            dispatch({
                type: TOGGLE_VEHICLE_MAKE_EDIT_POST_APP_ADMIN,
                status: true
            })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MAKE_EDIT_POST_APP_ADMIN,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_model = (id, index, prevId) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
            status: false
        })
        const url = `/v_model/retrieve_by_make/${id}/`
        let options = {}

        options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
                    response: response.data.data,
                    index: index,
                    prevId: prevId,
                    id: id
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
                    response: [],
                    index: index
                })
            }
            dispatch({
                type: TOGGLE_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
                status: true
            })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MODEL_EDIT_POST_APP_ADMIN,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const get_vehicle_trims = (modelId, index, prevId) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
            status: false
        })
        const url = `/v_trim/retrieve_by_model/${modelId}/`
        let options = {}
        options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url
        }
        simpleAxios(options).then(response => {
            if (response.data.success !== undefined && response.data.success == true) {
                dispatch({
                    type: GET_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
                    response: response.data.data,
                    index: index,
                    prevId: prevId,
                    id: modelId
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
                    response: [],
                    index: index
                })
            }
            dispatch({
                type: TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
                status: true
            })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP_ADMIN,
                status: true
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const update_application_detail = (data, screenName) => {
    return dispatch => {
        dispatch({
            type: EDIT_POST_APP_LOADING_ADMIN,
            status: true,
        })
        const url = `/application/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: EDIT_POST_APP_UPDATE_ADMIN,
                        screenName: screenName,
                        response: response.data.data
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false,
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false,
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const update_application_detail_complete = (data, stateName) => {
    return dispatch => {
        const url = `/application/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: UPDATE_APPLICATION_STATUSES,
                        stateName: stateName,
                        status: data[stateName]
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const update_application_detail_file = (data, id, screenName) => {
    return dispatch => {
        dispatch({
            type: EDIT_POST_APP_LOADING_ADMIN,
            status: true
        })
        const url = `/application/${id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            // headers: { 'Content-Type': 'multipart/form-data' },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: EDIT_POST_APP_UPDATE_ADMIN,
                        screenName: screenName,
                        response: response.data.data
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const update_application_upload_doc_file = (data, id, screenName) => {
    return dispatch => {
        dispatch({
            type: EDIT_POST_APP_LOADING_ADMIN,
            status: true
        })
        // const url = `/application/${id}/`
        const url = `/docs/`
        const options = {
            // method: 'PUT',
            method: 'POST',
            // headers: { "Content-Type": "application/json; charset=utf8" },
            // headers: { 'Content-Type': 'multipart/form-data' },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: EDIT_ADMIN_POST_APP_UPDATE_UPLOAD_DOC,
                        response: response.data.data
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const remove_all_state_application = () => {
    return dispatch => {
        dispatch({
            type: REMOVE_ALL_STATE_APPLICATION
        })
    }
}
export const delete_addtional_info = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_ADDTIONAL_INFO_LOADING_ADMIN,
            status: true
        })
        const url = `/additional_items/${id}/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: DELETE_ADDTIONAL_INFO_ADMIN,
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_ADDTIONAL_INFO_LOADING_ADMIN,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_ADDTIONAL_INFO_LOADING_ADMIN,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_vehicle_detail = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_VEHICLE_DETAIL_LOADING_ADMIN,
            status: true
        })

        const url = `/vehicles/${id}/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: DELETE_VEHICLE_DETAIL_ADMIN,
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_VEHICLE_DETAIL_LOADING_ADMIN,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_VEHICLE_DETAIL_LOADING_ADMIN,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_upload_doc = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_UPLOAD_DOC_LOADING_ADMIN,
            status: true,
            id: id
        })

        const url = `/del_docs/${id}/`
        // const url = `/required_docs/${id}/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: DELETE_UPLOADED_DOC_ADMIN,
                        id: id
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_UPLOAD_DOC_LOADING_ADMIN,
                    status: false,
                    id: id
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_UPLOAD_DOC_LOADING_ADMIN,
                    status: false,
                    id: id
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_upload_doc_file = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_UPLOAD_DOC_LOADING_ADMIN,
            status: true,
            id: id
        })

        const url = `/docs/${id}/`
        // const url = `/required_docs/${id}/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: DELETE_UPLOADED_DOC_ADMIN,
                        id: id
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_UPLOAD_DOC_LOADING_ADMIN,
                    status: false,
                    id: id
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_UPLOAD_DOC_LOADING_ADMIN,
                    status: false,
                    id: id
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_loan_doc_file = (data, id) => {
    return dispatch => {
        dispatch({
            type: DELETE_LOAN_DOC,
            status: true,
            deleted: false
        })

        const url = `/application/${id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: DELETE_LOAN_DOC,
                        status: false,
                        deleted: true
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_LOAN_DOC,
                    status: false,
                    deleted: false
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_LOAN_DOC,
                    status: false,
                    deleted: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_flinks_images = (imagePath) => {
    return dispatch => {
        const url = `${imagePath}`
        // const url = `/required_docs/${id}/`
        const stri = btoa("31fbe50c-7f4b-4a5f-9448-b82f305227bb:aLCvlu9mDwqhttt5rDe6aIReMViFYriq");
        const options = {
            method: 'GET',
            headers: { "Content-Type": "image/jpeg", 'Authorization': `Basic ${stri}`, 'User-Agent': 'YOUR-SERVICE-NAME', 'Accept': 'image/jpeg' },
            url,

        }
        simpleAxios(options)
            .then(response => {
                console.log(response, 'image path finks')
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_login_id_flinks = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_FLINKS_REQUEST_ID_ADMIN,
            status: true
        })
        const url = `https://financethat-api.private.fin.ag/v3/ea9dfd62-a012-4e73-bdb1-ee5c0f954b04/BankingServices/GetAccountsDetail`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        simpleAxios(options)
            .then(response => {
                console.log(response, 'get_login_id_flinks')
                if (response.data.success == true) {
                    dispatch({
                        type: FLINKS_REQUEST_ID_RESPONSE_ADMIN,
                        response: response
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: LOADING_FLINKS_REQUEST_ID_ADMIN,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_FLINKS_REQUEST_ID_ADMIN,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const login_flinks = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_FLINKS_LOGIN_ID_ADMIN,
            status: true
        })
        const url = `https://financethat-api.private.fin.ag/v3/ea9dfd62-a012-4e73-bdb1-ee5c0f954b04/BankingServices/Authorize`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        simpleAxios(options)
            .then(response => {
                console.log(response, 'login_flinks')
                if (response.data.success == true) {
                    dispatch({
                        type: FLINKS_LOGIN_ID_RESPONSE_ADMIN,
                        response: response
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: LOADING_FLINKS_LOGIN_ID_ADMIN,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_FLINKS_LOGIN_ID_ADMIN,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_single_row = (id, search) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        dispatch({
            type: LOADING_DELETE_SINGLE_APPLICATION,
            status: true,
            id: id
        })
        const url = `/del-application/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: { id: [id] },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: DELETE_SINGLE_APPLICATION,
                        id: id
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())
                }
                dispatch({
                    type: LOADING_DELETE_SINGLE_APPLICATION,
                    status: false,
                    id: ''
                })
                dispatch({
                    type: LOADING_ADMIN_APIS,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_DELETE_SINGLE_APPLICATION,
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
export const delete_multi_row = (ids, search) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_APIS,
            status: true
        })
        const url = `/del-application/`
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
                        type: DELETE_MULTIPLE_APPLICATION,
                        ids: ids
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

// credit application

export const get_credit_details = (id) => {
    return dispatch => {
        const url = `/credit_report/${id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        simpleAxios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: GET_CREDIT_REPORT_DATA,
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
export const remove_credit_details = () => {
    return dispatch => {
                    dispatch({
                        type: GET_CREDIT_REPORT_DATA,
                        response: []
                    })
    }
}
// Co Applicant Credit Report

export const get_co_applicant_credit_details = (id) => {
    return dispatch => {
        const url = `/co_credit_report/${id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: GET_CO_APPLICANT_CREDIT_REPORT_DATA,
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

export const get_stock_id_detail = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_ADMIN_EDIT_POST_STOCK_DETAIL,
            status: true
        })
        dispatch({
            type: ADMIN_EDIT_POST_STOCK_DETAIL,
            response: [],
        })
        // const url = `/ads/${id}/`
        const url = `/listing/${id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                console.log(response.data)
                if (response.data.success == true) {
                    dispatch({
                        type: ADMIN_EDIT_POST_STOCK_DETAIL,
                        response: [response.data.data],
                    })
                }
                dispatch({
                    type: LOADING_ADMIN_EDIT_POST_STOCK_DETAIL,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_ADMIN_EDIT_POST_STOCK_DETAIL,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const delete_coApplicant = (id) => {
    return dispatch => {
        dispatch({
            type: ADMIN_DELETE_COAPPLICANT_LOADING,
            status: true
        })

        const url = `/co_applicant/${id}/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: ADMIN_DELETE_COAPPLICANT_INFO,
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: ADMIN_DELETE_COAPPLICANT_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: ADMIN_DELETE_COAPPLICANT_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const get_jumio_response = (jumioRefernece) => {
    return dispatch => {
        dispatch({
            type: ADMIN_JUMIO_LOADING,
            status: true
        })
        const url = `https://netverify.com/api/netverify/v2/scans/${jumioRefernece}`
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=utf8", 'Authorization': `Basic ${window.btoa(process.env.REACT_APP_JUMIO_USER_NAME + ':' + process.env.REACT_APP_JUMIO_PASSWORD)}`
            },
            url
        }
        actualAxios(options)
            .then(response => {
                console.log(response, 'Jumio')
                if (response.data.success == true) {
                    dispatch({
                        type: ADMIN_JUMIO_INFO,
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: ADMIN_JUMIO_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: ADMIN_JUMIO_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const update_application_detail_status = (data) => {
    return dispatch => {
        const url = `/application/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

// Upload Un Request  Doc

export const upload_un_requested_doc = (data, docData) => {
    return dispatch => {
        dispatch({
            type: EDIT_POST_APP_LOADING_ADMIN,
            status: true,
        })
        const url = `/application/${data.id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: EDIT_POST_APP_UPDATE_ADMIN,
                        screenName: 'adminDocumentRequest',
                        response: response.data.data
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())
                    let fileId = response.data.data ? response.data.data.required_documents && response.data.data.required_documents.length > 0 ? response.data.data.required_documents.pop() : '' : ''
                    if (fileId) {
                        fileId = fileId.id
                    }
                    var formData = new FormData()
                    formData.append("len", docData.length);
                    docData.map((item, index) => {
                        formData.append(`file[${index}]`, item.file);
                        formData.append(`file_type[${index}]`, item.file_type);
                        formData.append(`doc_id[${index}]`, fileId);
                    })
                    dispatch(update_application_unrequest_upload_doc_file(formData))
                }
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false,
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false,
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

const update_application_unrequest_upload_doc_file = (data) => {
    return dispatch => {
        dispatch({
            type: EDIT_POST_APP_LOADING_ADMIN,
            status: true
        })
        const url = `/docs/`
        const options = {
            method: 'POST',
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: EDIT_ADMIN_POST_APP_UPDATE_UPLOAD_DOC,
                        response: response.data.data
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_pdf_data = (id) => {
    return dispatch => {
        dispatch({
            type: EDIT_POST_APP_LOADING_ADMIN,
            status: true
        })
        const url = `/generate-pdf/${id}/`
        const options = {
            method: 'GET',
            url
        }
        axios(options)
            .then(response => {
                console.log(response.data)
                if (response.data.success === true) {
                    dispatch({
                        type: GET_PDF_DATA,
                        response: response.data.data
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
// Upload Asset Detail Images and Files

export const upload_asset_detail_files = (data, id) => {
    return dispatch => {
        const url = `/vehicles/${id}/`
        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response, 'File Upload asset detail')
                if (response.data.success === true) {
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success( message.toString())

                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const get_assigned_dealer = () => {
    return dispatch => {
        const url = `/ap_getDealer/?application_view=all`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                console.log(response, 'Assigned Dealer')
                if (response.data.success === true) {
                    dispatch({ type: GET_ASSIGNED_DEALER, response: response.data.data })
                    // const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    // toastr.success('Success', message.toString())
                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const get_unit_from = () => {
    return dispatch => {
        const url = `/ap_unitfrom/?application_view=managed`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                console.log(response, 'Unit From')
                if (response.data.success === true) {
                    dispatch({ type: GET_UNIT_FROM, response: response.data.data })
                    // const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    // toastr.success('Success', message.toString())
                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const add_new_application_detail = (data, screenName) => {//change here for createxs
    return dispatch => {
        dispatch({
            type: EDIT_POST_APP_LOADING_ADMIN,
            status: true,
        })
        const url = `/application/`;
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success === true) {
                    dispatch({
                        type: EDIT_POST_APP_UPDATE_ADMIN,
                        screenName: screenName,
                        response: response.data.data
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Add Successfully'
                    toastr.success(message.toString())
                    history.push(`/admin/application/pending/${response?.data?.data?.id}`)
                }
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false,
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING_ADMIN,
                    status: false,
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}

export const request_identity_verification = (data) => {
    return dispatch => {
        const url = `/verification_code_application/`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: data,
            url
        }
        axios(options)
            .then(response => {
                console.log(response, 'request_identity_verification')
                if (response.data.success === true) {
                    console.log()
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Request Send Successfully'
                    toastr.success('', message.toString())

                }else if(response.data?.link){
                    toastr.success('', "Request for verification identity sent to applicant email!")
                }
            })
            .catch(err => {
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}