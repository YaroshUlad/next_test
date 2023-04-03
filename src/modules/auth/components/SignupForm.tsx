import React from 'react'
import { Button, Form, Input } from 'antd'
import { signup, SignupDTO } from '@/modules/auth/auth.actions'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { useRouter } from 'next/router'

const SignupForm = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.auth.auth.data.accessToken)

  const router = useRouter()

  const onFinish = (values: SignupDTO) => {
    const {username, tag, password} = values
    dispatch(signup({username, password, tag}))
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
        label='Pseudonym'
        name='tag'
        rules={[{ message: 'Please input your pseudonym!' }]}
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

export default SignupForm