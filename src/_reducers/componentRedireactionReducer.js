import { BUYER_BANNER_TOGGLE_FILTER, TOGGLE_THEME_NAVBAR, BUYER_BANNER_TOGGLE_FILTER_MOBILE } from '../_constants/constants';

const INTIAL_STATE = {
    show_more_filter: false,
    toggle_theme_bar: true,
    show_more_mobile: false
}
const componentFilterReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case BUYER_BANNER_TOGGLE_FILTER: {
            return {
                ...state,
                show_more_filter: !state.show_more_filter,
                show_more_mobile: false
            }
        }
        case TOGGLE_THEME_NAVBAR: {
            return {
                ...state,
                toggle_theme_bar: action.response,
            }
        }
        case BUYER_BANNER_TOGGLE_FILTER_MOBILE: {
            return {
                ...state,
                show_more_mobile: !state.show_more_mobile
            }
        }
        default:
            return state
    }
}
export default componentFilterReducer