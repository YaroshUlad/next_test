import React from 'react'
import { Button, Card } from 'antd'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/core/hooks'

const Main = () => {
  const router = useRouter()

  const token = useAppSelector(state => state.auth.auth.data.accessToken)
  return (
    <div className={'container'}>
      <div style={{ margin: '0 auto', minHeight: 380 }}>
        <Card title='Test task ' bordered={false} style={{ width: 300, margin: '50px auto' }}>
          <p>Used technologies</p>
          <p>Next.js</p>
          <p>Nest.js</p>
          {!token && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p>You are not authorized, please enter to app</p>
              <Button
                type={'primary'}
                onClick={() => router.push('/login')}>
                Login
              </Button>
            </div>)}
        </Card>
      </div>
    </div>
  )
}

export default Main