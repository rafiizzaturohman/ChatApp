import React, { Fragment, useState, useEffect } from "react";
// useEffect, useState
import socket from "../socket";
import { IsLoggedIn } from "../helpers/util";
import ContactList from "./ContactList";
import { addChat, addMessage, loadChat, receiverReadNotice, removeChat, removeMessage, resendChat, selectedReadNotice } from '../actions/chats';
import { loadContact } from '../actions/contact'
import { useDispatch, useSelector } from "react-redux";
import ChatBody from "../components/ChatBody";

const ChatForm = () => {
    const dispatch = useDispatch()
    const selected = useSelector((state) => state.chats.selectedChat)

    const [name, setName] = useState('')
    const [chat, setChat] = useState(false)
    const [message, setMessage] = useState('')
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        dispatch(loadChat())
        socket.on('connect', () => {
            socket.emit('join room', JSON.parse(localStorage.getItem('user'))?.username)
            setIsConnected(true);
        });

        socket.on('receive message', (data) => {
            dispatch(addMessage({ _id: data._id, message: data.message, date: data.date, sender: data.sender, receiver: data.receiver, readstatus: data.readstatus }, name))
        })

        socket.on('receive selected read notice', (id) => {
            dispatch(selectedReadNotice(id))
        })

        socket.on('receive receiver read notice', (id) => {
            dispatch(receiverReadNotice(id))
        })

        socket.on('receive new user', (data) => {
            dispatch(loadContact({ username: data.username, _id: data._id, unreadCount: data.unreadCount }))
        })

        socket.on('delete message', (id) => {
            dispatch(removeMessage(id))
        })

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        console.log(isConnected);

        return () => {
            socket.off('connect');
            socket.off('receive message');
            socket.off('delete message');
            socket.off('receive notification')
            socket.off('disconnect');

        };
    }, [dispatch, name, isConnected]);

    const handleFormChat = (target) => {
        setChat(true)
        setName(target)
    }

    const submitChat = (e) => {
        e.preventDefault()
        dispatch(addChat(message, name))
        setMessage('')
    }

    const resendMessage = (_id, message, name) => {
        dispatch(resendChat(_id, message, name))
        setMessage('')
    }

    return (
        <Fragment>
            <IsLoggedIn />
            <div className="">
                <div className="">
                    <ContactList formChat={handleFormChat} />
                    {
                        !chat ?
                            <div>
                                <div className="bg-gray-400 w-screen">
                                    <h3 className="px-4">Receiver Name</h3>
                                </div>

                                <div>
                                    <h2 className="flex justify-center text-center">Select a chat to start messaging</h2>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="bg-gray-400 w-screen">
                                    <h4 className="px-4">{name}</h4>
                                </div>

                                <div>
                                    <form onSubmit={submitChat}>
                                        <div className="px-2">
                                            {
                                                selected.map(item => {
                                                    return (
                                                        <ChatBody
                                                            key={item._id}
                                                            id={item.sender}
                                                            receiver={item.receiver}
                                                            sent={item.sent}
                                                            date={item.date}
                                                            readstatus={item.readstatus}
                                                            delete={() => dispatch(removeChat(item._id, name))}
                                                            resend={() => dispatch(resendMessage(item._id, item.message, name))}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>

                                        <div>
                                            <div>
                                                <input type="text" autofocus={true} class="border border-black/25 px-4 py-1 w-full rounded-xl" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ChatForm;