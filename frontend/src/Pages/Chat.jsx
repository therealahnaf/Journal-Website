import React, { useState, useEffect } from 'react';
import { useChat } from "../Hooks/useChat"
import { useAuthContext } from '../Hooks/useAuthContext'; 
export const Chat = () => {
    const { user } = useAuthContext()
    const [message, setMessage] = useState('');
    const  {messages, sendMessage} = useChat();
  return (
    <div>
        <h2>Chat Room</h2>
        <ul>
            {messages.map((message) => (
                <li key={message._id}>
                    <strong>{user.email}:</strong> {message.message}
                </li>
            ))}
        </ul>
        <div>
            <input style={{ color: '#000'}}
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
);
};

export default Chat;