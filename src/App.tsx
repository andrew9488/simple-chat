import React, {useState} from 'react';
import './App.css';

function App() {

    const [messages, setMessages] = useState([
        {user: {id: 1, name: "Andrew"}, message: "hello Anton", id: 1.1},
        {user: {id: 2, name: "Anton"}, message: "Hi, Andrew!", id: 2.1}
    ])

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
            <textarea/>
            <button>send</button>
        </div>
    );
}

export default App;
