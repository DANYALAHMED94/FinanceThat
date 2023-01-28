import {
    LOADING_LISTING_DMS,
    GET_LISTING_DMS,
    SINGLE_CHECK_LISTING_DMS,
    TOGGLE_ALL_CHECK_LISTING_DMS,
    REMOVE_ALL_STATE_LISTING_DMS,
    GET_LISTING_DETAIL_DMS,
    LOADING_LISTING_DETAIL_DMS,
    REMOVE_DETAIL_EDIT_DMS,
    LOADING_LISTING_VEHICLE_UPDATE_DMS,
    LOADING_LISTING_VEHICLE_UPDATE_OVERVIEW_DMS,
    LOADING_LISTING_VEHICLE_UPDATE_LOCATION_DMS,
    LOADING_LISTING_VEHICLE_UPDATE_FEATURES_DMS,
    LOADING_LISTING_VEHICLE_UPDATE_DESCRIPTION_DMS,
    LOADING_LISTING_VEHICLE_APPROVED_DMS,
    LOADING_LISTING_VEHICLE_DECLINE_DMS,
    LOADING_LISTING_DELETE_IMAGES,
    LOADING_LISTING_UPDATE_IMAGES_DMS,
    LOADING_LISTING_DELETE_LISTING_DMS, LISTING_DELETE_LISTING_SUCCESS_DMS,
    LOADING_LISTING_VEHICLE_UPDATE_MAKE_MODEL_DMS,
    UPDATE_VEHICLE_MAKE_MODEL_SUCCESS_DMS,
    LISTING_ARCHIVE_SUCCESS_DMS,
    LOADING_LISTING_DELETE_LISTING_SINGLE_DMS,
    LISTING_DELETE_LISTING_SUCCESS_SINGLE_DMS,
    REACTIVE_EXPIRE_LISTING_DMS,
    LOADING_EXPIRE_UPDATE_LISTING_DMS
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

const dmsListingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_LISTING_DMS: {
            return {
                ...state,
                loading: action.status,
                listing_detail: [],
                total_count: 0,
                total_pages: []
            }
        }
        case GET_LISTING_DMS: {
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
        case SINGLE_CHECK_LISTING_DMS: {
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
        case TOGGLE_ALL_CHECK_LISTING_DMS: {
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
        case GET_LISTING_DETAIL_DMS: {
            return {
                ...state,
                single_listing_detail: action.response,
                loading_listing_detail: false,
                success_listing_make_model: false
            }
        }
        case LOADING_LISTING_DETAIL_DMS: {
            return {
                ...state,
                loading_listing_detail: action.status
            }
        }
        case REMOVE_DETAIL_EDIT_DMS: {
            return {
                ...state,
                single_listing_detail: []
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_DMS: {
            return {
                ...state,
                loading_update_listing_detail: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_OVERVIEW_DMS: {
            return {
                ...state,
                loading_update_listing_vehicle_overview: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_LOCATION_DMS: {
            return {
                ...state,
                loading_update_listing_vehicle_location: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_FEATURES_DMS: {
            return {
                ...state,
                loading_update_listing_vehicle_features: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_UPDATE_DESCRIPTION_DMS: {
            return {
                ...state,
                loading_update_listing_vehicle_description: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_APPROVED_DMS: {
            return {
                ...state,
                loading_listing_approved: action.status
            }
        }
        case LOADING_LISTING_VEHICLE_DECLINE_DMS: {
            return {
                ...state,
                loading_listing_decline: action.status
            }
        }
        case LOADING_LISTING_UPDATE_IMAGES_DMS: {
            return {
                ...state,
                update_listing_images: action.status
            }
        }

        case LOADING_LISTING_DELETE_LISTING_SINGLE_DMS: {
            return {
                ...state,
                loading_listing_delete_single: action.status,
                delete_listing_id: action.id
            }
        }
        case LISTING_DELETE_LISTING_SUCCESS_SINGLE_DMS: {
            return {
                ...state,
                listing_detail: state.listing_detail.filter(list => Number(list.id) !== Number(action.id))
                // 
            }
        }
        case REACTIVE_EXPIRE_LISTING_DMS: {
            return {
                ...state,
                expire_listing_update: !state.expire_listing_update
            }
        }
        case LOADING_EXPIRE_UPDATE_LISTING_DMS: {
            return {
                ...state,
                loading_expir_listing_update: action.status
            }
        }
        case LOADING_LISTING_DELETE_LISTING_DMS: {
            return {
                ...state,
                loading_listing_delete: action.status
            }
        }

        case LISTING_DELETE_LISTING_SUCCESS_DMS: {
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
        case LISTING_ARCHIVE_SUCCESS_DMS: {
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
        case LOADING_LISTING_VEHICLE_UPDATE_MAKE_MODEL_DMS: {
            return {
                ...state,
                loading_listing_make_model: action.status
            }
        }
        case UPDATE_VEHICLE_MAKE_MODEL_SUCCESS_DMS: {
            return {
                ...state,
                success_listing_make_model: true
            }
        }
        case REMOVE_ALL_STATE_LISTING_DMS: {
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
export default dmsListingReducer