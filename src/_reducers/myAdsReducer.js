import {
    GET_USER_MY_ADS,
    DELETE_USER_ADD,
    DELETE_POST_ADD,
    LOADING_USER_ADD
} from '../_constants/constants'

const initialState = {
    my_ads_list: [],
    deleteLoading: false,
    deletedId: '',
    loading_ads: false
}

const myAdsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_MY_ADS: {
            return {
                ...state,
                my_ads_list: action.response,
            };
        }
        case LOADING_USER_ADD: {
            return {
                ...state,
                loading_ads: action.status
            }
        }
        case DELETE_USER_ADD: {
            const my_ads_list = state.my_ads_list.filter(item => Number(item.id) !== Number(action.id))
            return {
                ...state,
                my_ads_list
            }
        }
        case DELETE_POST_ADD: {
            return {
                ...state,
                deleteLoading: action.deleteLoading,
                deletedId: action.deletedId
            }
        }
        default:
            return { ...state }
    }
}
export default myAdsReducer