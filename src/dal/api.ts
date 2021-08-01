import {io, Socket} from "socket.io-client";

export type UserType = {
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
type UserWritingMessageCallback = (user: UserType) => void

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
    subscribe(messagesShowed: MessagesShowedCallback, newMessageSent: NewMessageSentCallback, writingMessage: UserWritingMessageCallback) {
        this.socket?.on("messages-showed", messagesShowed)
        this.socket?.on("new-message-sent", newMessageSent)
        this.socket?.on("writing-message", writingMessage)
    },
    sendClientName(name: string) {
        this.socket?.emit("client-sent-name ", name)
    },
    sendMessage(message: string) {
        this.socket?.emit("client-sent-message", message)
    },
    writingMessage() {
        this.socket?.emit("client-writing-message")
    }
}