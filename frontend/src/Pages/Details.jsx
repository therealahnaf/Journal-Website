import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import './Details.css'
import bloglogo from '../Components/Assets/communityblog.png'
const Details = () => {
    const [post, setPost] = useState({});
    const [email, setEmail] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/posts/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                    setEmail(data.email.split('@')[0])
                } else {
                    console.error('Error fetching post:', response.status);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className='fulldetailspage'>
            <div className="blogbox">
                <h1>Blog Details</h1>
                <div className="blogcontent">
                    <div className="titleandcommentlogo">
                        <img src={bloglogo} alt="" />
                        <h2>{post.title}</h2>
                    </div>
                    <p>{post.content}</p>
                    <p1>Author: {email}</p1>
                </div>
            </div>
            <div className="commentbox">
                <Comments post={post} />
            </div>
        </div>

    );
};

export default Details;
