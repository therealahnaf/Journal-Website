
import { useAuthContext } from '../Hooks/useAuthContext';
import React, { useState, useEffect } from 'react';
import './Editprofile.css'
import { Link } from 'react-router-dom';

export const Editprofile = () => {
    const { user } = useAuthContext();
    const [data, setData] = useState({
        age: '',
        gender: '',
        country: '',
        religion: ''
    });

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const email = user.email;
            const response = await fetch(`http://localhost:4000/api/edit?email=${email}`);
            const fetchedData = await response.json();
            setData(fetchedData);
            console.log(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sendEdit = async () => {
        try {
            const email = user.email;
            await fetch('http://localhost:4000/api/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, ...data }), // Send all data at once
            });
        } catch (error) {
            console.error('Error sending info', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className='editprofileform'>
            <form>
                <input
                    style={{ color: '#000' }}
                    className='editprofilenumber'
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={data && data.age ? data.age : ''}
                    onChange={handleChange}
                />
                <input
                    style={{ color: '#000' }}
                    className='editprofiletext'
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={data && data.gender ? data.gender : ''}
                    onChange={handleChange}
                />
                <input
                    style={{ color: '#000' }}
                    className='editprofiletext'
                    type="text"
                    placeholder="Country of Origin"
                    name="country"
                    value={data && data.country ? data.country : ''}
                    onChange={handleChange}
                />
                <input
                    style={{ color: '#000' }}
                    className='editprofiletext'
                    type="text"
                    placeholder="Religion"
                    name="religion"
                    value={data && data.religion ? data.religion : ''}
                    onChange={handleChange}
                />
                <button type="button" className='editprofilebutton' onClick={sendEdit}>
                    <Link to='/Profile'>Save</Link>
                </button>
            </form>
        </div>
    );
};

export default Editprofile;