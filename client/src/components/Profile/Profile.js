import React from 'react'
import Footer from '../Footer/Footer'
import ReservationsList from '../ReservationsList/ReservationsList'
import UpdateUser from '../UpdateUser/UpdateUser'

const Profile = () => {
  return (
    <div>
        <UpdateUser />
        <ReservationsList />
        <Footer />
    </div>
  )
}

export default Profile