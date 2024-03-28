import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';

export const Journal = () => {
  const [journalcontent, setContent] = useState('');
  const [sentiment, setSentiment] = useState('')
  const [recentJournals, setrecentJournals] = useState('')
  const { user } = useAuthContext();
  const [journals, setJournals] = useState([]);



  const fetchJournals = async (email) => {
    try {
      const response = await fetch(`http://localhost:4000/api/journals?email=${email}`, {
        // Include any additional fetch options if needed
      });
      const data = await response.json();
      setJournals(data);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  useEffect(() => {
    // Fetch posts on component mount
    if (user) {
      fetchJournals(user.email);
    }
  }, [user]);
  
  useEffect(() => {
    if (journals.length > 0) {
      const journalcontentArray = journals.map(row => row.journalcontent);
  
      if (journals.length > 4) {
        // If there are more than 2 journals, slice the array and join the elements
        const updatedRecentJournals = journalcontent.concat(' ').concat(journalcontentArray.slice(0, 5).join(' '));
        setrecentJournals(updatedRecentJournals);
        console.log(updatedRecentJournals); // Log the updated value
      } else {
        // If there are 2 or fewer journals, join all elements
        const updatedRecentJournals = journalcontent.concat(' ').concat(journalcontentArray.join(' '));
        setrecentJournals(updatedRecentJournals);
        console.log(updatedRecentJournals); // Log the updated value
      }
    }
  }, [journals]);
  
  useEffect(() => {
    if (recentJournals !== '') {
      const fetchData = async () => {
        try {
          const response = await query({ "inputs": recentJournals });
          // Parse the JSON response
          const data = response;
          console.log(data);
  
          // Find the label with the highest score
          let maxScoreLabel = '';
          let maxScore = -1;
          for (const entry of data[0]) {
            if (entry.score > maxScore) {
              maxScore = entry.score;
              maxScoreLabel = entry.label;
            }
          }
  
          // Display the label with the highest score
          setSentiment(maxScoreLabel);
          console.log("Label with highest score:", maxScoreLabel);
  
          setContent('');
          // Fetch posts to update the list
          fetchJournals(user.email);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
  
      fetchData();
    }
  }, [recentJournals]);
  

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
      

      const email = user.email
			await fetch('http://localhost:4000/api/journals', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
				},
				body: JSON.stringify({ journalcontent, email }),
			});
      const journalcontentArray = journals.map(row => row.journalcontent);
      console.log(journalcontentArray);

      if (journals.length > 4) {
        // If there are more than 2 journals, slice the array and join the elements
        const updatedRecentJournals = journalcontent.concat(' ').concat(journalcontentArray.slice(0, 5).join(' '));
        setrecentJournals(updatedRecentJournals);
        console.log(updatedRecentJournals); // Log the updated value
      } else {
        // If there are 2 or fewer journals, join all elements
        const updatedRecentJournals =  journalcontent.concat(' ').concat(journalcontentArray.join(' '));
        setrecentJournals(updatedRecentJournals);
        console.log(updatedRecentJournals); // Log the updated value
      }
      

      const response = await query({"inputs": recentJournals});
      
      // Parse the JSON response
      const data = response;
      console.log(data)


      // Find the label with the highest score
      let maxScoreLabel = '';
      let maxScore = -1;
      for (const entry of data[0]) {
        if (entry.score > maxScore) {
            maxScore = entry.score;
            maxScoreLabel = entry.label;
        }

    }
    

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
      <div className='allblog'>
				<ul className='eachblog'>
					{journals.map((journal) => (
						<li key={journal._id} style={{ color: '#fff' }}>
							<p>{journal.journalcontent}</p>
							<p className='date'>-{new Date(journal.createdAt).toLocaleString()}</p>
						</li>
					))}
				</ul>
			</div>
  </div>
  )
}
export default Journal