import { io } from 'socket.io-client'

const socket = io('http://192.168.1.78:3005', { transports: ['websocket'], autoConnect: true })

export default socket