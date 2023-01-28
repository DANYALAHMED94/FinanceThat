import {
    BILLING_LOADING,
    ADD_CARD_BILLING,
    BILLING_INVOICES
} from '../../_constants/constants'

const initialState = {
    biling: {},
    loading: false,
    invoices: [],
    pages: [],
    total_count: 0
}

const billingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD_BILLING: {
            return {
                ...state,
                biling: action.data
            }
        }
        case BILLING_LOADING: {
            return {
                ...state,
                loading: action.loading
            }
        }
        case BILLING_INVOICES: {
            return {
                ...state,
                invoices: action.data,
                pages: action.pages,
                total_count: action.count,
            }
        }
        default:
            return state
    }
}
export default billingReducer