
import {
    LOADING_ADMIN_APIS
} from '../../_constants/constants'

const initialState = {
    loading_api: false,

}

const adminCommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_ADMIN_APIS: {
            return {
                ...state,
                loading_api: action.status,
            }
        }
        default:
            return state
    }
}
export default adminCommonReducer