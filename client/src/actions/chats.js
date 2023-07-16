import { request } from '../helpers/util';
import socket from '../socket';
import { loadContactSuccess } from "./contact";

const loadChatSuccess = (payload) => ({
    type: 'LOAD_CHAT_SUCCESS',
    payload
})

const loadChatFailure = (error) => ({
    type: 'LOAD_CHAT_FAILURE',
    error
})

export const loadChat = () => {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get('chats', { params: { user: JSON.parse(localStorage.getItem('user'))?.id } })
            if (data.success) {
                dispatch(loadChatSuccess(data.data))
            } else {
                alert('gagal load message')
            }
        } catch (error) {
            dispatch(loadChatFailure(error))
        }
    }
}


const selectedChatSuccess = (payload) => ({
    type: 'SELECTED_CHAT_SUCCESS',
    payload

})

const selectedChatFailure = (error) => ({
    type: 'SELECTED_CHAT_FAILURE',
    error
})

export const selectedChat = (payload) => {
    return async (dispatch, getState) => {
        try {
            let state = getState().chats.data
            let data = state.filter(item => item.sender === payload._id || item.receiver === payload._id)
            let unreadStatus = data.filter(item => item.readstatus === false)
            let id = []
            if (unreadStatus.length > 0) {
                data.filter(item => {
                    if (item.sender === payload._id) {
                        id.push(item._id)
                        return item
                    }
                    return item
                })

                id.forEach(async (id) => {
                    await request.put(`chats/${id}`, { updateReadStatus: true })
                })

                dispatch(selectedChatSuccess({
                    data: [...data.map(item => {
                        if (item.readstatus === false && item.sender === payload._id) {
                            item.readstatus = true
                            return item
                        }
                        return item
                    })], receiver: payload._id
                }))
                socket.emit('send selected read notice', { id, to: payload.target })
            } else {
                dispatch(selectedChatSuccess({ data, receiver: payload._id }))
            }
        } catch (error) {
            dispatch(selectedChatFailure(error))
        }
    }
}


const selectedReadNoticeSuccess = (payload) => ({
    type: 'SELECTED_READ_NOTICE_SUCCESS',
    payload
})

const selectedReadNoticeFailure = (error) => ({
    type: 'SELECTED_READ_NOTICE_FAILURE',
    error
})


export const selectedReadNotice = (payload) => {
    return (dispatch, getState) => {
        try {
            payload.forEach(id => {
                dispatch(selectedReadNoticeSuccess(id))
            })
        } catch (error) {
            dispatch(selectedReadNoticeFailure(error))
        }
    }
}



// FOR SENDER //
const addChatSuccess = (id, payload) => ({
    type: 'ADD_CHAT_SUCCESS',
    id,
    payload
})


const addChatFailure = (id) => ({
    type: 'ADD_CHAT_FAILURE',
    id
})


const addChatRedux = (id, date, message, sender) => ({
    type: 'ADD_CHAT',
    id,
    date,
    message,
    sender
})

export const addChat = (message, name) => {
    const id = Date.now()
    const date = new Date().toLocaleTimeString(["id-ID"], {
        hour: "2-digit",
        minute: "2-digit"
    })

    return async (dispatch, getState) => {
        let sender = JSON.parse(localStorage.getItem('user'))?.sender
        let receiver = getState().chats.setReceiver
        dispatch(addChatRedux(id, date, message, sender))
        try {
            const { data } = await request.post('chats', { message, sender, receiver, date })
            if (data.success) {
                socket.emit('send message', { _id: data.data._id, message, to: name, date: date, sender: sender, receiver: receiver, readstatus: false })
                dispatch(addChatSuccess(id, data.data))
            } else {
                alert('gagal send message')
            }
        } catch (error) {
            dispatch(addChatFailure(id))
        }
    }
}


const removeChatSuccess = (id) => ({
    type: 'REMOVE_CHAT_SUCCESS',
    id
})


const removeChatFailure = (error) => ({
    type: 'REMOVE_CHAT_FAILURE',
    error
})

export const removeChat = (_id, name) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.delete(`chats/${_id}`)
            if (data.success) {
                socket.emit('delete message', { _id, to: name })
                dispatch(removeChatSuccess(_id))
            } else {
                alert('gagal delete message')
            }
        } catch (error) {
            dispatch(removeChatFailure(error))
        }
    }
}


const resendChatSuccess = (id, payload, date) => ({
    type: 'RESEND_CHAT_SUCCESS',
    id,
    payload,
    date
})


const resendChatFailure = (error) => ({
    type: 'RESEND_CHAT_FAILURE',
    error
})

export const resendChat = (_id, message, name) => {
    const date = new Date().toLocaleTimeString(["id-ID"], {
        hour: "2-digit",
        minute: "2-digit"
    })
    return async (dispatch, getState) => {
        let sender = JSON.parse(localStorage.getItem('user'))?.sender
        let receiver = getState().chats.setReceiver
        try {
            const { data } = await request.post('chats', { message, sender, receiver, date })
            if (data.success) {
                socket.emit('send message', { _id: data.data._id, message, to: name, date: date, sender: sender, receiver: receiver, readstatus: false })
                socket.emit('join room', JSON.parse(localStorage.getItem('user'))?.username)
                dispatch(resendChatSuccess(_id, data.data))
            } else {
                alert('gagal resend')
            }
        } catch (error) {
            dispatch(resendChatFailure(error))
        }
    }
}

// FOR RECEIVER //
const addMessageSuccess = (payload) => ({
    type: 'ADD_MESSAGE_SUCCESS',
    payload
})

const addMessageSuccessDiff = (payload) => ({
    type: 'ADD_MESSAGE_SUCCESS_DIFFERENT',
    payload
})


const addMessageFailure = (error) => ({
    type: 'ADD_MESSAGE_FAILURE',
    error
})


export const addMessage = (payload, name) => {
    return async (dispatch, getState) => {
        try {
            let count = getState().contacts.data.filter(item => item._id === payload.sender)
            let receiver = getState().chats.setReceiver
            if (receiver === payload.sender) {
                await dispatch(addMessageSuccess(payload))
                dispatch(loadContactSuccess({
                    counter: [{ unreadCount: 0 }],
                    payload
                }))
                let id = payload._id
                await request.put(`chats/${id}`, { updateReadStatus: true })
                socket.emit('send receiver read notice', { id, to: name })
            } else {
                await dispatch(addMessageSuccessDiff(payload))
                dispatch(loadContactSuccess({
                    counter: [{ unreadCount: count[0].unreadCount + 1 }],
                    payload
                }))
            }
        } catch (error) {
            dispatch(addMessageFailure(error))
        }
    }
}


const receiverReadNoticeSuccess = (payload) => ({
    type: 'RECEIVER_READ_NOTICE_SUCCESS',
    payload
})

const receiverReadNoticeFailure = (error) => ({
    type: 'RECEIVER_READ_NOTICE_FAILURE',
    error
})


export const receiverReadNotice = (payload) => {
    return (dispatch, getState) => {
        try {
            dispatch(receiverReadNoticeSuccess(payload))
        } catch (error) {
            dispatch(receiverReadNoticeFailure(error))
        }
    }
}

const removeMessageSuccess = (payload) => ({
    type: 'REMOVE_MESSAGE_SUCCESS',
    payload
})

const removeMessageFailure = (error) => ({
    type: 'REMOVE_MESSAGE_FAILURE',
    error
})


export const removeMessage = (payload) => {
    return (dispatch, getState) => {
        try {
            dispatch(removeMessageSuccess(payload))
        } catch (error) {
            dispatch(removeMessageFailure(error))
        }
    }
}