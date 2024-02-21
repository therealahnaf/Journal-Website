import React, { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const {user} = useAuthContext();
    const [message, setMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
 
    const sendMessage = async () => {
        const user_id = user._id
        try {
            await fetch('http://localhost:4000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id , message }),
            });
 
            // Clear the message input after sending
            setMessage('');
            // Fetch messages to update the list
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
 
    return {messages, sendMessage}
}