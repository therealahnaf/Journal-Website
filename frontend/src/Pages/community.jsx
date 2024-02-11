import React, {useState} from 'react';
import './Community.css';

function Community() {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="photo-post">
      <img src="url_to_your_photo" alt="Photo" className="photo" />
      <div className="interactions">
        <button onClick={handleLike} className="like-button">Like</button>
        <span className="likes-count">{likes} Likes</span>
      </div>
      <div className="comment-section">
        <input type="text" placeholder="Add a comment..." className="comment-input" />
        <button onClick={() => handleComment("New comment")} className="comment-button">Post</button>
      </div>
      <div className="comments">
        {comments.map((comment, index) => (
          <p key={index} className="comment">{comment}</p>
        ))}
      </div>
    </div>
  );
}

export default Community;