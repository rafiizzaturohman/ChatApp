import React, { useCallback, useState } from "react";
import Modal from './Modal';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faRotateForward, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const ChatBody = (props) => {
    const [show, setShow] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false)
    }

    const _id = JSON.parse(localStorage.getItem('user'))?.id
    const sender = JSON.parse(localStorage.getItem('user'))?.sender
    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }, [])

    const handleDeleteMessage = () => {
        props.delete()
        handleCloseModal()
    }

    if (props.sent === true && props.id === _id) {
        return (
            <div className="flex justify-end mx-4">
                <div id="chatbody" ref={setRef} className="text-black border-2 border-blue-400 px-3 py-2 rounded-xl space-x-3 my-1 w-full max-w-[30vh]" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                    <span>
                        <div>
                            <ReactMarkdown children={props.chat} />
                        </div>

                        <div className="flex gap-1 justify-end">
                            <div>
                                {
                                    props.readstatus === false ?
                                        <FontAwesomeIcon icon={faCheck} color="black" />
                                        :
                                        <FontAwesomeIcon icon={faCheckDouble} color="blue" />
                                }
                            </div>
                            {props.date}
                        </div>
                    </span>
                    {
                        show &&
                        <button type="button" onClick={handleOpenModal} className="transition border border-black/50 px-4 rounded-full text-black hover:bg-black hover:text-white hover:delay-100">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    }
                    <Modal isOpen={modalOpen} onClose={handleCloseModal} onDelete={handleDeleteMessage} />
                </div>
            </div>
        )
    } else if (props.sent === false && sender === _id) {
        return (
            <div className="flex justify-end mx-4">
                <div id="chatbody" ref={setRef} className="text-black border border-blue-400 px-3 py-2 rounded-xl space-x-3 my-2 w-full max-w-[30vh]">
                    <button onClick={props.resend}>
                        <FontAwesomeIcon icon={faRotateForward} />
                    </button>

                    <span className="text-white">
                        <ReactMarkdown children={props.chat} />
                        <div className="">
                            {props.date}
                        </div >
                    </span >
                </div >
            </div>
        )
    } else {
        return (
            sender === props.receiver ?
                <div className="my-2 mx-4">
                    <div id="chatbody" ref={setRef} className="bg-blue-400 px-3 py-2 rounded-xl space-x-3 my-1 w-full max-w-[40vh]">
                        <span className="text-white">
                            <ReactMarkdown children={props.chat} />

                            <div className="flex justify-end">
                                {props.date}
                            </div >
                        </span >
                    </div >
                </div>
                :
                null
        )
    }
}

export default ChatBody;