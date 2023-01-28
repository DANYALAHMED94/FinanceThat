import {
    LOADING_LISTING,
    GET_LISTING,
    SINGLE_CHECK_LISTING,
    TOGGLE_ALL_CHECK_LISTING,
    REMOVE_ALL_STATE_LISTING,
    GET_LISTING_DETAIL,
    LOADING_LISTING_DETAIL,
    REMOVE_DETAIL_EDIT,
    LOADING_LISTING_VEHICLE_UPDATE,
    LOADING_LISTING_VEHICLE_UPDATE_OVERVIEW,
    LOADING_LISTING_VEHICLE_UPDATE_LOCATION,
    LOADING_LISTING_VEHICLE_UPDATE_FEATURES,
    LOADING_LISTING_VEHICLE_UPDATE_DESCRIPTION,
    LOADING_LISTING_VEHICLE_APPROVED,
    LOADING_LISTING_VEHICLE_DECLINE,
    LOADING_LISTING_DELETE_IMAGES,
    LOADING_LISTING_UPDATE_IMAGES,
    LOADING_LISTING_DELETE_LISTING, LISTING_DELETE_LISTING_SUCCESS,
    LOADING_LISTING_VEHICLE_UPDATE_MAKE_MODEL,
    UPDATE_VEHICLE_MAKE_MODEL_SUCCESS,
    LISTING_ARCHIVE_SUCCESS,
    LOADING_LISTING_DELETE_LISTING_SINGLE,
    LISTING_DELETE_LISTING_SUCCESS_SINGLE,
    REACTIVE_EXPIRE_LISTING,
    LOADING_EXPIRE_UPDATE_LISTING
} from '../../_constants/constants'

const initialState = {
    loading: false,
    listing_detail: [],
    checkedAllDealerListing: false,
    checkedAllPendingListing: false,
    single_listing_detail: [],
    loading_listing_detail: false,
    loading_update_listing_detail: false,
    loading_update_listing_vehicle_overview: false,
    loading_update_listing_vehicle_location: false,
    loading_update_listing_vehicle_features: false,
    loading_update_listing_vehicle_description: false,
    loading_listing_approved: false,
    loading_listing_decline: false,
    update_listing_images: false,
    loading_listing_delete: false,
    loading_listing_make_model: false,
    success_listing_make_model: false,
    loading_listing_delete_single: false,
    delete_listing_id: '',
    expire_listing_update: false,
    loading_expir_listing_update: false,
    total_count: 0,
    total_pages: []
}

const listingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_LISTING: {
            return {
                ...state,
                loading: action.status,
                listing_detail: [],
                total_count: 0,
                total_pages: []
            }
        }
        case GET_LISTING: {
            return {
                ...state,
                listing_detail: action.response,
                loading: false,
                checkedAllDealerListing: false,
                checkedAllPendingListing: false,
                total_count: action.count,
                total_pages: action.pages
            }
        }
        case SINGLE_CHECK_LISTING: {
            let listing_detail = state.listing_detail.slice().map(item => {
                if (Number(item.id) === Number(action.id)) {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                return item
            })

            const checkLength = listing_detail.filter(item => item.isChecked === true)
            return {
                ...state,
                checkedAllDealerListing: action.filterName === 'dealer' ? (listing_detail || []).length === (checkLength || []).length : state.checkedAllDealerListing,
                checkedAllPendingListing: action.filterName === 'private' ? (listing_detail || []).length === (checkLength || []).length : state.checkedAllPendingListing,
                listing_detail: listing_detail
            }
        }
        case TOGGLE_ALL_CHECK_LISTING: {
            return {
                ...state,
                checkedAllDealerListing: action.filterName === 'dealer' ? action.status : state.checkedAllDealerListing,
                checkedAllPendingListing: action.filterName === 'private' ? action.status : state.checkedAllPendingListing,
                listing_detail: state.listing_detail.slice().map(item => {
                    return {
                        ...item,
                        isChecked: action.status
                    }
                }),

            }
        }
        case GET_LISTING_DETAIL: {
            return {
                ...state,
                single_listing_detail: action.response,
                loading_listing_detail: false,
                success_listing_make_model: false
            }
        }
        case LOADING_LISTING_DETAIL: {
            return {
                ...state,
                loading_listing_detail: action.status
            }
        }
        case REMOVE_DETAIL_EDIT: {
            return {
                ...state,
                single_listing_detail: []
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE: {
            return {
                ...state,
                loading_update_listing_detail: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_OVERVIEW: {
            return {
                ...state,
                loading_update_listing_vehicle_overview: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_LOCATION: {
            return {
                ...state,
                loading_update_listing_vehicle_location: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_FEATURES: {
            return {
                ...state,
                loading_update_listing_vehicle_features: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_DESCRIPTION: {
            return {
                ...state,
                loading_update_listing_vehicle_description: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_APPROVED: {
            return {
                ...state,
                loading_listing_approved: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_DECLINE: {
            return {
                ...state,
                loading_listing_decline: action.status
            }
        }
        case LOADING_LISTING_UPDATE_IMAGES: {
            return {
                ...state,
                update_listing_images: action.status
            }
        }

        case LOADING_LISTING_DELETE_LISTING_SINGLE: {
            return {
                ...state,
                loading_listing_delete_single: action.status,
                delete_listing_id: action.id
            }
        }
        case LISTING_DELETE_LISTING_SUCCESS_SINGLE: {
            return {
                ...state,
                listing_detail: state.listing_detail.filter(list => Number(list.id) !== Number(action.id))
                // 
            }
        }
        case REACTIVE_EXPIRE_LISTING: {
            return {
                ...state,
                expire_listing_update: !state.expire_listing_update
            }
        }
        case LOADING_EXPIRE_UPDATE_LISTING: {
            return {
                ...state,
                loading_expir_listing_update: action.status
            }
        }
        case LOADING_LISTING_DELETE_LISTING: {
            return {
                ...state,
                loading_listing_delete: action.status
            }
        }

        case LISTING_DELETE_LISTING_SUCCESS: {
            let listingDetail = state.listing_detail
            action.ids.map(item => {
                listingDetail = listingDetail.filter(list => Number(list.id) !== Number(item))
            })
            return {
                ...state,
                listing_detail: listingDetail,
                loading_listing_delete: false
            }
        }
        case LISTING_ARCHIVE_SUCCESS: {
            let listingDetail = state.listing_detail
            action.ids.map(item => {
                listingDetail = listingDetail.filter(list => Number(list.id) !== Number(item))
            })
            return {
                ...state,
                listing_detail: listingDetail,
                loading_listing_delete: false
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_MAKE_MODEL: {
            return {
                ...state,
                loading_listing_make_model: action.status
            }
        }
        case UPDATE_VEHICLE_MAKE_MODEL_SUCCESS: {
            return {
                ...state,
                success_listing_make_model: true
            }
        }
        case REMOVE_ALL_STATE_LISTING: {
            return {
                loading: false,
                listing_detail: [],
                checkedAllDealerListing: false,
                checkedAllPendingListing: false,
                single_listing_detail: [],
                loading_listing_detail: false,
                loading_update_listing_detail: false,
                loading_update_listing_vehicle_overview: false,
                loading_update_listing_vehicle_location: false,
                loading_update_listing_vehicle_features: false,
                loading_update_listing_vehicle_description: false,
                loading_listing_approved: false,
                loading_listing_decline: false,
                update_listing_images: false,
                loading_listing_delete: false,
                loading_listing_make_model: false,
                success_listing_make_model: false,
                expire_listing_update: false,
                loading_expir_listing_update: false
            }
        }
        default:
            return state
    }
}
export default listingReducer