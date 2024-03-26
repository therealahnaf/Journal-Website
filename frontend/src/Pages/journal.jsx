import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

export const Journal = () => {
  const [journalcontent, setContent] = useState('');
  const [sentiment, setSentiment] = useState('')


  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-emotion-analysis",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  const addJournalcontent = async () => {
    try {
      const response = await query({"inputs": journalcontent});

      // Parse the JSON response
      const data = response;
      console.log(data)

      // Find the label with the highest score
      let maxScoreLabel = '';
      let maxScore = -1;
      data[0].forEach(entry => {
          if (entry.score > maxScore) {
              maxScore = entry.score;
              maxScoreLabel = entry.label;
          }
      });

      // Display the label with the highest score
      setSentiment(maxScoreLabel)
      console.log("Label with highest score:", maxScoreLabel);

      setContent('');

        // Fetch posts to update the list
        // fetchComments();
    } catch (error) {
        console.error('Error sending message:', error);
    }
  }
  
  return (
    <div>
      <div className="commentpagebox">
          <h1>Write Journal</h1>
          {sentiment && (
        <div>
          <h2>You're feeling: {sentiment}</h2>
          
        </div>
      )}
          <div className='commentinput'>
              <input style={{ color: '#000' }} className='commentcontentinput'
                  type="text"
                  placeholder="Type your content"
                  value={journalcontent}
                  onChange={(e) => setContent(e.target.value)}
              />
              <button onClick={addJournalcontent}>Send</button>
              
          </div>
      </div>
  </div>
  )
}
export default Journal