import {io, Socket} from "socket.io-client";

type UserType = {
    user_id: string
    name: string
}
export type MessageType = {
    user: UserType
    message: string
    id: string
}

type MessagesShowedCallback = (messages: Array<MessageType>) => void
type NewMessageSentCallback = (message: MessageType) => void

export const API = {
    socket: null as Socket | null,
    createChannel() {
        // this.socket = io("https://simple-chat-back.herokuapp.com", {transports: ['websocket', 'polling', 'flashsocket']})
        this.socket = io("http://localhost:3009", {transports: ['websocket', 'polling', 'flashsocket']})
    },
    destroyChannel() {
        this.socket?.close()
        this.socket = null
    },
    subscribe(messagesShowed: MessagesShowedCallback, newMessageSent: NewMessageSentCallback) {
        this.socket?.on("messages-showed", messagesShowed)
        this.socket?.on("new-message-sent", newMessageSent)
    },
    sendClientName(name: string) {
        this.socket?.emit("name-sent", name)
    },
    sendMessage(message: string) {
        this.socket?.emit("message-sent", message)
    }
}