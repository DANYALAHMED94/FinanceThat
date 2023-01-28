/* eslint-disable array-callback-return */
import {
    LOADING_AGENTS,
    GET_AGENTS, GET_AGENT_DETAIL,
    GET_USER_ROLES,
    SINGLE_CHECK_AGENTS,
    TOGGLE_ALL_CHECK_AGENTS,
    REMOVE_ALL_STATE_AGENTS,
    LOADING_DELETEING_AGENTS,
    LOADING_UPDATE_AGENT_PERMISSION,
    DELETE_SINGLE_AGENT,
    DELETE_MULTIPLE_AGENT,
    LOADING_UPDATE_AGENT_DETAIL
} from '../../_constants/constants'

const initialState = {
    loading: false,
    agent_listing: [],
    user_roles: [],
    checkedAllAgent: false,
    agent_detail: [],
    loading_deleteing: false,
    loading_update_permissions: false,
    loading_update_detail: false,
    delete_agent_id: '',
    total_pages: [],
    total_count: 0
}

const agentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_UPDATE_AGENT_DETAIL: {
            return {
                ...state,
                loading_update_detail: action.status
            }
        }
        case LOADING_AGENTS: {
            return {
                ...state,
                loading: action.status,
                agent_listing: [],
                count: 0,
                pages: [],
            }
        }
        case GET_AGENTS: {
            return {
                ...state,
                agent_listing: action.response,
                loading: false,
                checkedAllAgent: false,
                total_count: action.count,
                total_pages: action.pages
            }
        }
        case GET_AGENT_DETAIL: {
            return {
                ...state,
                agent_detail: action.response,
                loading: false,
            }
        }
        case GET_USER_ROLES: {
            return {
                ...state,
                user_roles: action.response
            }
        }
        case SINGLE_CHECK_AGENTS: {
            let agent_listing = state.agent_listing.slice().map(item => {
                if (Number(item.id) === Number(action.id)) {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    }
                }
                return item
            })

            const checkLength = agent_listing.filter(item => item.isChecked === true)
            return {
                ...state,
                checkedAllAgent: (agent_listing || []).length === (checkLength || []).length,
                agent_listing: agent_listing
            }
        }

        case TOGGLE_ALL_CHECK_AGENTS: {
            return {
                ...state,
                checkedAllAgent: action.status,
                agent_listing: state.agent_listing.slice().map(item => {
                    return {
                        ...item,
                        isChecked: action.status
                    }
                }),

            }
        }
        case LOADING_DELETEING_AGENTS: {
            return {
                ...state,
                loading_deleteing: action.status,
                delete_agent_id: action.id
            }
        }
        case DELETE_SINGLE_AGENT: {
            return {
                ...state,
                agent_listing: state.agent_listing.filter(item => Number(item.id) !== Number(action.id))
            }
        }
        case DELETE_MULTIPLE_AGENT: {
            let agent_listing = state.agent_listing
            action.ids.map(item => {
                agent_listing = agent_listing.filter(ag => Number(ag.id) !== Number(item))
            })
            return {
                ...state,
                agent_listing
            }
        }
        case LOADING_UPDATE_AGENT_PERMISSION: {
            return {
                ...state,
                loading_update_permissions: action.status
            }
        }

        case REMOVE_ALL_STATE_AGENTS: {
            return {
                loading: false,
                agent_listing: [],
                user_roles: [],
                checkedAllAgent: false,
                agent_detail: [],
                loading_deleteing: false,
                loading_update_permissions: false,
                delete_agent_id: ''
            }
        }
        default:
            return state
    }
}
export default agentReducer