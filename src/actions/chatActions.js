import {
    CHAT_LIST,
    CHAT,
    ADD_CHAT_MESSAGE,
    RESET_CHAT,
    MESSAGE_SEND,
    BLOCK_TOGGLE,
    BLOCK_LOADING,
    DELETE_CHAT,
    DELETE_CHAT_LOADING,
    CHAT_UNREAD_UPDATE,
    TOGGLE_CHAT_MODULE,
    CHAT_IMAGE_UPLOADING,
    SEARCH_CHAT_FRIENDS
} from '../_constants/constants';
import moment from 'moment'
import { toastr } from 'react-redux-toastr'
import axios from '../_helpers/axiosInterceptors'
import firebaseConfig from '../_constants/chatConfig'
import 'firebase/database'

var database = firebaseConfig.database();

export const get_chat_list = () => {
    return dispatch => {
        const data = [{ id: 1, name: "Jeannette Shelton", message: "Hi John, Wants to talk to you", time: "10:25AM" }, { id: 2, name: "Jeannette Shelton", message: "Hi John, Wants to talk to you", time: "10:25AM" }, { id: 3, name: "Jeannette Shelton", message: "Hi John, Wants to talk to you", time: "10:25AM" }, { id: 4, name: "Jeannette Shelton", message: "Hi John, Wants to talk to you", time: "10:25AM" }, { id: 5, name: "Jeannette Shelton", message: "Hi John, Wants to talk to you", time: "10:25AM" }, { id: 6, name: "Jeannette Shelton", message: "Hi John, Wants to talk to you", time: "10:25AM" }]
        dispatch({
            type: CHAT_LIST,
            response: data
        })
    }
}

const get_user_friends = (userId) => {
    return new Promise((resolve, reject) => {
        database.ref("rooms/" + userId.toString()).on("value", async snapshot => {
            const user_image = await get_profile_image(userId)
            let chatUsers = [];
            snapshot.forEach((snap) => {
                // console.log(snap.val())
                const reciver_id = Number(snap.val().message_by) === Number(userId) ? snap.val().message_to : snap.val().message_by
                database.ref("users/" + reciver_id).once('value').then((userImage) => {
                    if (userImage.exists()) {
                        chatUsers.push({ user_image: user_image.image, reciver_image: userImage.val().photo, ...snap.val() });
                        // console.log(chatUsers)

                    } else {
                        chatUsers.push({ user_image: user_image.image, reciver_image: '', ...snap.val() });
                    }
                })
            });
            // console.log(chatUsers)
            resolve(chatUsers)
        });
    })
}

export const get_chat_user = (userId) => {
    return async dispatch => {
        const ref = database.ref("rooms/" + userId.toString())
        ref.on("value", async snapshot => {
            let chatUsers = [];
            snapshot.forEach((snap) => {
                chatUsers.push(snap.val());
            });
            console.log(chatUsers)
            window.$('#chatBlockModel').modal('hide')

            // console.log(chatUsers)
            dispatch({
                type: CHAT_LIST,
                response: chatUsers
            })
        });


    }
}
export const change_chat_user = (userId) => {
    return async dispatch => {
        const ref = database.ref("rooms/" + userId.toString())
        ref.on("child_changed", async snapshot => {
            let chatUsers = [];
            // console.log('chatUsers', snapshot.val())
            dispatch({
                type: CHAT_UNREAD_UPDATE,
                response: snapshot.val()
            })
        });
    }
}
export const update_user_image_firebase = (id) => {
    return new Promise((resolve, reject) => {
        database.ref("friends/").once("value", async snapshot => {
            snapshot.forEach((snap) => {
                database.ref("users/" + id).once('value').then(async (user) => {
                    if (user.exists()) {
                        await database.ref("friends/" + snap.key + "/" + id).once('value').then((snapshot) => {
                            if (snapshot.exists()) {
                                // console.log(user.val().photo, 'Image')
                                const image = user.val().photo !== undefined ? user.val().photo : ''
                                database.ref("friends/" + snap.key + "/" + id).update({ image: image }, (error) => {
                                    if (error) {
                                        toastr.error('Error', error)
                                        // The write failed...
                                    } else {
                                        // Data saved successfully!
                                    }
                                })
                            }

                        })
                    }
                })
            });
            resolve()
        });
    })
}
const get_profile_image = (id) => {
    return new Promise((resolve, reject) => {
        database.ref("users/" + id).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().photo !== undefined) {
                    resolve({ image: snapshot.val().photo })
                } else {
                    resolve({ image: '' })
                }
                // console.log(snapshot.val());
            }
            resolve({ image: '' })
        })
    })
}
export const get_block_user = (id, user_id) => {
    return new Promise((resolve, reject) => {
        let newData = []
        try {
            database.ref("friends/" + user_id + "/" + id).once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    newData = snapshot.val()
                }
                resolve(newData)
            }).catch((error) => {
                reject(error)
                console.error(error);
            });
        } catch (err) {
            reject(err)
            console.error(err);
        }

    })
}
export const get_chats = (user_id, message_to, list_id, id) => {
    return async dispatch => {
        let chatId = ''
        if (parseInt(user_id) < parseInt(message_to)) {
            chatId = (user_id.toString()) + (message_to.toString());
        }
        else {
            chatId = (message_to.toString()) + (user_id.toString());
        }
        chatId = chatId + "L" + list_id.toString()
        database.ref("Conversation/" + chatId).on("value", async snapshot => {
            let chats = [];
            if (Number(sessionStorage.getItem('chatId')) === Number(id)) {
                snapshot.forEach((snap) => {
                    if (snap.val().deleted_by !== undefined && snap.val().deleted_by !== null && Number(snap.val().deleted_by) !== Number(user_id)) {
                        chats.push(snap.val());
                    }
                });

                let check_block_reciver = await get_block_user(message_to, user_id)
                let check_block_sender = await get_block_user(user_id, message_to)

                let blocked = false
                if (check_block_sender !== undefined && check_block_sender.isBlock === true) {
                    blocked = { id: message_to, ...check_block_sender, block_by: check_block_reciver.name }
                }
                if (check_block_reciver !== undefined && check_block_reciver.isBlock === true) {
                    blocked = { id: user_id, ...check_block_reciver, block_by: check_block_sender.name }
                }
                const check_block = (check_block_reciver !== undefined && check_block_reciver.isBlock !== undefined ? check_block_reciver.isBlock : false) || (check_block_sender !== undefined && check_block_sender.isBlock !== undefined ? check_block_sender.isBlock : false)

                dispatch({
                    type: CHAT,
                    response: chats,
                    id: id,
                    // isBlock: check_block !== undefined ? check_block : false,
                    blocked: blocked,
                })

            }

            // console.log(chats)
        });

    }
}
export const read_all_chat = (user_id, message_to, list_id) => {
    return async dispatch => {
        console.log(user_id, message_to, list_id)
        await update_read_count(user_id.toString(), message_to.toString(), list_id.toString())
    }

}
export const add_chat_message = (data) => {
    return dispatch => {
        dispatch({
            type: ADD_CHAT_MESSAGE,
            response: data
        })
    }
}
const check_chat_exist = async (id, user_id, list_id) => {
    return new Promise((resolve, reject) => {
        let chatId = ''
        if (parseInt(user_id) < parseInt(id)) {
            chatId = (user_id.toString()) + (id.toString());
        }
        else {
            chatId = (id.toString()) + (user_id.toString());
        }
        chatId = chatId + "L" + list_id.toString()
        database.ref("Conversation/" + chatId).orderByKey().limitToLast(1).once("value", function (snapshot) {
            if (snapshot.val() !== null) {
                snapshot.forEach(function (data) {

                    if (data.val() !== undefined && data.val() !== null) {
                        if (data.val().deleted_by !== undefined && data.val().deleted_by !== null) {
                            resolve(false)
                        } else {
                            resolve(true)
                        }
                    } else {
                        resolve(false)
                    }
                });
            } else {
                resolve(false)
            }

        })
    })


}
const create_conversation = (data, time) => {
    return async dispatch => {
        let chatId = ''
        if (parseInt(data.message_by) < parseInt(data.message_to)) {
            chatId = (data.message_by.toString()) + (data.message_to.toString());
        }
        else {
            chatId = (data.message_to.toString()) + (data.message_by.toString());
        }
        chatId = chatId + "L" + data.list_id.toString()
        await database.ref("Conversation/" + chatId).push().set(data, (error) => {
            if (error) {
                console.log(error)
                toastr.error('Error', error)
                dispatch({
                    type: CHAT_IMAGE_UPLOADING,
                    loading: false
                })
                // The write failed...
            } else {
                console.log(data, 'Message Send')
                dispatch({
                    type: MESSAGE_SEND,
                    loading: false,
                    time: time
                })
                // dispatch({
                //     type: CHAT_IMAGE_UPLOADING,
                //     loading: false
                // })
                // Data saved successfully!
            }
        })
    }

}
export const send_message = (data) => {
    return async dispatch => {
        let storeData = data
        storeData.isSend = false;
        storeData.Time = moment().format('MMMM Do YYYY, h:mm:ss a')
        const time = moment().format('MMMM Do YYYY, h:mm:ss a')
        dispatch({
            type: CHAT_IMAGE_UPLOADING,
            loading: true,
            data: storeData
        })
        let check_block_reciver = await get_block_user(data.message_to, data.message_by)
        let check_block_sender = await get_block_user(data.message_by, data.message_to)
        let block = false
        let block_by = ''
        if (check_block_sender !== undefined && check_block_sender.isBlock === true) {
            block = true
            block_by = data.message_to
        }
        if (check_block_reciver !== undefined && check_block_reciver.isBlock === true) {
            block = true
            block_by = data.message_by
        }
        try {
            const check_chat = await check_chat_exist(data.message_to.toString(), data.message_by.toString(), data.list_id.toString());
            if (check_chat == false) {
                await check_friend_exist(data.message_by.toString(), data.message_to.toString(), data.reciver_name)
                await check_friend_exist(data.message_to.toString(), data.message_by.toString(), data.sender_name)
                await check_room_exist(data.message_by.toString(), data.message_to.toString(), data.list_id.toString(), { id: data.id, reciver_name: `${data.reciver_name}`, sender_name: `${data.sender_name}`, list_desc: `${data.list_desc}`, list_id: `${data.list_id}`, message: `${data.message}`, time: `${data.time}`, list_price: `${data.list_price}`, lister_name: `${data.lister_name}`, message_to: `${data.message_to}`, message_by: `${data.message_by}`, vehicle_image: `${data.vehicle_image}`, user_image: `${data.user_image}`, lister_image: `${data.lister_image}`, un_read: 0 })
                await check_room_exist(data.message_to.toString(), data.message_by.toString(), data.list_id.toString(), { id: data.id, reciver_name: `${data.reciver_name}`, sender_name: `${data.sender_name}`, list_desc: `${data.list_desc}`, list_id: `${data.list_id}`, message: `${data.message}`, time: `${data.time}`, list_price: `${data.list_price}`, lister_name: `${data.lister_name}`, message_to: `${data.message_to}`, message_by: `${data.message_by}`, vehicle_image: `${data.vehicle_image}`, user_image: `${data.user_image}`, lister_image: `${data.lister_image}`, un_read: 0 })
            }
            data.block = block
            data.block_by = block_by
            data.deleted_by = ''
            dispatch(create_conversation(data, time))
            if (block === false) {
                await update_unread_count(data.message_to.toString(), data.message_by.toString(), data.list_id.toString())
            }
        } catch (err) {
            toastr.error('Error', err.message)
            console.log(err.message)
        }
        // }


    }
}
const update_unread_count = (userId, friendId, list_id) => {
    return new Promise((resolve, reject) => {
        console.log('update_unread_count', userId, friendId, list_id)

        database.ref("rooms/" + userId + "/" + friendId + "L" + list_id).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().un_read !== undefined && snapshot.val().un_read !== null) {
                    const unRead = Number(snapshot.val().un_read) + 1
                    database.ref("rooms/" + userId + "/" + friendId + "L" + list_id).update({ un_read: unRead }, async (error) => {
                        if (error) {
                            console.log(error)
                            toastr.error('Error', error.message)
                            // The write failed...
                        } else {
                            console.log('Updated')
                            // Data saved successfully!
                        }
                    })
                }
            }
            resolve()
        }).catch((error) => {
            console.error(error);
        });
    })
}
const update_read_count = (userId, friendId, list_id) => {
    return new Promise((resolve, reject) => {
        console.log('update_read_count', userId, friendId, list_id)

        database.ref("rooms/" + userId + "/" + friendId + "L" + list_id).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().un_read !== undefined && snapshot.val().un_read !== null) {
                    database.ref("rooms/" + userId + "/" + friendId + "L" + list_id).update({ un_read: 0 }, async (error) => {
                        if (error) {
                            console.log(error)
                            toastr.error('Error', error.message)
                            // The write failed...
                        } else {
                            console.log('Updated')
                            // Data saved successfully!
                        }
                    })
                }
            }
            resolve()
        }).catch((error) => {
            console.error(error);
        });
    })
}
const check_room_exist = (userId, friendId, list_id, data) => {
    return new Promise((resolve, reject) => {
        let newData
        database.ref("rooms/" + userId + "/" + friendId + "L" + list_id).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                newData = snapshot.val()
            }
            else {
                database.ref("rooms/" + userId + "/" + friendId + "L" + list_id).set(data, (error) => {
                    if (error) {
                        console.log(error)
                        toastr.error('Error', error)
                        // The write failed...
                    } else {
                        newData = data
                        // console.log(data)
                        // Data saved successfully!
                    }
                })
                console.log("No data available");
                // return false
            }
            resolve(newData)
        }).catch((error) => {
            console.error(error);
        });
    })
}
const check_friend_exist = (userId, friendId, user_name) => {
    return new Promise((resolve, reject) => {
        let newData
        database.ref("friends/" + userId + "/" + friendId).once('value').then(async (snapshot) => {
            if (snapshot.exists()) {
                newData = snapshot.val()
            }
            else {
                const user_image = await get_profile_image(userId)
                database.ref("friends/" + userId + "/" + friendId).set({ isDeleted: false, isBlock: false, name: user_name ? user_name.toLowerCase() : '', image: user_image.image }, (error) => {
                    if (error) {
                        console.log(error)
                        toastr.error('Error', error)
                        // The write failed...
                    } else {
                        newData = { isDeleted: false, isBlock: false, name: user_name ? user_name.toLowerCase() : '', image: user_image.image }
                        // Data saved successfully!
                    }
                })
                console.log("No data available");
            }
            resolve(newData)
        }).catch((error) => {
            console.error(error);
        });
    })
}
export const reset_chat = () => {
    return dispatch => {
        dispatch({
            type: RESET_CHAT
        })

    }
}
export const block_user = (user_id, friend_id, status) => {
    return dispatch => {
        dispatch({
            type: BLOCK_LOADING,
            blockLoading: true
        })
        database.ref("friends/" + user_id.toString() + "/" + friend_id.toString()).update({ isBlock: status }, async (error) => {
            if (error) {
                console.log(error)
                toastr.error('Error', error.message)
                dispatch({
                    type: BLOCK_LOADING,
                    blockLoading: false
                })
                // The write failed...
            } else {
                let check_block_reciver = await get_block_user(friend_id, user_id)
                let check_block_sender = await get_block_user(user_id, friend_id)
                let blocked = false
                if (check_block_sender !== undefined && check_block_sender.isBlock === true) {
                    blocked = { id: friend_id, ...check_block_sender }
                }
                if (check_block_reciver !== undefined && check_block_reciver.isBlock === true) {
                    blocked = { id: user_id, ...check_block_reciver }
                }
                dispatch({
                    type: BLOCK_TOGGLE,
                    isBlock: status,
                    blocked: blocked,
                    blockLoading: false
                })
                // Data saved successfully!
            }
        })
    }

}

export const delete_conversation = (user_id, friend_id, list_id) => {
    return async dispatch => {
        console.log('Delete', user_id, friend_id, list_id)
        dispatch({
            type: DELETE_CHAT_LOADING,
            deleteLoading: true
        })
        let chatId = ''
        if (parseInt(user_id) < parseInt(friend_id)) {
            chatId = (user_id.toString()) + (friend_id.toString());
        }
        else {
            chatId = (friend_id.toString()) + (user_id.toString());
        }
        chatId = chatId + "L" + list_id.toString()
        await update_read_count(user_id.toString(), friend_id.toString(), list_id.toString())
        const deleteRoom = await database.ref("rooms/" + user_id.toString() + "/" + friend_id.toString() + "L" + list_id.toString()).remove()
        // console.log('deleteRoom', deleteRoom)
        let userDelete = await check_room_deleted(user_id.toString(), friend_id.toString(), list_id.toString())
        let friendDelete = await check_room_deleted(friend_id.toString(), user_id.toString(), list_id.toString())
        userDelete = userDelete !== undefined && userDelete !== null ? userDelete.length > 0 ? false : true : false
        friendDelete = friendDelete !== undefined && friendDelete !== null ? friendDelete.length > 0 ? false : true : false
        console.log('friendDelete', friendDelete, userDelete)
        if (userDelete === true && friendDelete === true) {
            sessionStorage.removeItem('chatId')
            database.ref("Conversation/" + chatId).remove()
        } else {
            database.ref("Conversation/" + chatId).once("value", snapshot => {
                snapshot.forEach((snap) => {
                    database.ref("Conversation/" + chatId + "/" + snap.key).once("value", snapChild => {
                        if (snapChild.exists()) {
                            sessionStorage.removeItem('chatId')
                            if (snapChild.val().deleted_by !== undefined && snapChild.val().deleted_by === '') {
                                console.log('Deleted Chat Successfully Start IF', snapChild.val())
                                database.ref("Conversation/" + chatId + "/" + snap.key).update({ deleted_by: user_id.toString() }, async (error) => {
                                    if (error) {
                                        console.log(error)
                                        toastr.error('Error', error.message)

                                        // The write failed...
                                    } else {
                                        console.log('Deleted Chat Successfully')
                                        // Data saved successfully!
                                    }
                                })
                            }
                            console.log('Deleted Chat Successfully Start Else', snapChild.val())

                        }
                    })
                })
                // console.log(chats)
            });
        }
        window.$('#chatBlockModel').modal('hide')
        dispatch({
            type: DELETE_CHAT,
            deleteLoading: false
        })
        // database.ref("rooms/" + user_id.toString() + "/" + friend_id.toString() + "L" + list_id.toString()).remove().then(async () => {
        //     console.log("Remove succeeded.")
        //     // sessionStorage.removeItem('chatId')
        //     window.$('#chatBlockModel').modal('hide')
        //     dispatch({
        //         type: DELETE_CHAT
        //     })
        // })
        //     .catch(function (error) {
        //         dispatch({
        //             type: DELETE_CHAT
        //         })
        //         window.$('#chatBlockModel').modal('hide')
        //         toastr.error('Error', error.message)
        //         console.log("Remove failed: " + error.message)
        //     });;
    }

}

export const upload_chat_images = (data, chatData, images) => {

    return dispatch => {
        let storeData = chatData
        storeData.isSend = false;
        storeData.Time = moment().format('MMMM Do YYYY, h:mm:ss a')
        const time = moment().format('MMMM Do YYYY, h:mm:ss a')
        const fileMessage = { ...storeData, ...images }
        dispatch({
            type: CHAT_IMAGE_UPLOADING,
            loading: true,
            data: fileMessage
        })
        const url = `/chat_files/`
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: data,
            url,
            onUploadProgress: data => {
                //Set the progress value to show the progress bar
                console.log('dasdasxas', Math.round((100 * data.loaded) / data.total))
            },

        }
        axios(options).then(response => {
            console.log(response)
            if (response.data.success === true) {
                dispatch(send_image_message(chatData, time))
                // dispatch({
                //     type: CHAT_IMAGE_UPLOADING,
                //     loading: false
                // })
            } else {
                dispatch({
                    type: CHAT_IMAGE_UPLOADING,
                    loading: false
                })
            }
            // toastr.success('Success', "Ad Post Created Successfully")

        }).catch(err => {
            dispatch({
                type: CHAT_IMAGE_UPLOADING,
                loading: false
            })
            const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
            toastr.error('Error', message.toString())
        })
    }
}

const send_image_message = (data, time) => {
    return async dispatch => {

        let check_block_reciver = await get_block_user(data.message_to, data.message_by)
        let check_block_sender = await get_block_user(data.message_by, data.message_to)
        let block = false
        let block_by = ''
        if (check_block_sender !== undefined && check_block_sender.isBlock === true) {
            block = true
            block_by = data.message_to
        }
        if (check_block_reciver !== undefined && check_block_reciver.isBlock === true) {
            block = true
            block_by = data.message_by
        }

        try {
            const check_chat = await check_chat_exist(data.message_to.toString(), data.message_by.toString(), data.list_id.toString());
            if (check_chat == false) {
                await check_friend_exist(data.message_by.toString(), data.message_to.toString(), data.reciver_name)
                await check_friend_exist(data.message_to.toString(), data.message_by.toString(), data.sender_name)
                await check_room_exist(data.message_by.toString(), data.message_to.toString(), data.list_id.toString(), { id: data.id, reciver_name: `${data.reciver_name}`, sender_name: `${data.sender_name}`, list_desc: `${data.list_desc}`, list_id: `${data.list_id}`, message: `${data.message}`, time: `${data.time}`, list_price: `${data.list_price}`, lister_name: `${data.lister_name}`, message_to: `${data.message_to}`, message_by: `${data.message_by}`, vehicle_image: `${data.vehicle_image}`, user_image: `${data.user_image}`, lister_image: `${data.lister_image}`, un_read: 0 })
                await check_room_exist(data.message_to.toString(), data.message_by.toString(), data.list_id.toString(), { id: data.id, reciver_name: `${data.reciver_name}`, sender_name: `${data.sender_name}`, list_desc: `${data.list_desc}`, list_id: `${data.list_id}`, message: `${data.message}`, time: `${data.time}`, list_price: `${data.list_price}`, lister_name: `${data.lister_name}`, message_to: `${data.message_to}`, message_by: `${data.message_by}`, vehicle_image: `${data.vehicle_image}`, user_image: `${data.user_image}`, lister_image: `${data.lister_image}`, un_read: 0 })
            }
            data.block = block
            data.block_by = block_by
            data.deleted_by = ''
            dispatch(create_conversation(data, time))
            if (block === false) {
                await update_unread_count(data.message_to.toString(), data.message_by.toString(), data.list_id.toString())
            }
        } catch (err) {
            toastr.error('Error', err.message)
            console.log(err.message)
        }
    }
}

export const toggle_chat_module = (filterName) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_CHAT_MODULE,
            filterName: filterName
        })
    }
}

const check_room_deleted = (userId, friendId, list_id) => {
    return new Promise((resolve, reject) => {
        console.log('check_room_deleted', userId, friendId, list_id)
        let newData = []
        database.ref("rooms/" + userId + "/" + friendId + "L" + list_id).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                newData = [snapshot.val()]
            }
            resolve(newData)
        }).catch((error) => {
            console.error(error);
        });
    })
}

export const search_friends = (userId, search) => {
    return dispatch => {
        const ref = database.ref("rooms/" + userId.toString())
        ref.orderByChild('lister_name').startAt(search ? search.toLowerCase() : '').endAt(`${search ? search.toLowerCase() : ''}\uf8ff`).on("value", async snapshot => {
            let chatUsers = [];
            snapshot.forEach((snap) => {
                chatUsers.push(snap.val());
            });
            console.log(chatUsers, 'Search Data')
            // window.$('#chatBlockModel').modal('hide')
            dispatch({
                type: SEARCH_CHAT_FRIENDS,
                response: chatUsers
            })
        });
    }
}

 // database.ref("Conversation/" + chatId).orderByChild("deleted_by").equalTo('')
                // // .update({ deleted_by: user_id.toString() }, async (error) => {
                // //     if (error) {
                // //         console.log(error)
                // //         toastr.error('Error', error.message)
                // //         // The write failed...
                // //     } else {
                // //         console.log('Updated')
                // //         // Data saved successfully!
                // //     }
                // // })