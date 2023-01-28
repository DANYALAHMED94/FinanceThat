import {
    GET_AD_POST_DETAIL,
    CHANGE_DOWN_PAYMENT,
    CHANGE_CREDIT_SCORE,
    CHANGE_IN_TAX,
    REMOVE_ALL_RECORD_POST_DETAIL,
    SAVED_AD_POST_DETAIL,
    LOADING_SAVED_AD_DETAIL
} from '../_constants/constants'

const initialState = {
    add_post_detail: [],
    totalAmount: 0,
    tax: 13,
    // tax: 1,
    taxAmount: 0,
    downPayment: 0,
    estimatedAPR: { highAmount: 21.9, creditId: '3' },
    estimatedAPRValues: [{ highAmount: 4.99, creditId: "0" },
    { highAmount: 6.5, creditId: "1" },
    { highAmount: 9.99, creditId: "2" },
    { highAmount: 21.9, creditId: "3" },
    { highAmount: 29.9, creditId: "4" }, { highAmount: 34.9, creditId: "5" }],
    // estimatedAPR: { lowAmount: 8, highAmount: 15, creditId: '3' },
    // estimatedAPRValues: [{ lowAmount: 2.95, highAmount: 4.5, creditId: "0" },
    // { lowAmount: 3.2, highAmount: 6.5, creditId: "1" },
    // { lowAmount: 5, highAmount: 8.5, creditId: "2" },
    // { lowAmount: 8, highAmount: 15, creditId: "3" },
    // { lowAmount: 15, highAmount: 25, creditId: "4" }],
    loading_saved_ad_detail: false

}

const postDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AD_POST_DETAIL: {
            return {
                ...state,
                add_post_detail: action.response.map(item => {
                    return {
                        ...item,
                        totalAmount: (Number(item.price) + (+item.price * 13) / 100).toFixed(2),
                        totalPrice: (Number(item.price)).toFixed(2),
                        tax: 13,
                        taxAmount: (+item.price * 13) / 100,
                        downPayment: 0,
                    }
                })
            }
        }
        case CHANGE_DOWN_PAYMENT: {
            const add_post_detail = state.add_post_detail.map(item => {
                if (Number(action.response) >= Number(item.price)) {
                    return {
                        ...item,
                        totalPrice: (0).toFixed(2),
                        downPayment: +action.response,
                    }
                } else {
                    return {
                        ...item,
                        totalAmount: ((Number(item.price) + (+item.price * 13) / 100) - +action.response).toFixed(2),
                        downPayment: +action.response,
                        totalPrice: (Number(item.price)).toFixed(2),
                    }
                }

            })
            return {
                ...state,
                add_post_detail
            }
        }
        case CHANGE_CREDIT_SCORE: {
            const creditScore = state.estimatedAPRValues.filter(item => item.creditId == action.response)[0]

            return {
                ...state,
                estimatedAPR: creditScore
            }

        }
        case CHANGE_IN_TAX: {
            const add_post_detail = state.add_post_detail.map(item => {
                return {
                    ...item,
                    tax: +action.response,
                    totalAmount: (+item.price + (+item.price * +action.response) / 100).toFixed(2),
                }
            })
            return {
                ...state,
                add_post_detail
            }
        }
        case REMOVE_ALL_RECORD_POST_DETAIL: {
            return {
                add_post_detail: [],
                estimatedAPR: { highAmount: 21.9, creditId: '3' },
                estimatedAPRValues: [{ highAmount: 4.99, creditId: "0" },
                { highAmount: 6.5, creditId: "1" },
                { highAmount: 9.99, creditId: "2" },
                { highAmount: 21.9, creditId: "3" },
                { highAmount: 29.9, creditId: "4" }, { highAmount: 34.9, creditId: "5" }],
                // estimatedAPR: { lowAmount: 8, highAmount: 15, creditId: '3' },
                // estimatedAPRValues: [{ lowAmount: 2.95, highAmount: 4.5, creditId: "0" },
                // { lowAmount: 3.2, highAmount: 6.5, creditId: "1" },
                // { lowAmount: 5, highAmount: 8.5, creditId: "2" },
                // { lowAmount: 8, highAmount: 15, creditId: "3" },
                // { lowAmount: 15, highAmount: 25, creditId: "4" }],

            }
        }
        case SAVED_AD_POST_DETAIL: {
            const add_post_detail = state.add_post_detail.slice().map((item, index) => {
                if (item.id === action.response.ad_id) {
                    return {
                        ...item,
                        saved_ad: !item.saved_ad
                    }
                }
                return item
            })

            return {
                ...state,
                add_post_detail,
            }
        }
        case LOADING_SAVED_AD_DETAIL: {
            return {
                ...state,
                loading_saved_ad_detail: action.status
            }
        }
        default:
            return { ...state }
    }
}
export default postDetailReducer