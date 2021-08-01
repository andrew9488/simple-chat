import {applyMiddleware, combineReducers, createStore} from "redux";
import {chatReducer} from "./chat-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    chat: chatReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>