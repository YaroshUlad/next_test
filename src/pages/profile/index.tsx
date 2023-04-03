import React from 'react'
import HomeLayout from '@/layouts/home.layout'
import ProfileCard from '@/modules/profile/ProfileCard'

const ProfilePage = () => {
  return (
    <HomeLayout>
      <div className={'container'}>
        <div style={{ margin: '0 auto', minHeight: 380 }}>
          <ProfileCard/>
        </div>
      </div>
    </HomeLayout>
  )
}

export default ProfilePage