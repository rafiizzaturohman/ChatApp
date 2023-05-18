const initialState = {
    data: []
}

const contacts = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CONTACT_SUCCESS':
            if (action.payload.payload) {
                return {
                    data: state.data.map(item => {
                        if (item._id === action.payload.payload?.sender) {
                            item.unreadCount = action.payload.cnt[0].unreadCount
                            return item
                        }
                        return item
                    })
                }
            } else {
                return {
                    data: action.payload.cnt
                }
            }

        case 'LOAD_CONTACT_FAILURE':
            alert(action.error);
            return state

        case 'REMOVE_NOTIFICATION_SUCCESS':
            return {
                data: state.data.map(item => {
                    if (item._id === action.payload) {
                        item.unreadCount = 0
                        return item
                    }
                    return item
                })
            }

        case 'REMOVE_NOTIFICATION_FAILURE':
            alert(action.error);
            return state

        default:
            return state
    }
}

export default contacts