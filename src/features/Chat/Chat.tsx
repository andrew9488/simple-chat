import React, {useEffect, useRef, useState} from "react";
import {MessageType, UserType} from "../../dal/api";
import {Message} from "../../components/Message/Message";
import {WritingUser} from "../../components/WritingUser/WritingUser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {sendMessageTC, writingMessageTC} from "../../bll/chat-reducer";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import {useStyles} from "./materialUIstyles";
import {TextField} from "@material-ui/core";
import Button from '@material-ui/core/Button';

export const Chat: React.FC = React.memo(() => {

    const [value, setValue] = useState("")
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

    const onChangeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const onKeyPressMessageHandler = () => {
        dispatch(writingMessageTC())
    }

    const onClickSendMessageHandler = () => {
        if (value.trim() !== "") {
            dispatch(sendMessageTC(value))
            setValue("")
        }
    }

    return (
        <Card className={classes.root}>
            <CardContent onScroll={onScrollHandler} className={classes.chatBlock}>
                {messages.map(m => {
                    return <Message key={m.id} message={m} className={classes.message}/>

                })}
                {writingUsers.map(u => {
                    return <WritingUser key={u.user_id} user={u}/>

                })}
                <div ref={messagesEndRef}/>
            </CardContent>
            <div className={classes.formBlock}>
                <TextField
                    className={classes.input}
                    id="message"
                    multiline
                    maxRows={3}
                    value={value}
                    onChange={onChangeValueHandler}
                    onKeyPress={onKeyPressMessageHandler}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    onClick={onClickSendMessageHandler}
                >
                    Send
                </Button>
            </div>
        </Card>
    );
})