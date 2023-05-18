import { request } from '../helpers/util';

export const loadContactSuccess = (payload) => ({
    type: 'LOAD_CONTACT_SUCCESS',
    payload
})

const loadContactFailure = (error) => ({
    type: 'LOAD_CONTACT_FAILURE',
    error
})

export const loadContact = (payload) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await request.get('users')
            const response = await request.get('chats', { params: { user: JSON.parse(localStorage.getItem('user'))?.id } })

            if (data.success) {
                let s = []
                let temp = data.data
                let chatData = response.data.data
                for (let i = 0; i < temp.length; i++) {
                    if (JSON.parse(localStorage.getItem('user'))?.username !== temp[i].username) {
                        if (payload && !temp[i]) {
                            s.push({ username: payload.username, _id: payload._id, unreadCount: payload.unreadCount })
                        } else {
                            s.push({ username: temp[i].username, _id: temp[i]._id, unreadCount: 0 })
                        }
                    }
                }

                for (let j = 0; j < chatData.length; j++) {
                    for (let k = 0; k < s.length; k++) {
                        if (chatData[j].readstatus === false && chatData[j].sender === s[k]._id) {
                            s[k].unreadCount = s[k].unreadCount + 1
                        }
                    }
                }
                await dispatch(loadContactSuccess({ s }))
            } else {
                alert('gagal load contact')
            }
        } catch (error) {
            dispatch(loadContactFailure(error))
        }
    }
}

const removeNotificationSuccess = (payload) => ({
    type: 'REMOVE_NOTIFICATION_SUCCESS',
    payload
})

const removeNotificationFailure = (error) => ({
    type: 'REMOVE_NOTIFICATION_FAILURE',
    error
})

export const removeNotification = (payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch(removeNotificationSuccess(payload))
        } catch (error) {
            dispatch(removeNotificationFailure(error))
        }
    }
}