import React, { useState } from 'react'
import { useAuthContext } from '../Hooks/useAuthContext';
import './Editprofile.css'
import { Link } from 'react-router-dom';

export const Editprofile = () => {
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState(null)
    const [country, setCountry] = useState(null)
    const [religion, setReligion] = useState(null)
    const { user } = useAuthContext();

    const sendEdit = async () => {
        try{ 
        const email = user.email
        await fetch('http://localhost:4000/api/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, age, gender, country, religion}),
        });
    } catch (error) {
        console.error('Error sending info', error);
    }
	};
  return (
    <div className='editprofileform' >
        <form>
            <input style={{ color: '#000' }} className='editprofilenumber'
                type="number"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
            />
            <input style={{ color: '#000' }} className='editprofiletext'
                type="text"
                placeholder="Gender"
                onChange={(e) => setGender(e.target.value)}
            />
            <input style={{ color: '#000' }} className='editprofiletext'
                type="text"
                placeholder="Country of Origin"
                onChange={(e) => setCountry(e.target.value)}
            />
            <input style={{ color: '#000' }} className='editprofiletext'
                type="text"
                placeholder="Religion"
                onChange={(e) => setReligion(e.target.value)}
            />
            <button type="button" className='editprofilebutton' onClick={sendEdit}>  <Link to='/Profile'>Save</Link></button>
        </form>
    </div>
  )
}
export default Editprofile;