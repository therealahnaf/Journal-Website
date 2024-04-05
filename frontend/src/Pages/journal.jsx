import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Hooks/useAuthContext';
import './Journal.css'
//const { GoogleGenerativeAI } = require("@google/generative-ai");

export const Journal = () => {
  const [journalcontent, setContent] = useState('');
  const [sentiment, setSentiment] = useState('')
  const [question, setQuestion] = useState('')
  const [recentJournals, setrecentJournals] = useState('')
  const { user } = useAuthContext();
  const [journals, setJournals] = useState([]);
  const [haveJournals, setHaveJournals] = useState(false)


  // Access your API key as an environment variable (see "Set up your API key" above)
  async function generateContent(sentiment) {
    try {
      const response = await fetch('http://localhost:4000/api/journals/generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentiment })
      });
      const data = await response.json();
      return data.generatedText;
    } catch (error) {
      console.error('Error generating content:', error);
      return null;
    }
  }

  // Example usage in your component
  useEffect(() => {
    if (sentiment) {
      generateContent(sentiment)
        .then((generatedText) => {
          if (generatedText) {
            // Do something with the generated text
            console.log('Generated text:', generatedText);
            setQuestion(generatedText);
          }
        });
    } else if (!haveJournals) {
      setQuestion("Start writing about your day!")
    }
  }, [sentiment]);




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
        // If there are more than 2 journals, slice the array and join the elements
        const updatedRecentJournals = journalcontentArray[0];
        setrecentJournals(updatedRecentJournals);
        console.log(updatedRecentJournals); // Log the updated value
        setHaveJournals(true)

    } else{
      setHaveJournals(false)
    }
  }, [journals]);

  useEffect(() => {
    if (recentJournals !== '') {
      const fetchData = async () => {
        try {
          setQuestion("Generating prompt...");
          let data;
  
          // Assuming you have recentJournals defined
          const response = await fetch('http://localhost:4000/api/journals/getSentiment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "inputs": recentJournals })
          });
          
          console.log(recentJournals);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          console.log(response);
          data = await response.json();
          // Process the response data as needed
          console.log(data);
  
          // Find the label with the highest score
          setMaxLabel(data)
  
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

  const setMaxLabel = async (data) =>{
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
  }
  
  

  const addJournalcontent = async () => {
    try {
      const email = user.email;
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
  
      let data; // Define data variable here
  
      if (journals.length > 0) {
        // If there are more than 2 journals, slice the array and join the elements
        const updatedRecentJournals = journalcontentArray[0];
        setrecentJournals(updatedRecentJournals);
        console.log(updatedRecentJournals); // Log the updated value
      } else {
        // If there are 2 or fewer journals, join all elements
        const updatedRecentJournals = journalcontent;
        setrecentJournals(updatedRecentJournals);
        console.log(updatedRecentJournals); // Log the updated value
      }
  
      try {
        // Assuming you have recentJournals defined
        const response = await fetch('http://localhost:4000/api/journals/getSentiment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "inputs": recentJournals })
        });
        
        console.log(recentJournals);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        console.log(response);
        data = await response.json();
        // Process the response data as needed
        console.log(data);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
  
      // Parse the JSON response
      console.log(data);
  
      // Find the label with the highest score
      setMaxLabel(data)
  
      setContent('');
  
      // Fetch posts to update the list
      // fetchComments();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  

  return (
    <div className='journalfullpage'>
      <div className="writejournal">
        <div className="journalinput">
          <div className="writejounraltitle">
            <h1>Write Journal</h1>
          </div>
          <textarea style={{ color: '#000' }} className='journalinputarea'
            type="text"
            placeholder="Type todays journal"
            value={journalcontent}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className='jounralsendbutton' onClick={addJournalcontent}>Send</button>
        </div>
        <div className="journalright">
          <h3>You've been feeling [sentiment] lately. Use this prompt to start writing your next journal!</h3>
          <h1>{question}</h1>
        </div>
      </div>
      <div className="prevjournals">
        <h1>Previous Journal Entries</h1>
        <div className='prevjournalcontainer'>
          <ul className='eachblogjournal'>
            {journals.map((journal) => (
              <li key={journal._id} style={{ color: '#fff' }}>
                <p>{journal.journalcontent}</p>
                <p className='date'>-{new Date(journal.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Journal