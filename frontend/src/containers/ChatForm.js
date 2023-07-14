import React, { Fragment, useState, useEffect } from "react";
import socket from "../socket";
import { IsLoggedIn } from "../helpers/util";
import ContactList from "./ContactList";
import { addChat, addMessage, loadChat, receiverReadNotice, removeChat, removeMessage, resendChat, selectedReadNotice } from '../actions/chats';
import { loadContact } from '../actions/contact'
import { useDispatch, useSelector } from "react-redux";
import ChatBody from "../components/ChatBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatForm = () => {
    const dispatch = useDispatch()
    const selected = useSelector((state) => state.chats.selectedChat)

    // console.log(selected)

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
        <Fragment className="flex justify-center">
            <IsLoggedIn />
            <div className="w-full max-w-[100vh]">
                <div className="flex justify-center">
                    <ContactList formChat={handleFormChat} />
                    {
                        !chat ?
                            <div className="w-full mx-1">
                                <div className="bg-gray-50 rounded-md">
                                    <div className="bg-[#2196F3] px-6 py-6 rounded-t-md">
                                        <h4 className="font-semibold text-center text-[#F2F2F2] tracking-wider text-lg sm:text-lg md:text-xl lg:text-xl">Receiver Name</h4>
                                    </div>

                                    <div className="flex bg-gray-100 w-full h-screen max-h-[88vh] border-t-2 justify-center items-center">
                                        <div className="text-center">
                                            <h1>Select a contact to start messaging</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="w-full max-w-full mx-1">
                                <div className="bg-gray-50 rounded-md">
                                    <div className="bg-[#2196F3] px-6 py-6 rounded-t-md">
                                        <h4 className="font-semibold text-center text-[#F2F2F2] tracking-wider text-lg sm:text-lg md:text-xl lg:text-xl">{name}</h4>
                                    </div>

                                    <div className="overflow-y-scroll heigh-calc py-4">
                                        {
                                            selected.map(item => {
                                                return (
                                                    <ChatBody
                                                        key={item._id}
                                                        id={item.sender}
                                                        receiver={item.receiver}
                                                        sent={item.sent}
                                                        date={item.date}
                                                        chat={item.message}
                                                        readstatus={item.readstatus}
                                                        delete={() => dispatch(removeChat(item._id, name))}
                                                        resend={() => dispatch(resendMessage(item._id, item.message, name))}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                    <form onSubmit={submitChat}>
                                        <div className="bg-white w-full border-t-2">
                                            <div className="p-3">
                                                <div className="flex space-x-4">
                                                    <input
                                                        type="text"
                                                        autoFocus={true}
                                                        className="transition border border-black/25 px-4 py-1 w-full rounded-xl focus:border-black focus:delay-100"
                                                        name="inputchat"
                                                        id="inputchat"
                                                        placeholder="Write a message here..."
                                                        autoComplete="off"
                                                        value={message}
                                                        onChange={e => setMessage(e.target.value)}
                                                    />

                                                    <div className="">
                                                        <button type="submit" className="transition hover:delay-150 bg-blue-500 hover:bg-blue-400 px-3 text-xl rounded-full py-2 text-white">
                                                            <FontAwesomeIcon icon={faPaperPlane} />
                                                        </button>
                                                    </div>
                                                </div>
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