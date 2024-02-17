import React, { useState, useEffect } from 'react';

export const PostContent = () => {
  // State to store the content text
  const [contentText, setContentText] = useState('');
  
  // State to store the selected image
  const [image, setImage] = useState(null);
  
  // State to store the user ID
  const [userId, setUserId] = useState(null);

  // Effect to fetch the user ID when component mounts
  useEffect(() => {
    // Replace this with your actual user authentication method
    // For example, you might use a context or a global state to store user information
    const fetchUserId = () => {
      // Simulating fetching user ID (Replace with actual logic)
      const loggedInUserId = '123'; // Example user ID
      setUserId(loggedInUserId);
    };
    
    fetchUserId();
  }, []);

  // Function to handle content text change
  const handleContentTextChange = (e) => {
    setContentText(e.target.value);
  };
  
  // Function to handle image selection
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now submit the contentText, image, and userId to your backend for posting
    console.log('Content Text:', contentText);
    console.log('Image:', image);
    console.log('User ID:', userId);

    // Reset form fields after submission
    setContentText('');
    setImage(null);
  };

  return (
    <div>
      <h2>Post Content</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={contentText}
            onChange={handleContentTextChange}
            placeholder="Enter your content..."
            rows="4"
            cols="50"
            required
          />
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
};

