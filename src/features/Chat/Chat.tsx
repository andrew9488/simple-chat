import React, {useCallback, useEffect, useRef, useState} from "react";
import {MessageType, UserType} from "../../dal/api";
import {Message} from "../../components/Message/Message";
import {WritingUser} from "../../components/WritingUser/WritingUser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {sendMessageTC, writingMessageTC} from "../../bll/chat-reducer";
import {reset} from "redux-form";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import {useStyles} from "./materialUIstyles";
import {CommonFormPropsType, FieldForm} from "../../components/FieldForm/FieldForm";

export const Chat: React.FC = React.memo(() => {

    const messages = useSelector<AppRootStateType, Array<MessageType>>(state => state.chat.messages)
    const writingUsers = useSelector<AppRootStateType, Array<UserType>>(state => state.chat.writingUsers)
    const dispatch = useDispatch()
    const classes = useStyles()

    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

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

    const onChangeFormMessageHandler = useCallback((text: CommonFormPropsType) => {
        if (text.newText?.trim() !== "") {
            dispatch(sendMessageTC(text.newText))
            dispatch(reset("formForSendText"))
        }
    }, [])

    const onKeyPressMessageHandler = () => {
        dispatch(writingMessageTC())
    }

    return (
        <Card className={classes.root}>
            <CardContent onScroll={onScrollHandler}>
                {messages.map(m => {
                    return <Message key={m.id} message={m}/>

                })}
                {writingUsers.map(u => {
                    return <WritingUser key={u.user_id} user={u}/>

                })}
                <div ref={messagesEndRef}/>
            </CardContent>
            <FieldForm onSubmit={onChangeFormMessageHandler} writingMessage={onKeyPressMessageHandler}/>
        </Card>
    );
})