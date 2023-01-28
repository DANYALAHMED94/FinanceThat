import {
    GET_ADDTIONAL_TYPE, GET_VEHICLE_MAKES_EDIT_POST_APP,
    TOGGLE_VEHICLE_MAKE_EDIT_POST_APP,
    GET_VEHICLE_MODEL_EDIT_POST_APP,
    TOGGLE_VEHICLE_MODEL_EDIT_POST_APP,
    TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP,
    GET_VEHICLE_TRIMS_EDIT_POST_APP,
    GET_EDIT_APPLICAITION_DETAIL,
    EDIT_APPLICATION_NOT_FOUND,
    EDIT_POST_APP_LOADING,
    EDIT_POST_APP_UPDATE,
    DELETE_ADDTIONAL_INFO_LOADING,
    DELETE_ADDTIONAL_INFO,
    DELETE_VEHICLE_DETAIL,
    DELETE_VEHICLE_DETAIL_LOADING,
    DELETE_UPLOADED_DOC,
    DELETE_UPLOAD_DOC_LOADING,
    LOADING_FLINKS_REQUEST_ID,
    FLINKS_REQUEST_ID_RESPONSE,
    LOADING_FLINKS_LOGIN_ID,
    FLINKS_LOGIN_ID_RESPONSE,
    EDIT_POST_STOCK_DETAIL,
    LOADING_EDIT_POST_STOCK_DETAIL,
    DELETE_COAPPLICANT_LOADING,
    DELETE_COAPPLICANT_INFO,
    LOADING_EDIT_APPLICATION,
    EDIT_POST_APP_UPDATE_UPLOAD_DOC
} from '../_constants/constants';
import { actions, toastr } from 'react-redux-toastr'
import axios from '../_helpers/axiosInterceptors'
import simpleAxios from '../_helpers/axios'
import axios2 from 'axios'
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
                        type: GET_ADDTIONAL_TYPE,
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
        dispatch({
            type: LOADING_EDIT_APPLICATION,
            status: true
        })
        dispatch({
            type: EDIT_APPLICATION_NOT_FOUND,
            status:false
        })
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
                        type: GET_EDIT_APPLICAITION_DETAIL,
                        response: response.data.data
                    })
                } 
                dispatch({
                    type: LOADING_EDIT_APPLICATION,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_EDIT_APPLICATION,
                    status: false
                })
                if(err?.response?.data?.status == false && err?.response?.data?.message === "detail: not found.") {
                    dispatch({
                        type: EDIT_APPLICATION_NOT_FOUND,
                        status:true
                    })
                }
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_vehicle_make = (id, index, prevId) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_VEHICLE_MAKE_EDIT_POST_APP,
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
                    type: GET_VEHICLE_MAKES_EDIT_POST_APP,
                    // response: [{ [`vehicle${index}`]: response.data.data }],
                    response: response.data.data,
                    index: index,
                    id: id,
                    prevId: prevId
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_MAKES_EDIT_POST_APP,
                    response: [],
                    index: index
                })
            }
            dispatch({
                type: TOGGLE_VEHICLE_MAKE_EDIT_POST_APP,
                status: true
            })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MAKE_EDIT_POST_APP,
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
            type: TOGGLE_VEHICLE_MODEL_EDIT_POST_APP,
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
                    type: GET_VEHICLE_MODEL_EDIT_POST_APP,
                    response: response.data.data,
                    index: index,
                    prevId: prevId,
                    id: id
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_MODEL_EDIT_POST_APP,
                    response: [],
                    index: index
                })
            }
            dispatch({
                type: TOGGLE_VEHICLE_MODEL_EDIT_POST_APP,
                status: true
            })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_MODEL_EDIT_POST_APP,
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
            type: TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP,
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
                    type: GET_VEHICLE_TRIMS_EDIT_POST_APP,
                    response: response.data.data,
                    index: index,
                    prevId: prevId,
                    id: modelId
                })
            } else {
                dispatch({
                    type: GET_VEHICLE_TRIMS_EDIT_POST_APP,
                    response: [],
                    index: index
                })
            }
            dispatch({
                type: TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP,
                status: true
            })
        }).catch(err => {
            dispatch({
                type: TOGGLE_VEHICLE_TRIMS_EDIT_POST_APP,
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
            type: EDIT_POST_APP_LOADING,
            status: true
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
                if (response.data.success == true) {
                    dispatch({
                        type: EDIT_POST_APP_UPDATE,
                        screenName: screenName
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: EDIT_POST_APP_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const update_application_detail_file = (data, id, screenName) => {
    return dispatch => {
        dispatch({
            type: EDIT_POST_APP_LOADING,
            status: true
        })
        // const url = `/required_docs/${id}/`
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
                        type: EDIT_POST_APP_UPDATE_UPLOAD_DOC,
                        response: response.data.data
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Update Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: EDIT_POST_APP_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: EDIT_POST_APP_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const delete_addtional_info = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_ADDTIONAL_INFO_LOADING,
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
                        type: DELETE_ADDTIONAL_INFO,
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_ADDTIONAL_INFO_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_ADDTIONAL_INFO_LOADING,
                    status: false
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
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }

}
export const delete_vehicle_detail = (id) => {
    return dispatch => {
        dispatch({
            type: DELETE_VEHICLE_DETAIL_LOADING,
            status: true
        })

        // const url = `/app_vehicle/${id}/`
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
                        type: DELETE_VEHICLE_DETAIL,
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_VEHICLE_DETAIL_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_VEHICLE_DETAIL_LOADING,
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
            type: DELETE_UPLOAD_DOC_LOADING,
            status: true,
            id: id
        })

        // const url = `/required_docs/${id}/`
        const url = `/docs/${id}/`
        const options = {
            method: 'DELETE',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        axios(options)
            .then(response => {
                if (response.data.success == true) {
                    dispatch({
                        type: DELETE_UPLOADED_DOC,
                        id: id
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_UPLOAD_DOC_LOADING,
                    status: false,
                    id: id
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_UPLOAD_DOC_LOADING,
                    status: false,
                    id: id
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_login_id_flinks = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_FLINKS_REQUEST_ID,
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
                        type: FLINKS_REQUEST_ID_RESPONSE,
                        response: response
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: LOADING_FLINKS_REQUEST_ID,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_FLINKS_REQUEST_ID,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
// export const login_flinks = (data) => {
//     return dispatch => {
//         dispatch({
//             type: LOADING_FLINKS_LOGIN_ID,
//             status: true
//         })
//         const url = `https://financethat-api.private.fin.ag/v3/ea9dfd62-a012-4e73-bdb1-ee5c0f954b04/BankingServices/Authorize`
//         const options = {
//             method: 'POST',
//             headers: { "Content-Type": "application/json; charset=utf8" },
//             data: data,
//             url
//         }
//         simpleAxios(options)
//             .then(response => {
//                 console.log(response, 'login_flinks')
//                 if (response.data.success == true) {
//                     dispatch({
//                         type: FLINKS_LOGIN_ID_RESPONSE,
//                         response: response
//                     })
//                     const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
//                     toastr.success('Success', message.toString())

//                 }
//                 dispatch({
//                     type: LOADING_FLINKS_LOGIN_ID,
//                     status: false
//                 })
//             })
//             .catch(err => {
//                 dispatch({
//                     type: LOADING_FLINKS_LOGIN_ID,
//                     status: false
//                 })
//                 const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
//                 toastr.error('Error', message.toString())
//             })
//     }
// }
export const login_flinks = (data) => {
    return dispatch => {
        dispatch({
            type: LOADING_FLINKS_LOGIN_ID,
            status: true
        })
        // const url = `https://18.219.178.49:8000/generate-pdf/`
        const url = `/generate-pdf/`
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
                        type: FLINKS_LOGIN_ID_RESPONSE,
                        response: response
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: LOADING_FLINKS_LOGIN_ID,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_FLINKS_LOGIN_ID,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}
export const get_stock_id_detail = (id) => {
    return dispatch => {
        dispatch({
            type: LOADING_EDIT_POST_STOCK_DETAIL,
            status: true
        })
        dispatch({
            type: EDIT_POST_STOCK_DETAIL,
            response: [],
        })
        // const url = `/ads/${id}/`
        const url = `/listing/${id}/`
        const options = {
            method: 'GET',
            headers: { "Content-Type": "application/json; charset=utf8" },
            url
        }
        simpleAxios(options)
            .then(response => {
                console.log(response.data)
                if (response.data.success == true) {
                    dispatch({
                        type: EDIT_POST_STOCK_DETAIL,
                        response: [response.data.data],
                    })
                }
                dispatch({
                    type: LOADING_EDIT_POST_STOCK_DETAIL,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: LOADING_EDIT_POST_STOCK_DETAIL,
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
            type: DELETE_COAPPLICANT_LOADING,
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
                        type: DELETE_COAPPLICANT_INFO,
                    })
                    const message = response.data.message !== undefined && response.data.message !== null ? response.data.message : 'Deleted Successfully'
                    toastr.success(message.toString())

                }
                dispatch({
                    type: DELETE_COAPPLICANT_LOADING,
                    status: false
                })
            })
            .catch(err => {
                dispatch({
                    type: DELETE_COAPPLICANT_LOADING,
                    status: false
                })
                const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                toastr.error('Error', message.toString())
            })
    }
}