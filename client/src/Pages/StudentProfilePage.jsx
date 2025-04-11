import React from 'react'
import ProfilePage from '../components/ProfilePageComponents/Profile'
import CourseDetail from '../components/ProfilePageComponents/CourseDetail'
import EditProfilePage from '../components/ProfilePageComponents/EditProfilePage'
import WishList from '../components/ProfilePageComponents/WishList'
import Navbar from '../components/navbar'


const StudentProfilePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ProfilePage></ProfilePage>
    </div>
  )
}

export default StudentProfilePage
