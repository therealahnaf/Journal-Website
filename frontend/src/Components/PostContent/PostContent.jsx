import React, {useState} from 'react'
import './PostContent.css'
export const PostContent = () => {
    const [inputValue, setInputValue] = useState('');
    const [picture, setPicture] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const formData = new FormData();
            formData.append('picture', picture) //for image
            const response = await fetch('/backend/upload', {
                method: 'POST',
                body: formData
              });
        
              if (response.ok) {
                console.log('Picture uploaded successfully!');
                // You can add additional logic here upon successful upload
              } else {
                console.error('Failed to upload picture');
              }
            } catch (error) {
              console.error('Error uploading picture:', error);
            }
          };
        
          const handleFileChange = (e) => {
            setPicture(e.target.files[0]);
          };
          const handleChange = (e) => {
            setInputValue(e.target.value);
          };
  return (
    <form onSubmit={handleSubmit} className='PostContent'>
      <input type='text' class = "input-text" value={inputValue} onChange={handleChange}/>
      <label class = 'label'>
        Upload Picture:
        <input
          type="file"
          class = "input-file"
          onChange={handleFileChange}
        />
      </label>
      <button type="submit">SHARE</button>
    </form>
    
  )
}

