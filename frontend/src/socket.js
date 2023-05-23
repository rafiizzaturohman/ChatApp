import { io } from 'socket.io-client'

const socket = io('http://192.168.1.6:3000', { transports: ['websocket'], autoConnect: true })

export default socket