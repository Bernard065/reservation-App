import React from 'react'
import ReservationsList from '../ReservationsList/ReservationsList'
import UpdateUser from '../UpdateUser/UpdateUser'

const Profile = () => {
  return (
    <div>
        <UpdateUser />
        <ReservationsList />
    </div>
  )
}

export default Profile