import React from 'react'
import { useRouter } from 'next/router'
import EmptyLayout from '@/layouts/empty.layout'
import { Card } from 'antd'
import Link from 'next/link'
import SignupForm from '@/modules/auth/components/SignupForm'

const SignupPage = () => {
  const router = useRouter()
  return (
    <EmptyLayout>
      <Card title='Test task login' bordered={false} style={{ width: 300, margin: '114px auto' }}>
        <SignupForm/>
        <div>already have account, <Link href={'/login'}>LOG IN</Link></div>
      </Card>
    </EmptyLayout>
  )
}

export default SignupPage