import {
    LOADING_ADMIN_UPDATE_PASSWORD,
    UPDATE_ADMIN_PASSWORD
} from '../../_constants/constants'

const initialState = {
    loading: false,
    update_passowrd: false,
}

const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_ADMIN_UPDATE_PASSWORD: {
            return {
                ...state,
                loading: action.status,
            }
        }
        case UPDATE_ADMIN_PASSWORD: {
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
export default settingReducer