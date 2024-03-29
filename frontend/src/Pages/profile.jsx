import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Link } from 'react-router-dom';
export const Profile = () => {
  const [data, setData] = useState([]);
  const { user } = useAuthContext();

  const fetchData = async () => {
		try {
      const email = user.email
			const response = await fetch(`http://localhost:4000/api/edit?email=${email}`, {
			});
			const fetched = await response.json();
			setData(fetched);
      console.log(data)
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

  useEffect(() => {
		// Fetch data on component mount
	
    const interval = setInterval(() => {
			if (user) {
        fetchData();
      }
		}, 1000);

		return () => clearInterval(interval);
	}, [user]);


  return (
    
    <div>
      <Link to={`Editprofile`}>
            <h2>Edit profile</h2>
          </Link>
      {/* Conditional rendering: if data array is null or empty, show the "Edit Profile" link */}
      {(!data) ? (
        <p>Edit profile to update</p>
      ) : (
        <div>
          {/* Render post details */}
          <div className='allblog'>
            <ul className='eachblog'>
              <li style={{ color: '#fff' }}>
                <p>Email: {data.email}</p>
                <p>Age: {data.age}</p>
                <p>Gender: {data.gender}</p>
                <p>Country: {data.country}</p>
                <p>Religion: {data.religion}</p>

              </li>
            </ul>
          </div>
        </div>
      )}
    </div>

  )
}
export default Profile;