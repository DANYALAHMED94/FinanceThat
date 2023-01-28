import { USER_REGISTER } from '../_constants/constants';
import { toastr } from 'react-redux-toastr'
import simpleAxios from '../_helpers/axios'

export const register_user = (data) => {
    return dispatch => {
        const url = `/dealer_registration`
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=utf8" },
            data: JSON.stringify(data),
            url
        }
        simpleAxios(options)
            .then(response => {
                console.log(response)

            })
            .catch(err => {
                console.log(err.message)
                toastr.error('Error', err.message.toString())
            })
    }
}