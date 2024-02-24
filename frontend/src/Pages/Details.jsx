import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

const Details = () => {    
    const [post, setPost] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/posts/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
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
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>by: {post.email}</p>
            <Comments post={post} />
        </div>
        
    );
};

export default Details;
