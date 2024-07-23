import React, { useRef, useState } from 'react';
import './index.css';
import { Backdrop, CircularProgress } from '@mui/material';

type Message = {
    text: string;
    sender: string;
};

const ChatBot: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [question, setQuestions] = useState<string[]>([]);


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e?.target?.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!input.trim()) return;
        setLoading(true)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${Math.floor(Math.random() * 500) + 1}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuestions([...question, input])
            setMessages([...messages, { text: data.body, sender: input }]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setInput('');
        setLoading(false)
    };


    return (
        <div className="chat-bot-container" >
            <h1>React Chat Bot</h1>
            <div className="chat-container">
                <div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
                {
                    messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <div className="message-text" style={{ margin: "10px 0px 10px auto", width: "50%" }}>{message.sender}</div>
                            <div className="message-text">{message.text}</div>
                        </div>
                    ))
                }
            </div>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={handleInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBot;
