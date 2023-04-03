import React from 'react'
import { Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import Link from 'next/link'
import type { MenuProps } from 'antd'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { AppDispatch } from '@/core/store'
import { AnyAction } from 'redux'
import { logout } from '@/modules/auth/auth.slice'
import { useRouter } from 'next/router'

const HeaderMenuButton = () => {
  const token = useAppSelector(state => state.auth.auth.data.accessToken)
  const dispatch = useAppDispatch()

  const router = useRouter()

  const renderList: MenuProps['items'] = token ? getItems(dispatch, logout()) : login

  if (!token) {
    if (router.pathname !== '/')
    router.push('/')
  }
  return (
    <Dropdown menu={{ items: renderList }} placement='bottomRight'>
      <Avatar icon={<UserOutlined />} />
    </Dropdown>
  )
}

export default HeaderMenuButton

const getItems = (dispatch: AppDispatch, action: AnyAction) => {
  return [
    {
      key: '1',
      label: (
        <Link href='/profile'>
          Profile
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href='/deeds'>
          Deeds
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link href='/users'>
          Users
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <Button onClick={() => dispatch(action)}>
          Logout
        </Button>

      ),
    },
  ]
}

const login = [
  {
    key: '5',
    label: (
      <Link href='#'>
        Login
      </Link>
    ),
  },
]