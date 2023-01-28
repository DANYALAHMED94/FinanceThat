import {
    CHAT_LIST,
    CHAT,
    ADD_CHAT_MESSAGE,
    RESET_CHAT,
    MESSAGE_SEND,
    BLOCK_TOGGLE,
    BLOCK_LOADING,
    CHAT_UNREAD_UPDATE,
    TOGGLE_CHAT_MODULE,
    CHAT_IMAGE_UPLOADING,
    DELETE_CHAT_LOADING,
    DELETE_CHAT,
    SEARCH_CHAT_FRIENDS
} from '../_constants/constants';

const initialState = {
    chat_list: [],
    all_chat: [],
    chat: [],
    total_unRead: 0,
    sendMessage: false,
    isBlock: false,
    blocked: false,
    message_send: false,
    disableMessage: false,
    isDeleted: false,
    blockLoading: false,
    deleteLoading: false,
    filterName: 'all'
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAT_LIST: {
            const chat_list = sessionStorage.getItem('chatFilter') !== undefined && sessionStorage.getItem('chatFilter') !== null && sessionStorage.getItem('chatFilter') !== '' ? sessionStorage.getItem('chatFilter') === 'all' ? action.response : action.response.filter(item => item.un_read !== undefined && item.un_read !== null && (Number(item.un_read) > 0 || Number(item.id) === Number(sessionStorage.getItem('chatId')))) : action.response
            let total_unRead = 0;
            chat_list.map(item => {
                total_unRead = Number(total_unRead) + Number(item.un_read)
            })
            return {
                ...state,
                chat_list: sessionStorage.getItem('chatId') !== undefined && sessionStorage.getItem('chatId') !== null && sessionStorage.getItem('chatId') !== '' ?
                    chat_list.map(item => {
                        if (Number(item.id) === Number(sessionStorage.getItem('chatId'))) {
                            return {
                                ...item, isSelected: true
                            }
                        }
                        return item
                    }) : action.response,
                all_chat: action.response,
                total_unRead: total_unRead
            };
        }

        case MESSAGE_SEND: {
            return {
                ...state,
                disableMessage: action.loading,
                chat: state.chat.map(item => {
                    if (action.time === item.Time) {
                        return {
                            ...item,
                            isSend: true
                        }
                    }
                    return item
                }),
                // message_send: !state.message_send
            }
        }

        case CHAT_UNREAD_UPDATE: {
            return {
                ...state,
                chat_list: state.chat_list.slice().map(item => {
                    if (Number(item.id) === Number(action.response.id)) {
                        return {
                            ...item,
                            un_read: action.response.un_read
                        }
                    }
                    return item
                }),
                all_chat: state.all_chat.slice().map(item => {
                    if (Number(item.id) === Number(action.response.id)) {
                        return {
                            ...item,
                            un_read: action.response.un_read
                        }
                    }
                    return item
                }),

            }
        }

        case CHAT: {
            return {
                ...state,
                chat: action.response.map(item => {
                    return {
                        ...item,
                        isSend: true
                    }
                }),
                chat_list: state.chat_list.slice().map(item => {
                    if (Number(item.id) === Number(action.id)) {
                        return {
                            ...item,
                            isSelected: true
                        }
                    }
                    return {
                        ...item, isSelected: false
                    }
                }),
                // all_chat: state.all_chat.slice().map(item => {
                //     if (item.id == action.id) {
                //         return {
                //             ...item,
                //             isSelected: true, isSend:true
                //         }
                //     }
                //     return {
                //         ...item, isSelected: false, isSend:true
                //     }
                // }),
                sendMessage: true,
                // isBlock: action.isBlock,
                blocked: action.blocked,
            };
        }

        case BLOCK_TOGGLE: {
            return {
                ...state,
                isBlock: action.isBlock,
                blocked: action.blocked,
                blockLoading: action.blockLoading
            }
        }
        case BLOCK_LOADING: {
            return {
                ...state,
                blockLoading: action.blockLoading
            }
        }
        case ADD_CHAT_MESSAGE: {
            return {
                ...state,
                chat: [...state.chat, action.response]
            }
        }

        case RESET_CHAT: {
            return {
                ...state,
                chat_list: [],
                chat: [],
                sendMessage: false,
                filterName: 'all'
            }
        }

        case TOGGLE_CHAT_MODULE: {
            return {
                ...state,
                chat: [],
                sendMessage: false,
                chat_list: action.filterName === 'un_read' ? state.all_chat.slice().map(item => {
                    return {
                        ...item, isSelected: false
                    }
                }).filter(item => item.un_read !== undefined && item.un_read !== null && Number(item.un_read) > 0) : state.all_chat.slice().map(item => {
                    return {
                        ...item, isSelected: false
                    }
                }),
                filterName: action.filterName
            }
        }
        case CHAT_IMAGE_UPLOADING: {
            return {
                ...state,
                disableMessage: action.loading,
                chat: action.loading === true ? [...state.chat, action.data] : state.chat,
                message_send: !state.message_send
            }
        }
        case DELETE_CHAT: {
            return {
                ...state,
                isDeleted: !state.isDeleted,
                deleteLoading: action.deleteLoading,
                chat: []
            }
        }
        case DELETE_CHAT_LOADING: {
            return {
                ...state,
                deleteLoading: action.deleteLoading
            }
        }
        case SEARCH_CHAT_FRIENDS: {
            return {
                ...state,
                chat_list: action.response,
                chat: []
            }
        }
        default:
            return { ...state }
    }
}
export default chatReducer