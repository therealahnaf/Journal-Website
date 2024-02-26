import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import './comments.css'
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
        <div className="commentpagebox">
            <h1>Comments</h1>
            <div className='commentinput'>
                <input style={{ color: '#000' }} className='commentcontentinput'
                    type="text"
                    placeholder="Type your Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={addComment}>Send</button>
                <div className="commentshowbox">
                <ul className='eachcomment'>
                    {comments.map((comment) => (
                        <li key={comment._id} style={{ color: '#fff' }}>
                            <p className='commentby'><b>{comment.email.split('@')[0]}:</b> {comment.comments}</p>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    )
}


export default Comments;