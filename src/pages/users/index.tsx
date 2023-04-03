import React from 'react'
import HomeLayout from '@/layouts/home.layout'
import UsersList from '@/modules/users/components/UsersList'

const UsersPage = () => {
  return (
    <HomeLayout>
      <UsersList/>
    </HomeLayout>
  )
}

export default UsersPage