import Head from 'next/head'
import React, { FC, ReactNode } from 'react'

import { Layout } from 'antd'

const { Content } = Layout

export const SITE_TITLE = 'Login'

interface EmptyLayoutProps {
  title?: string
  children: ReactNode
}

const EmptyLayout: FC<EmptyLayoutProps> = ({ title, children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <meta name='og:title' content={SITE_TITLE} />
        <title>{title || SITE_TITLE}</title>
      </Head>
      <Content>{children}</Content>
    </Layout>
  )
}

export default EmptyLayout