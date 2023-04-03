import React from 'react'
import EmptyLayout from '@/layouts/empty.layout'
import { Card } from 'antd'
import { useRouter } from 'next/router'
import LoginForm from '@/modules/auth/components/LoginForm'
import Link from 'next/link'

const LoginPage = () => {
  const router = useRouter()
  return (
    <EmptyLayout>
      <Card title='Test task login' bordered={false} style={{ width: 300, margin: '114px auto' }}>
        <LoginForm/>
        <div>not have account yet, <Link href={'/signup'}>SIGN UP</Link></div>
      </Card>
    </EmptyLayout>
  )
}

export default LoginPage