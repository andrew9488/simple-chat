import {Dispatch} from "redux";
import {API, MessageType, UserType} from "../dal/api";

type ChatReducerActionsType =
    ReturnType<typeof messagesReceivedAC>
    | ReturnType<typeof newMessageSentAC>
    | ReturnType<typeof writingUserAC>

const initialState = {
    messages: [] as Array<MessageType>,
    writingUsers: [] as Array<UserType>
}

type InitialStateType = typeof initialState

export const chatReducer = (state: InitialStateType = initialState, action: ChatReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "CHAT/MESSAGES-RECEIVED":
            return {...state, messages: action.messages}
        case "CHAT/NEW-MESSAGES-SENT":
            return {
                ...state, messages: [...state.messages, action.message],
                writingUsers: state.writingUsers.filter(u => u.user_id !== action.message.user.user_id)
            }
        case "CHAT/WRITING-USER":
            return {
                ...state,
                writingUsers: [...state.writingUsers.filter(u => u.user_id !== action.user.user_id), action.user]
            }
        default:
            return state
    }
}

const messagesReceivedAC = (messages: Array<MessageType>) =>
    ({type: "CHAT/MESSAGES-RECEIVED", messages} as const)
const newMessageSentAC = (message: MessageType) =>
    ({type: "CHAT/NEW-MESSAGES-SENT", message} as const)
const writingUserAC = (user: UserType) =>
    ({type: "CHAT/WRITING-USER", user} as const)

export const createChannelTC = () => (dispatch: Dispatch) => {
    API.createChannel()
    API.subscribe(
        (messages: Array<MessageType>) => {
            dispatch(messagesReceivedAC(messages))
        },
        (message: MessageType) => {
            dispatch(newMessageSentAC(message))
        },
        (user: UserType) => {
            dispatch(writingUserAC(user))
        }
    )
}
export const destroyChannelTC = () => (dispatch: Dispatch) => {
    API.destroyChannel()
}
export const setClientNameTC = (name: string) => (dispatch: Dispatch) => {
    API.sendClientName(name)
}
export const sendMessageTC = (message: string) => (dispatch: Dispatch) => {
    API.sendMessage(message)
}
export const writingMessageTC = () => (dispatch: Dispatch) => {
    API.writingMessage()
}

