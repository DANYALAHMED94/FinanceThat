
import {
    LOADING_DEALER_APIS
} from '../../_constants/dealerConstants'

const initialState = {
    loading_api: false,

}

const adminCommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DEALER_APIS: {
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