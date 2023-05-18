const initialState = {
    data: [],
    selectedChat: [],
    setReceiver: ""
}

const chats = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CHAT_SUCCESS':
            return {
                ...state,
                data: action.payload.map(item => {
                    item.sent = true
                    return item
                })
            }

        case 'LOAD_CHAT_FAILURE':
            alert(action.error);
            return state

        case 'SELECTED_CHAT_SUCCESS':
            return {
                ...state,
                selectedChat: action.payload.data,
                setReceiver: action.payload.receiver
            }

        case 'SELECTED_CHAT_FAILURE':
            alert(action.error);
            return state

        case 'SELECTED_READ_NOTICE_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item._id === action.payload) {
                        item.readstatus = true
                        return item
                    }
                    return item
                })],
                selectedChat: [...state.selectedChat.map(item => {
                    if (item._id === action.payload) {
                        item.readstatus = true
                        return item
                    }
                    return item
                })]
            }

        case 'SELECTED_READ_NOTICE_FAILURE':
            alert(action.error);
            return state

        case 'RECEIVER_READ_NOTICE_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item._id === action.payload) {
                        item.readstatus = true
                        return item
                    }
                    return item
                })],
                selectedChat: [...state.selectedChat.map(item => {
                    if (item._id === action.payload) {
                        item.readstatus = true
                        return item
                    }
                    return item
                })]
            }
        case 'RECEIVER_READ_NOTICE_FAILURE':
            alert(action.error);
            return state

        // FOR SENDER //
        case 'ADD_CHAT':
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        _id: action.id,
                        message: action.message,
                        date: action.date,
                        sender: action.sender,
                        sent: true
                    }
                ],
                selectedChat: [
                    ...state.selectedChat,
                    {
                        _id: action.id,
                        message: action.message,
                        date: action.date,
                        sender: action.sender,
                        sent: true
                    }]
            }

        case 'ADD_CHAT_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item._id === action.id) {
                        return {
                            _id: action.payload._id,
                            message: action.payload.message,
                            sender: action.payload.sender,
                            receiver: action.payload.receiver,
                            date: action.payload.date,
                            readstatus: action.payload.readstatus,
                            sent: true
                        }
                    }
                    return item
                })],
                selectedChat: [...state.selectedChat.map(item => {
                    if (item._id === action.id) {
                        return {
                            _id: action.payload._id,
                            message: action.payload.message,
                            sender: action.payload.sender,
                            receiver: action.payload.receiver,
                            date: action.payload.date,
                            readstatus: action.payload.readstatus,
                            sent: true
                        }
                    }
                    return item
                })]
            }

        case 'ADD_CHAT_FAILURE':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item._id === action.id) {
                        return {
                            ...item,
                            sent: false
                        }
                    }
                    return item
                })],
                selectedChat: [...state.selectedChat.map(item => {
                    if (item._id === action.id) {
                        return {
                            ...item,
                            sent: false
                        }
                    }
                    return item
                })]
            }

        case 'REMOVE_CHAT_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item._id === action.id) {
                        item.message = "This message has been deleted"
                        return item
                    }
                    return item
                })],
                selectedChat: [...state.selectedChat.map(item => {
                    if (item._id === action.id) {
                        item.message = "This message has been deleted"
                        return item
                    }
                    return item
                })]
            }

        case 'REMOVE_CHAT_FAILURE':
            alert(action.error);
            return state

        case 'RESEND_CHAT_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item._id === action.id) {
                        return {
                            _id: action.payload._id,
                            message: action.payload.message,
                            sender: action.payload.sender,
                            receiver: action.payload.receiver,
                            date: action.payload.date,
                            readstatus: action.payload.readstatus,
                            sent: true
                        }
                    }
                    return item
                })],
                selectedChat: [...state.selectedChat.map(item => {
                    if (item._id === action.id) {
                        return {
                            _id: action.payload._id,
                            message: action.payload.message,
                            sender: action.payload.sender,
                            receiver: action.payload.receiver,
                            date: action.payload.date,
                            readstatus: action.payload.readstatus,
                            sent: true
                        }
                    }
                    return item
                })]
            }
        case 'RESEND_CHAT_FAILURE':
            alert(action.error);
            return state

        // FOR RECEIVER //
        case 'ADD_MESSAGE_SUCCESS':
            return {
                ...state,
                data: [...state.data, action.payload],
                selectedChat: [...state.selectedChat, action.payload]
            }

        case 'ADD_MESSAGE_SUCCESS_DIFFERENT':
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case 'ADD_MESSAGE_FAILURE':
            alert(action.error);
            return state

        case 'REMOVE_MESSAGE_SUCCESS':
            return {
                ...state,
                data: [...state.data.map(item => {
                    if (item._id === action.payload) {
                        item.message = "This message has been deleted"
                        return item
                    }
                    return item
                })],
                selectedChat: [...state.selectedChat.map(item => {
                    if (item._id === action.payload) {
                        item.message = "This message has been deleted"
                        return item
                    }
                    return item
                })]
            }

        case 'REMOVE_MESSAGE_FAILURE':
            alert(action.error);
            return state

        default:
            return state
    }
}

export default chats