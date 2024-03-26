import React, { useState } from 'react'
import { useAuthContext } from '../Hooks/useAuthContext';

export const Editprofile = () => {
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState(null)
    const [country, setCountry] = useState(null)
    const [religion, setReligion] = useState(null)
    const { user } = useAuthContext();

    const sendEdit = async () => {
        const email = user.email
        await fetch('http://localhost:4000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });
	};
  return (
    <div>
        <form className='editprofileform'>
            <label>Age</label>
            <input style={{ color: '#000' }} className='editprofilenumber'
                type="number"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
            />
            <label>Gender</label>
            <input style={{ color: '#000' }} className='editprofiletext'
                type="text"
                placeholder="Gender"
                onChange={(e) => setGender(e.target.value)}
            />
            <label>Country of Origin</label>
            <input style={{ color: '#000' }} className='editprofiletext'
                type="text"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
            />
            <label>Religion</label>
            <input style={{ color: '#000' }} className='editprofiletext'
                type="text"
                placeholder="Religion"
                onChange={(e) => setReligion(e.target.value)}
            />
            <button onClick={sendEdit}>Save</button>
        </form>
    </div>
  )
}
export default Editprofile;