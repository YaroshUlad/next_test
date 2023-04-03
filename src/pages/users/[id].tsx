import React, { FC, useEffect } from 'react'
import HomeLayout from '@/layouts/home.layout'
import UserCard from '@/modules/users/components/UserCard'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { fetchById } from '@/modules/users/users.actions'
import { wrapper } from '@/core/store'

interface UserInfoPageProps {
  id: string
}

const UserInfoPage: FC<UserInfoPageProps> = ({ id }) => {
  const userInfo = useAppSelector(state => state.users.users.data.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchById(id))
  }, [])
  return (
    <HomeLayout>
      <div className={'container'}>
        <div style={{ margin: '0 auto', minHeight: 380 }}>
          {userInfo && <UserCard user={userInfo} />}
        </div>
      </div>
    </HomeLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const id = ctx.query.id

  return { props: { id } }
})

export default UserInfoPage