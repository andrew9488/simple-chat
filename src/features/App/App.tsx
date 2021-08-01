import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './App.css';
import {MessageType, UserType} from "../../dal/api";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {
    createChannelTC,
    destroyChannelTC,
    sendMessageTC,
    setClientNameTC,
    writingMessageTC
} from "../../bll/chat-reducer";
import {Header} from "../../components/Header/Header";


export const App: React.FC = React.memo(() => {

    const messages = useSelector<AppRootStateType, Array<MessageType>>(state => state.chat.messages)
    const writingUsers = useSelector<AppRootStateType, Array<UserType>>(state => state.chat.writingUsers)
    const dispatch = useDispatch()

    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        dispatch(createChannelTC())
        return () => {
            dispatch(destroyChannelTC())
        }
    }, [])

    useEffect(() => {
        if (isAutoScroll) {
            scrollToBottom()
        }
    }, [isAutoScroll, messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }
    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        const maxScrollPosition = element.scrollHeight - element.clientHeight
        const difference = Math.abs(maxScrollPosition - element.scrollTop)
        if (element.scrollTop > lastScrollTop && difference < 10) {
            setIsAutoScroll(true)
        } else {
            setIsAutoScroll(false)
        }
        setLastScrollTop(element.scrollTop)
    }

    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const onClickMessageHandler = () => {
        if (message.trim() !== "") {
            dispatch(sendMessageTC(message))
            setMessage("")
        }
    }
    const onKeyPressMessageHandler = () => {
        dispatch(writingMessageTC())
    }

    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onClickNameHandler = () => {
        if (name.trim() !== "") {
            dispatch(setClientNameTC(name))
            setName("")
        }
    }

    return (
        <div className="App">
            <Header/>
            <div style={{
                border: "1px solid",
                padding: 10,
                height: 300,
                width: 250,
                overflowY: "scroll"
            }}
                 onScroll={onScrollHandler}>
                {messages.map(m => {
                    return <div key={m.id}>
                        <b>{m.user.name}: </b> <span>{m.message}</span>
                        <hr/>
                    </div>

                })}
                {writingUsers.map(u => {
                    return <div key={u.user_id}>
                        <b>{u.name}: </b> <span>...</span>
                    </div>

                })}
                <div ref={messagesEndRef}/>
            </div>
            <div><input value={name} onChange={onChangeNameHandler}/>
                <button onClick={onClickNameHandler}> send name</button>
            </div>
            <textarea value={message} onChange={onChangeMessageHandler} onKeyPress={onKeyPressMessageHandler}/>
            <button onClick={onClickMessageHandler}>send message</button>
        </div>
    );
})
