import React, { FC, useEffect } from 'react'
import HomeLayout from '@/layouts/home.layout'
import UserCard from '@/modules/users/components/UserCard'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { fetchById } from '@/modules/users/users.actions'
import { wrapper } from '@/core/store'
import { ApiHelper } from '@/core/api'

interface UserInfoPageProps {
  id: string
}

const UserInfoPage: FC<UserInfoPageProps> = ({id}) => {
  const userInfo = useAppSelector(state => state.users.users.data.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchById(id))
  } , [])
  return (
    <HomeLayout>
      <div className={'container'}>
        <div style={{ margin: '0 auto', minHeight: 380 }}>
          {userInfo && <UserCard user={userInfo} />}
        </div>
      </div>
    </HomeLayout>
  )
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const id = ctx.query.id

  // const api = ApiHelper.getInstance()
  // api.setContext(ctx)

  // await store.dispatch(filmApi.endpoints.getFilm.initiate({ content_ptr: filmId, player: 1 }))
  //
  // await Promise.all(store.dispatch(filmApi.util.getRunningQueriesThunk()))

  return { props: { id } }
})

  export default UserInfoPage;