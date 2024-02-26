
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import bloglogo from '../Components/Assets/communityblog.png'
import { Link } from 'react-router-dom';
import './Community.css'
const Community = () => {
	const [posts, setPosts] = useState([]);
	const { user } = useAuthContext();
	const [postTitle, setPosttitle] = useState('');
	const [postContent, setPostcontent] = useState('');
	const [error, setError] = useState(null)

	const fetchPosts = async () => {
		try {
			const response = await fetch('http://localhost:4000/api/posts', {
			});
			const data = await response.json();
			console.log(data)
			setPosts(data);
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	const sendPost = async () => {
		try {
			const email = user.email
			console.log(postTitle, postContent)
			await fetch('http://localhost:4000/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postTitle, postContent, email }),
			});

			// Clear the message input after sending
			setPosttitle('');
			setPostcontent('')
			// Fetch posts to update the list
			fetchPosts();
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	useEffect(() => {
		// Fetch posts on component mount
		if (user) {
			fetchPosts();
			return
		}
	}, [user]); // Run only once on mount

	return (
		<div className='blogfullpage'>
			<div className='allblog'>
				<ul className='eachblog'>
					{posts.map((post) => (
						<li key={post._id} style={{ color: '#fff' }}>
							<div className="titleandlogo">
							<img src={bloglogo} alt="" />
							<Link to={`Details/${post._id}`}>
                        		<h2>{post.title}</h2>
            				</Link>
							</div>
							<p>{post.content}</p>
							<p className='author'>-{post.email.split('@')[0]}</p>
						</li>
					))}
				</ul>
			</div>
			<div className='bloginput'>
				<h1>New Blog Post</h1>
				<input style={{ color: '#000' }} className='blogtitleinput'
					type="text"
					placeholder="Type your title"
					value={postTitle}
					onChange={(e) => setPosttitle(e.target.value)}
				/>
				<textarea style={{ color: '#000' }} className='blogcontentinput'
					type="text"
					placeholder="Type your content"
					value={postContent}
					onChange={(e) => setPostcontent(e.target.value)}
				/>
				<button onClick={sendPost}>Send</button>
			</div>
		</div>
	);
}

export default Community

