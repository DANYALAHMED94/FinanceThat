/* eslint-disable array-callback-return */
import {
    LOADING_CONTACT_US
} from '../_constants/constants'

const initialState = {
    loading: false,
    submit: false
}

const contactUsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CONTACT_US: {
            return {
                ...state,
                loading: action.status,
                submit: action.submit
            }
        }

        default:
            return state
    }
}
export default contactUsReducer