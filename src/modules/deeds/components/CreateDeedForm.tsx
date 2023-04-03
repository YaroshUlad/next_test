import React from 'react'
import { useAppDispatch } from '@/core/hooks'
import { Button, Form, Input } from 'antd'
import { createDeed } from '@/modules/deeds/deeds.actions'

const CreateDeedForm = () => {
  const dispatch = useAppDispatch()

  const onFinish = (values: { title: string }) => {
    const {title} = values

    dispatch(createDeed(title))
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
        label='New Deed title'
        name='title'
        rules={[{ required: true, message: 'Please input new deed title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateDeedForm