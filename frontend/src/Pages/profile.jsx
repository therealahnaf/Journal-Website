import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../Hooks/useAuthContext';
import { Link } from 'react-router-dom';
import agelogo from '../Components/Assets/profileage.png'
import countrylogo from '../Components/Assets/profilecountry.png'
import religionlogo from '../Components/Assets/profilereligion.png'
import emaillogo from '../Components/Assets/profileemail.png'
import genderlogo from '../Components/Assets/profilegender.png'
import './Profile.css'

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

  // const fetchJournalData = async () => {
  // 	try {
  //     const email = user.email
  // 		const response = await fetch(`http://localhost:4000/api/edit?email=${email}`, {
  // 		});
  // 		const fetched = await response.json();
  // 		setData(fetched);
  //     console.log(data)
  // 	} catch (error) {
  // 		console.error('Error fetching data:', error);
  // 	}
  // };

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
      <div className="profiletoedit"><Link to={`Editprofile`} style={{ color: '#fff', textDecoration: 'none' }}>
        <h2><button>Edit profile</button></h2>
      </Link>
      {/* Conditional rendering: if data array is null or empty, show the "Edit Profile" link */}
      {(!data) ? (
        <p>Edit profile to update</p>
      ) : (
        <div>
          {/* Render post details */}
          <div className='profileinfoblock'>
            <p > <img src={emaillogo} alt="" /><b>Email:</b> {data.email}</p>
            <p ><img src={agelogo} alt="" /><b>Age:</b> {data.age}</p>
            <p ><img src={genderlogo} alt="" /><b>Gender:</b> {data.gender}</p>
            <p ><img src={countrylogo} alt="" /><b>Country:</b> {data.country}</p>
            <p ><img src={religionlogo} alt="" /><b>Religion:</b> {data.religion}</p>
          </div>
        </div>
      )}
      </div>
    </div>

  )
}
export default Profile;