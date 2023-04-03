import React, { FC } from 'react'
import { Button, Card } from 'antd'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { addFriend,  removeFriend } from '@/modules/users/users.actions'
import { UserModel } from '@/models/user.model'

interface UserCardProps {
  user: UserModel
}

const UserCard: FC<UserCardProps> = ({  user}) => {
  const userInfo = useAppSelector(state => state.users.users.data.user)
  const meInfo = useAppSelector(state => state.auth.auth.data.userInfo)
  const dispatch = useAppDispatch()

  const addFriendHandler = (friendId: string) => {
    console.log('add', userInfo)
    meInfo && dispatch(addFriend({ friendId, userId: meInfo.userId }))
  }

  const removeFriendHandler = (friendId: string) => {
    meInfo && dispatch(removeFriend({ friendId, userId: meInfo.userId }))
  }

  const shouldAddOrRemoveFriend = meInfo?.friends.find((frId) => frId === user.userId)

  return (
    <Card title='User Card' bordered={false}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                {
          (user || userInfo) &&
          <>
            <div>Username: {user?.username || userInfo?.username}</div>
            <div>friends count: {user?.friends.length || userInfo?.friends.length}</div>
            <div>deeds count: {user?.deeds.length || userInfo?.deeds.length}</div>
            {shouldAddOrRemoveFriend
              ? <Button onClick={(e) => {
                e.stopPropagation()
                removeFriendHandler(user?.userId || userInfo!.userId)
              }}>Remove from friends</Button>
              : <Button onClick={(e) => {
                e.stopPropagation()
                addFriendHandler(user?.userId || userInfo!.userId)
              }}>Add to friends</Button>}
          </>
        }
      </div>
    </Card>
  )
}

export default UserCard