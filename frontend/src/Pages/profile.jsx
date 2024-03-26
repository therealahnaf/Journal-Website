import React from 'react'
import { Link } from 'react-router-dom';
export const Profile = () => {
  return (
    <div>
      <Link to={`Editprofile`}>
      <h2>Edit profile</h2>
      </Link>
    </div>
  )
}
export default Profile;