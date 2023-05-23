import React, { Fragment, useState } from "react";
// useEffect, useState
// import socket from "../socket";
// import { useDispatch, useSelector } from "react-redux";
import { IsLoggedIn } from "../helpers/util";
import ContactList from "./ContactList";
// import { addChat, addMessage, loadChat, receiverReadNotice, removeChat, removeMessage, resendChat, selectedReadNotice } from '../actions/chats';
// import { loadContact } from '../actions/contact'

const ChatForm = () => {
    // const selected = useSelector((state) => state.chats.selectedChat)
    // const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [chat, setChat] = useState(false)
    // const [message, setMessage] = useState('')
    // const [isConnected, setIsConnected] = useState(socket.connected);

    // useEffect(() => {
    //     dispatch(loadChat())
    //     socket.on('connect', () => {
    //         socket.emit('join room', JSON.parse(localStorage.getItem('user'))?.username)
    //         setIsConnected(true);
    //     });

    //     socket.on('receive message', (data) => {
    //         dispatch(addMessage({ _id: data._id, message: data.message, date: data.date, sender: data.sender, receiver: data.receiver, readstatus: data.readstatus }, name))
    //     })

    //     socket.on('receive selected read notice', (id) => {
    //         dispatch(selectedReadNotice(id))
    //     })

    //     socket.on('receive receiver read notice', (id) => {
    //         dispatch(receiverReadNotice(id))
    //     })

    //     socket.on('receive new user', (data) => {
    //         dispatch(loadContact({ username: data.username, _id: data._id, unreadCount: data.unreadCount }))
    //     })

    //     socket.on('delete message', (id) => {
    //         dispatch(removeMessage(id))
    //     })

    //     socket.on('disconnect', () => {
    //         setIsConnected(false);
    //     });

    //     console.log(isConnected);

    //     return () => {
    //         socket.off('connect');
    //         socket.off('receive message');
    //         socket.off('delete message');
    //         socket.off('receive notification')
    //         socket.off('disconnect');

    //     };
    // }, [dispatch, name, isConnected]);

    const handleFormChat = (target) => {
        setChat(true)
        setName(target)
    }

    // const submitChat = (e) => {
    //     e.preventDefault()
    //     dispatch(addChat(message, name))
    //     setMessage('')
    // }

    // const resendMessage = (_id, message, name) => {
    //     dispatch(resendChat(_id, message, name))
    //     setMessage('')
    // }

    return (
        <Fragment>
            <IsLoggedIn />
            <div className="">
                <div>
                    <ContactList formChat={handleFormChat} />
                </div>
            </div>
        </Fragment>
    )
}

export default ChatForm;