import {
    UPDATE_DEALERSHIP_LOADING, GET_DEALER_SHIP_PROFILE_DATA, REMOVE_ALL_DEALERSHIP_DETAIL, DELETE_DEALERSHIP_DOCUMENT_LOADING, UNSELECT_DEALERSHIP_VEHICLE_LOCATION, GET_DEALER_CREDIT_SCORE,
    NEW_DEALER_CREDIT_SCORE,
    DELETE_DEALER_CREDIT_SCORE
} from '../../_constants/dealerConstants'

const initialState = {
    get_user_profile: [],
    firstName: '',
    lastName: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    country: '',
    telephone: '',
    email: "",
    name: "",
    photo: null,
    base64_image: null,
    website: "",
    fax: "",
    owners: [],
    interior_business_path: null,
    license_path: null,
    logo_path: null,
    no_of_owner: 0,
    void_check_path: null,
    exterior_business_path: null,
    profile_update_loading: false,
    document_delete_loading: false,
    document_name: "",
    admin_fee: "",
    vehicle_preferences: null,
    locations: null,
    is_deleted: false,
    vehicle_location_status: false,
    dealer_credit_score:[],
    application_type:null,
    vehicle_subtype_preferences:null
}
const dealerShipReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEALER_SHIP_PROFILE_DATA: {
            return {
                ...state,
                get_user_profile: action.response,
                locations: action.response.locations !== undefined && action.response.locations !== null ? action.response.locations : '',
                vehicle_preferences: action.response.vehicle_preferences !== undefined && action.response.vehicle_preferences !== null ? action.response.vehicle_preferences : '',
                vehicle_subtype_preferences:action.response.vehicle_subtype_preferences !== undefined && action.response.vehicle_subtype_preferences !== null ? action.response.vehicle_subtype_preferences : '',
                dealer_id: action.response.user_id !== undefined && action.response.user_id !== null ? Object.keys(action.response.user_id).length > 0 ? action.response.user_id.id : action.response.user_id : '',
                firstName: action.response.business_name !== undefined && action.response.business_name !== null && action.response.business_name !== '' ? action.response.business_name.split(' ')[0] ? action.response.business_name.split(' ')[0] : '' : '',
                lastName: action.response.business_name !== undefined && action.response.business_name !== null && action.response.business_name !== '' ? action.response.business_name.split(' ')[1] ? action.response.business_name.split(' ')[1] : '' : '',
                website: action.response.website !== undefined && action.response.website !== null ? action.response.website : '',
                fax: action.response.fax !== undefined && action.response.fax !== null ? action.response.fax : '',
                streetAddress: action.response.street_address !== undefined && action.response.street_address !== null ? action.response.street_address : '',
                postalCode: action.response.postal_code !== undefined && action.response.postal_code !== null ? action.response.postal_code : '',
                city: action.response.city !== undefined && action.response.city !== null ? action.response.city : '',
                country: action.response.country !== undefined && action.response.country !== null ? action.response.country : '',
                telephone: action.response.phone !== undefined && action.response.phone !== null ? action.response.phone : '',
                email: action.response.email == undefined && action.response.email == null ? '' : action.response.email,
                name: action.response.operating_name == undefined && action.response.operating_name == null ? '' : action.response.operating_name,
                owners: action.response.dealerdetail_id == undefined && action.response.dealerdetail_id == null ? [] : action.response.dealerdetail_id,
                logo_path: action.response.logo_path == undefined && action.response.logo_path == null ? '' : action.response.logo_path,
                interior_business_path: action.response.interior_business_path == undefined && action.response.interior_business_path == null ? null : action.response.interior_business_path,
                license_path: action.response.license_path == undefined && action.response.license_path == null ? null : action.response.license_path,
                no_of_owner: action.response.no_of_owner !== undefined && action.response.no_of_owner !== null ? action.response.no_of_owner : '',
                void_check_path: action.response.void_check_path == undefined && action.response.void_check_path == null ? null : action.response.void_check_path,
                exterior_business_path: action.response.exterior_business_path == undefined && action.response.exterior_business_path == null ? null : action.response.exterior_business_path,
                admin_fee: action.response.admin_fee == undefined && action.response.admin_fee == null ? '' : action.response.admin_fee,
                photo: action.response.photo == undefined && action.response.photo == null ? '' : action.response.photo,
                base64_image: action.response.base64_image == undefined && action.response.base64_image == null ? '' : action.response.base64_image,
                application_type:action.response.application_type == undefined && action.response.application_type == null ? '' : action.response.application_type,
            }
        }

        case DELETE_DEALER_CREDIT_SCORE: {
            return {
                ...state,
                dealer_credit_score:state.dealer_credit_score.filter(item=> +item.id !== +action.id)
            }
        }

        case NEW_DEALER_CREDIT_SCORE: {
            return {
                ...state,
                dealer_credit_score:[...state.dealer_credit_score, action.response]
            }
        }

        case GET_DEALER_CREDIT_SCORE: {
            return {
                ...state,
                dealer_credit_score:action.response
            }
        }
        case UPDATE_DEALERSHIP_LOADING: {
            return {
                ...state,
                profile_update_loading: action.status

            }
        }
        case DELETE_DEALERSHIP_DOCUMENT_LOADING: {
            return {
                ...state,
                document_delete_loading: action.status,
                document_name: action.document_name,
                is_deleted: typeof action.is_deleted !== "undefined" ? !state.is_deleted : state.is_deleted
            }
        }
        case REMOVE_ALL_DEALERSHIP_DETAIL: {
            return {
                get_user_profile: [],
                firstName: '',
                lastName: '',
                streetAddress: '',
                postalCode: '',
                city: '',
                country: '',
                telephone: '',
                email: "",
                name: "",
                website: "",
                fax: "",
                photo: null,
                base64_image: null,
                profile_update_loading: false,
                owners: [],
                interior_business_path: null,
                license_path: null,
                logo_path: null,
                no_of_owner: 0,
                void_check_path: null,
                exterior_business_path: null,
                locations: null,
                vehicle_preferences: null,
                dealer_id: '',
                admin_fee: '',
                application_type:null,
                vehicle_subtype_preferences:null
            }
        }
        case UNSELECT_DEALERSHIP_VEHICLE_LOCATION: {
            return {
                ...state,
                vehicle_location_status: !state.vehicle_location_status
            }
        }
        default:
            return { ...state }
    }
}
export default dealerShipReducer