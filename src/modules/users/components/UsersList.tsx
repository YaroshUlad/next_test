import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { fetchAllUsers } from '@/modules/users/users.actions'
import UserCard from '@/modules/users/components/UserCard'
import { useRouter } from 'next/router'

const UsersList = () => {
  const users = useAppSelector(state => state.users.users.data.users)
  const userInfo = useAppSelector(state => state.auth.auth.data.userInfo)
  const dispatch = useAppDispatch()
  const router = useRouter()


  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])
  return (
    <div className={'container'}
         style={{ display: 'grid', gridTemplateColumns: '33% 33% 33%', gap: 5, marginTop: '15px' }}>
      {users && users.length > 0 && users.map((el) => {
        if (el.userId === userInfo?.userId) return null
        return (
          <div key={el.userId} onClick={() => router.push(`users/${el.userId}`)}>
            <UserCard key={el.userId} user={el} />
          </div>
        )
      })}
    </div>
  )
}

export default UsersList