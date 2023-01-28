import {
    CHANGE_PROFILE_INPUT,
    GET_USER_PROFILE_DATA,
    GET_DEALER_PROFILE_DATA,
    UPDATE_USER_PROFILE,
    UPDATE_PROFILE_LOADING,
    PASSWORD_PROFILE_UPDATE_LOADING,
    REMOVE_ALL_PROFILE_DETAIL
} from '../_constants/constants';

const initialState = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    postalCode: '',
    city: '',
    country: '',
    email: '',
    telephone: '',
    name: '',
    photo: '',
    base64_image: '',
    preview: null,
    get_user_profile: [],
    update_profile: false,
    profile_update_loading: false,
    profile_password_update_loading: false
}

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_PROFILE: {
            return {
                ...state,
                update_profile: !state.update_profile
            }
        }
        case CHANGE_PROFILE_INPUT: {
            return {
                ...state,
                [action.name]: action.value,
            };
        }
        case GET_USER_PROFILE_DATA: {
            return {
                ...state,
                get_user_profile: action.response,
                firstName: action.response.first_name !== undefined && action.response.first_name !== null ? action.response.first_name : '',
                lastName: action.response.last_name !== undefined && action.response.last_name !== null ? action.response.last_name : '',
                streetAddress: action.response.street !== undefined && action.response.street !== null ? action.response.street : '',
                postalCode: action.response.postal_code !== undefined && action.response.postal_code !== null ? action.response.postal_code : '',
                city: action.response.city !== undefined && action.response.city !== null ? action.response.city : '',
                country: action.response.country !== undefined && action.response.country !== null ? action.response.country : '',
                telephone: action.response.telephone !== undefined && action.response.telephone !== null ? action.response.telephone : '',
                // email: action.response.email == undefined && action.response.email !== null ? '' : action.response.email,
                email: action.response.user_id == undefined && action.response.user_id !== null ? action.response.user_id.email !== undefined && action.response.user_id.email !== null ? action.response.user_id.email : '' : '',
                name: action.response.name == undefined && action.response.name !== null ? '' : action.response.name,
                photo: action.response.photo == undefined && action.response.photo !== null ? '' : action.response.photo,
                base64_image: action.response.base64_image == undefined && action.response.base64_image == null ? '' : action.response.base64_image,

                // firstName: action.response[0].first_name !== undefined && action.response[0].first_name !== null ? action.response[0].first_name : '',
                // lastName: action.response[0].last_name !== undefined && action.response[0].last_name !== null ? action.response[0].last_name : '',
                // streetAddress: action.response[0].street !== undefined && action.response[0].street !== null ? action.response[0].street : '',
                // postalCode: action.response[0].postal_code !== undefined && action.response[0].postal_code !== null ? action.response[0].postal_code : '',
                // city: action.response[0].city !== undefined && action.response[0].city !== null ? action.response[0].city : '',
                // country: action.response[0].country !== undefined && action.response[0].country !== null ? action.response[0].country : '',
                // telephone: action.response[0].telephone !== undefined && action.response[0].telephone !== null ? action.response[0].telephone : '',
                // email: action.response[0].email == undefined && action.response[0].email !== null ? '' : action.response[0].email,
                // name: action.response[0].name == undefined && action.response[0].name !== null ? '' : action.response[0].name,
                // photo: action.response[0].photo == undefined && action.response[0].photo !== null ? '' : action.response[0].photo,
            }
        }
        case GET_DEALER_PROFILE_DATA: {
            return {
                ...state,
                get_user_profile: action.response,
                firstName: action.response.business_name !== undefined && action.response.business_name !== null && action.response.business_name !== '' ? action.response.business_name.split(' ')[0] ? action.response.business_name.split(' ')[0] : '' : '',
                lastName: action.response.business_name !== undefined && action.response.business_name !== null && action.response.business_name !== '' ? action.response.business_name.split(' ')[1] ? action.response.business_name.split(' ')[1] : '' : '',
                // lastName: action.response.operating_name !== undefined && action.response.operating_name !== null ? action.response.operating_name : '',
                streetAddress: action.response.street_address !== undefined && action.response.street_address !== null ? action.response.street_address : '',
                postalCode: action.response.postal_code !== undefined && action.response.postal_code !== null ? action.response.postal_code : '',
                city: action.response.city !== undefined && action.response.city !== null ? action.response.city : '',
                country: action.response.country !== undefined && action.response.country !== null ? action.response.country : '',
                telephone: action.response.phone !== undefined && action.response.business_name !== null ? action.response.phone : '',
                email: action.response.email == undefined && action.response.email == null ? '' : action.response.email,
                // name: action.response.name == undefined && action.response.name == null ? '' : action.response.name,
                name: action.response.business_name == undefined && action.response.business_name == null ? '' : action.response.business_name,
                photo: action.response.photo == undefined && action.response.photo == null ? '' : action.response.photo,
                base64_image: action.response.base64_image == undefined && action.response.base64_image == null ? '' : action.response.base64_image,

                // firstName: action.response[0].business_name !== undefined && action.response[0].business_name !== null ? action.response[0].business_name : '',
                // lastName: action.response[0].operating_name !== undefined && action.response[0].operating_name !== null ? action.response[0].operating_name : '',
                // streetAddress: action.response[0].street_address !== undefined && action.response[0].street_address !== null ? action.response[0].street_address : '',
                // postalCode: action.response[0].postal_code !== undefined && action.response[0].postal_code !== null ? action.response[0].postal_code : '',
                // city: action.response[0].city !== undefined && action.response[0].city !== null ? action.response[0].city : '',
                // country: action.response[0].country !== undefined && action.response[0].country !== null ? action.response[0].country : '',
                // telephone: action.response[0].phone !== undefined && action.response[0].business_name !== null ? action.response[0].phone : '',
                // email: action.response[0].email == undefined && action.response[0].email == null ? '' : action.response[0].email,
                // name: action.response[0].name == undefined && action.response[0].name == null ? '' : action.response[0].name,
                // photo: action.response[0].photo == undefined && action.response[0].photo == null ? '' : action.response[0].photo,
            }
        }
        case UPDATE_PROFILE_LOADING: {
            return {
                ...state,
                profile_update_loading: action.status

            }
        }
        case PASSWORD_PROFILE_UPDATE_LOADING: {
            return {
                ...state,
                profile_password_update_loading: action.status
            }
        }
        case REMOVE_ALL_PROFILE_DETAIL: {
            return {
                firstName: '',
                lastName: '',
                streetAddress: '',
                postalCode: '',
                city: '',
                country: '',
                email: '',
                telephone: '',
                name: '',
                photo: '',
                base64_image: '',
                preview: null,
                get_user_profile: [],
                update_profile: false,
                profile_update_loading: false,
                profile_password_update_loading: false
            }
        }
        default:
            return { ...state }
    }
}
export default userProfileReducer