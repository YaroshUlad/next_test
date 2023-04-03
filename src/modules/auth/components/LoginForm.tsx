import React from 'react'
import { Button, Form, Input } from 'antd'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { login, LoginDTO } from '@/modules/auth/auth.actions'
import { useRouter } from 'next/router'
//
// const onFinish = (values: any) => {
//   console.log('Success:', values)
// }

const LoginForm = () => {
  const token = useAppSelector(state => state.auth.auth.data.accessToken)
  const dispatch = useAppDispatch()

  const router = useRouter()

  const onFinish = (values: LoginDTO) => {
    const {username, password} = values
    if (!username.trim() && !password.trim()) return

    dispatch(login({username, password}))
  }

  if (token) {
    router.push('/')
  }

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm