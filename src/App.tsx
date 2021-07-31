import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {io} from "socket.io-client";

// let socket = io("https://simple-chat-back.herokuapp.com", {transports: ['websocket', 'polling', 'flashsocket']})
let socket = io("http://localhost:3009", {transports: ['websocket', 'polling', 'flashsocket']})

function App() {

    useEffect(() => {
    }, [])

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([
        {user: {id: 1, name: "Andrew"}, message: "hello Anton", id: 1.1},
        {user: {id: 2, name: "Anton"}, message: "Hi, Andrew!", id: 2.1}
    ])

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }

    const onClickHandler = () => {
        if (message.trim() !== "") {
            socket.emit("message-sent", message)
            setMessage("")
        }
    }

    return (
        <div className="App">
            <div style={{
                border: "1px solid",
                padding: 10,
                height: 300,
                width: 250,
                overflowY: "scroll"
            }}>
                {messages.map(m => {
                    return <div key={m.user.name + m.id}>
                        <b>{m.user.name}: </b> <span>{m.message}</span>
                        <hr/>
                    </div>

                })}
            </div>
            <textarea value={message} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>send</button>
        </div>
    );
}

export default App;
