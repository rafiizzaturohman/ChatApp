import { combineReducers } from 'redux'
import chats from './chats'
import contacts from './contact'

export default combineReducers({
    chats,
    contacts
})