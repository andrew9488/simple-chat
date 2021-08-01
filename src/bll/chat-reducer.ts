import {Dispatch} from "redux";

type ChatReducerActionsType = ReturnType<typeof messagesReceivedAC> | ReturnType<typeof newMessageSentAC>

type UserType = {
    user_id: string
    name: string
}
export type MessageType = {
    user: UserType
    message: string
    id: string
}

const initialState = {
    messages: [] as Array<MessageType>
}

type InitialStateType = typeof initialState

export const chatReducer = (state: InitialStateType = initialState, action: ChatReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "CHAT/MESSAGES-RECEIVED":
            return {...state, messages: action.messages}
        case "CHAT/NEW-MESSAGES-SENT":
            return {...state, messages: [...state.messages, action.message]}
        default:
            return state
    }
}

const messagesReceivedAC = (messages: Array<MessageType>) =>
    ({type: "CHAT/MESSAGES-RECEIVED", messages} as const)
const newMessageSentAC = (message: MessageType) =>
    ({type: "CHAT/NEW-MESSAGES-SENT", message} as const)

export const createChannelTC = () => (dispatch: Dispatch) => {
}
export const destroyChannelTC = () => (dispatch: Dispatch) => {
}

