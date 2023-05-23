import React, { useEffect, useState } from "react";
import ContactItem from "../components/ContactItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { request } from "../helpers/util";
import { Navigate } from "react-router-dom";
import { selectedChat } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";
import { loadContact, removeNotification } from "../actions/contact";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const ContactList = (props) => {
    const contacts = useSelector((state) => state.contacts.data)
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    const [contactActive, setContactActive] = useState('')

    useEffect(() => {
        dispatch(loadContact())
    }, [dispatch])

    const LogOut = async () => {
        try {
            await request.get('users/signout')
            localStorage.removeItem('user')
            request.interceptors.request.use(function (config) {
                config.headers.Authorization = null

                return config
            })
            setRedirect(true)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelectContact = (target, _id) => {
        setContactActive(target)
        props.formChat(target)
        dispatch(selectedChat({ target, _id }))
        dispatch(removeNotification(_id))
    };

    const itemContact = contacts.map((item, index) => (
        <ContactItem
            key={index}
            id={item._id}
            count={item.unreadCount}
            contact={item.username}
            selector={contactActive}
            set={() => handleSelectContact(item.username, item._id)}
        />
    ));

    return (
        <div>
            <div className="bg-gray-200 h-screen">
                <div className="bg-gray-400 px-6 py-3">
                    <h2 className="font-semibold tracking-wider text-lg sm:text-lg md:text-xl lg:text-xl">Contacts</h2>
                </div>

                <div className="hover:cursor-pointer">
                    {itemContact}
                </div>

                <div className="fixed w-full px-6 py-3 bottom-0 left-0 bg-gray-400">
                    <button onClick={LogOut} className="transition border-2 border-red-500 hover:bg-red-500 hover:delay-150 hover:text-white px-3 py-1 rounded-full sm:px-4 md:px-5 lg:px-5 flex justify-evenly items-center space-x-2">
                        <FontAwesomeIcon icon={faRightFromBracket} />

                        <p>Log Out</p>
                    </button>
                    {
                        redirect && (
                            <Navigate to='/' replace={true} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ContactList;