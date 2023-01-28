import { BUYER_BANNER_TOGGLE_FILTER, TOGGLE_THEME_NAVBAR, BUYER_BANNER_TOGGLE_FILTER_MOBILE } from '../_constants/constants';

export const buyer_banner_toggle = () => {
    return dispatch => {
        dispatch({
            type: BUYER_BANNER_TOGGLE_FILTER
        })
    }
}
export const buyer_banner_toggle_mobile = () => {
    return dispatch => {
        dispatch({
            type: BUYER_BANNER_TOGGLE_FILTER_MOBILE
        })
    }
}
export const toggle_theme_navBar = (status) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_THEME_NAVBAR,
            response: status
        })
    }
}