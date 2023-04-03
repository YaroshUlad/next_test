import React, { useEffect } from 'react'
import { Card } from 'antd'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { profile } from '@/modules/auth/auth.actions'

const ProfileCard = () => {
  const username = useAppSelector(state => state.auth.auth.data.profile)
  const userInfo = useAppSelector(state => state.auth.auth.data.userInfo)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(profile())
  }, [])
  return (
    <Card title='Test task login' bordered={false} style={{ width: 300, margin: '114px auto' }}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h2>Profile</h2>
        {
          username &&
          <>
            <div>Username: {username.username}</div>
            <div>friends count: {userInfo?.friends.length}</div>
            <div>deeds count: {userInfo?.deeds.length}</div>
          </>
        }</div>
    </Card>
  )
}

export default ProfileCard