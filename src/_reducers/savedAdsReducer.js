import {
    GET_USER_SAVED_ADS,
    DELETE_SAVED_ADD,
    LOADING_SAVED_ADD
} from '../_constants/constants'

const initialState = {
    user_saved_ads: [],
    loading_saved_ad: false
}

const savedAdsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_SAVED_ADD: {
            return {
                ...state,
                loading_saved_ad: action.status
            }
        }
        case GET_USER_SAVED_ADS: {
            return {
                ...state,
                user_saved_ads: action.response,
            };
        }
        case DELETE_SAVED_ADD: {
            const user_saved_ads = state.user_saved_ads.filter(item => { return Number(item.id) !== Number(action.id) })
            return {
                ...state,
                user_saved_ads
            }
        }
        default:
            return { ...state }
    }
}
export default savedAdsReducer