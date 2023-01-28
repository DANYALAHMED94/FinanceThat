import {
    LOADING_DEALER_ADMIN_UPDATE_PASSWORD,
    UPDATE_DEALER_ADMIN_PASSWORD
} from '../../_constants/dealerConstants'

const initialState = {
    loading: false,
    update_passowrd: false,
}

const dealerSettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_DEALER_ADMIN_UPDATE_PASSWORD: {
            return {
                ...state,
                loading: action.status,
            }
        }
        case UPDATE_DEALER_ADMIN_PASSWORD: {
            return {
                ...state,
                update_passowrd: !state.update_passowrd,
                loading: false,
            }
        }
        default:
            return state
    }
}
export default dealerSettingReducer