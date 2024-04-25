// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import './Chat.css'

export const fetchMessagesTest = async () => {
	try {
		const response = await fetch('http://localhost:4000/api/messages/messages');
		const data = await response.json();
		return data
	} catch (error) {
		console.error('Error fetching messages:', error);
		return error
	}
};
export const sendMessageTest = async (email, message) => {
	try {
		await fetch('http://localhost:4000/api/messages/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, message }),
		});
		return true
	} catch (error) {
		console.error('Error sending message:', error);
		return error
	}
};
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
			console.log({ email, message })
			await fetch('http://localhost:4000/api/messages/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, message }),
			});

			// Clear the message input after sending
			setMessage('');
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
		<div className="chatroom">
			<h1>Chat Room</h1>
			<div className="chatbox">
				<ul>
					{messages.map((message) => (
						<li key={message._id} className={message.email === email ? 'right_li' : 'left_li'}>
							<strong className='chatemail'>{message.email.split('@')[0]}</strong>
							<div className={message.email === email ? 'messagecontainer_r' : 'messagecontainer_l'}>
								<div className="message-container">
									<p class='p4'>{message.message}</p>
									<p class='p5'>{message.timestamp.split('T')[0]} {message.timestamp.split('T')[1].split(':').slice(0, 2)[0]}:{message.timestamp.split('T')[1].split(':').slice(0, 2)[1]}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
				<div className='messageinput'>
					<input
						type="text"
						placeholder="Type your message..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<div className="messageinputbutton">
						<button onClick={sendMessage}>Send</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ChatRoom;