import socket from '../socket'
import React, { useState } from "react";
import { request } from "../helpers/util";
import { useNavigate } from "react-router-dom";
import ContactItem from './ContactItem';

const LoginForm = () => {
    const [userName, setUserName] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await request.post('users/auth', { username: userName })

            console.log(data)

            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.data))
                request.interceptors.request.use(function (config) {
                    config.headers.Authorization = `Bearer ${data.data.token}`

                    return config
                })
                navigate('/chat', { replace: true })
                socket.emit('Send New User', { username: data.data.username, _id: data.data.id, unreadCount: 0 })
                socket.emit('Join Room', data.data.username)
                setUserName('')
            } else {
                alert('Fail to Logged In')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => setUserName(e.target.value)

    return (
        <div className='bg-slate-100'>
            <div className="flex items-center justify-center h-screen">
                <form onSubmit={handleSubmit} className='space-y-6 bg-white border border-black/50 px-8 py-5 sm:w-full md:w-1/3 lg:w-1/3 rounded-xl shadow-xl'>
                    <h1 className='text-green-600 text-center font-bold sm:text-xl md:text-xl lg:text-2xl uppercase '>Welcome</h1>

                    <div className='flex flex-col items-center justify-center'>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='Username'
                            value={userName}
                            onChange={handleChange}
                            className='border border-black/25 px-3 py-1.5 rounded-md w-full' />

                        <button
                            type='submit'
                            className='transition-all hover:delay-150 font-bold text-white text-md bg-blue-500 hover:bg-blue-400 rounded-lg uppercase mt-3 px-20 py-1.5'>
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm