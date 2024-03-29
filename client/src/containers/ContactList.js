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
    const [listedContact, listedCetContact] = useState('')

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
        listedCetContact(target)
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
            selector={listedContact}
            set={() => handleSelectContact(item.username, item._id)}
        />
    ));

    return (
        <div className="w-[30%] max-w-full mx-1">
            <div className="bg-gray-100 rounded-t-md border  h-full max-h-[90.2vh]">
                <div className="">
                    <div className="flex justify-center items-center bg-[#2196F3] px-10 py-6 rounded-t-md">
                        <h2 className="font-semibold text-[#F2F2F2] tracking-wider text-lg sm:text-lg md:text-xl lg:text-xl">Contacts</h2>
                    </div>

                    <div className="w-full max-w-full">
                        <div className="rounded-md">
                            <div className="hover:cursor-pointer overflow-y-scroll">
                                {itemContact}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 py-2 sm:py-4 bg-white w-full border-2 rounded-b-md">
                <button onClick={LogOut} className="transition text-blue-400 border-2 border-blue-400 hover:bg-blue-400 hover:delay-150 hover:text-white px-2 py-1 text-sm rounded-lg sm:px-3 sm:text-[0.7rem] sm:font-bold md:px-4 lg:px-4 sm:text-md md:text-md lg:text-lg flex justify-evenly items-center space-x-2">
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
    )
}

export default ContactList;