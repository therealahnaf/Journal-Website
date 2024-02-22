// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
const ChatRoom = () => {
	const [messages, setMessages] = useState([]);
	const { user } = useAuthContext();
	const [message, setMessage] = useState('');
  const email = user.email

	const fetchMessages = async () => {
		try {
			const response = await fetch('http://localhost:4000/api/messages/messages');
			const data = await response.json();
      console.log(data)
			setMessages(data);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	const sendMessage = async () => {
		try {
      console.log({email,message})
			await fetch('http://localhost:4000/api/messages/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, message }),
			});

			// Clear the message input after sending
			setMessage();
			// Fetch messages to update the list
			fetchMessages();
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		// Fetch messages on component mount
		fetchMessages();
		// Poll for new messages every 2 seconds
		const interval = setInterval(() => {
			fetchMessages();
		}, 2000);

		return () => clearInterval(interval);
	}, []); // Run only once on mount

	return (
		<div>
			<h2>Chat Room</h2>
			<ul>
				{messages.map((message) => (
					<li key={message._id} style={{color: '#fff'}}>
						<strong >{message.email}:</strong> {message.message}
					</li>
				))}
			</ul>
			<div>
				<input style={{color: '#000'}}
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

export default ChatRoom;
