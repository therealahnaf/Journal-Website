import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

const Comments = ({ post }) => {

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const { user } = useAuthContext();


    const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/posts/comments/${id}`, {
                });
                const data = await response.json();
                console.log(response.ok)
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    

    const handleChange = (e) => {
        setComment({
            ...comment,
            email: user.email,
            postId: post._id,
            comment: e.target.value
        });
    }

    const addComment = async () => {
        try {
            const email = user.email
            const postId = post._id
            console.log(email, postId, comment)
            await fetch('http://localhost:4000/api/posts/comments/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, postId, comment }),
            });

            // Clear the message input after sending
            setComment('');
            fetchComments();
            // Fetch posts to update the list
            // fetchComments();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    useEffect(() => {
		// Fetch posts on component mount
		if (user) {
			fetchComments();
			return
		}
	}, [user]);

    return (
        <div>
            <ul className='eachblog'>
                {comments.map((comment) => (
                    <li key={comment._id} style={{ color: '#fff' }}>
                        <p>{comment.comments}</p>
                        <p className='author'>-{comment.email.split('@')[0]}</p>
                    </li>
                ))}
            </ul>

            <div className='bloginput'>
                <input style={{ color: '#000' }} className='blogcontentinput'
                    type="text"
                    placeholder="Type your content"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={addComment}>Send</button>
            </div>
        </div>
    )
}


export default Comments;